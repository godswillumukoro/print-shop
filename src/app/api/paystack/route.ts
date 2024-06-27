import { NextResponse } from 'next/server';
import { db } from '@/db';
import { headers } from 'next/headers';
import crypto from 'crypto';
import {Resend} from 'resend'
import OrderReceivedEmail from '@/components/emails/OrderReceivedEmail';

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!secret) {
    console.error('PAYSTACK_SECRET_KEY is not defined in environment variables');
    return new Response('Internal Server Error', { status: 500 });
  }

  try {
    // Parse the request body to get the event data
    const event = await req.json();
    const signature = headers().get('x-paystack-signature');

    console.log('Received event:', event);
    console.log('Received signature:', signature);

    // Check for the presence of the Paystack signature
    if (!signature) {
      console.error('Missing Paystack signature');
      return new Response('Missing Paystack signature', { status: 400 });
    }

    // Verify the Paystack signature
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(event)).digest('hex');

    console.log('Calculated hash:', hash);
    console.log('Signature matches:', hash === signature);

    if (hash !== signature) {
      console.error('Invalid signature');
      return new Response('Invalid signature', { status: 400 });
    }

    // Early acknowledgment - respond that the webhook request was received
    const acknowledgmentResponse = { message: 'Webhook received and being processed', ok: true };
    console.log('Acknowledgment response:', acknowledgmentResponse);

    // Immediately acknowledge the webhook before processing
    await NextResponse.json(acknowledgmentResponse);

    // Handle the charge.success and paymentrequest.success events
    if (event.event === 'charge.success' || event.event === 'paymentrequest.success') {
      const { data } = event;
      const transactionId = data.reference;

      console.log('Event data:', data);
      console.log('Transaction ID:', transactionId);

      if (!transactionId) {
        console.error('Transaction ID not found in event data');
        return new Response('Transaction ID not found in event data', { status: 400 });
      }

      // Update the order status in the database
      try {
        const updateResult = await db.order.update({
          where: { transactionId },
          data: {
            isPaid: true,
            status: 'awaiting_shipment',
            updatedAt: new Date(),
          },
        });

        console.log('Update result:', updateResult);

        // Check if the update was successful
        if (!updateResult) {
          console.error(`Failed to update order with transaction ID ${transactionId}`);
          return new Response(`Failed to update order with transaction ID ${transactionId}`, { status: 500 });
        }

        // await resend.emails.send({
        //   from: "PilloweXpress <umukoro6@gmail.com>",
        //   to: [event.data.object.customer_details.email],
        //   subject: "Thanks for your order!",
        //   react: OrderReceivedEmail({
        //     orderId: "1122546",
        //     // @ts-ignore
        //     orderDate: updateResult.createdAt.toLocalDateString(),
        //     // @ts-ignore
        //     shippingAddress: {
        //       name: "James",
        //       city: "Lagos",
        //       country: "Nigeria",
        //       postal_code: "1122",
        //       street: "12 Anambi street",
        //       state: "Lagos"
        //     }
        //   })
        // })

        // Return the final response with 200 OK
        return new Response('Webhook processed successfully', { status: 200 });
      } catch (error) {
        console.error(`Failed to update order with transaction ID ${transactionId}:`, error);
        return new Response(`Failed to update order with transaction ID ${transactionId}`, { status: 500 });
      }
    }



    // Handle unhandled events
    console.log('Unhandled event:', event.event);
    return NextResponse.json({ message: 'Unhandled event', ok: false }, { status: 400 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
