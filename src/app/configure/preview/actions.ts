  "use server";

  import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products';
  import { db } from '@/db';
  import { BACK_DESIGNS, FABRICS } from '@/validators/option-validator';
  import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
  import { Order } from '@prisma/client';

  export const createCheckoutSession = async ({ configId }: { configId: string }) => {
    try {
      // Fetch the configuration
      const configuration = await db.configuration.findUnique({
        where: { id: configId },
      });

      if (!configuration) {
        throw new Error("Incorrect configuration supplied");
      }

      // Get logged in user
      const { getUser } = getKindeServerSession();
      const user = await getUser(); // Get currently logged-in user

      if (!user) {
        throw new Error("Kindly log in first");
      }

      // Calculate total price: server side
      const { fabric, backDesign, quantity } = configuration;
      let totalPrice = BASE_PRICE * 100;

      // Get quantity price
      if(quantity) {
        totalPrice *= quantity
      }

      // Get fabric price
      const selectedFabricOption = FABRICS.options.find(
        (option) => option.value === fabric
      );
      if (selectedFabricOption) {
        totalPrice += selectedFabricOption.price * 100;
      }

      // Get back design price
      const selectedBackDesignOption = BACK_DESIGNS.options.find(
        (option) => option.value === backDesign
      );
      if (selectedBackDesignOption) {
        totalPrice += selectedBackDesignOption.price * 100;
      }

      // Create or find an order
      let order: Order | null = await db.order.findFirst({
        where: {
          userId: user.id,
          configurationId: configuration.id,
        },
      });

      if (!order) {
        order = await db.order.create({
          data: {
            amount: 10000,
            userId: user.id,
            configurationId: configuration.id,
          },
        });
      }

      // Initialize transaction via Paystack
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          amount: totalPrice,  // 10000
          callback_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
        }),
      });

      const transaction = await response.json();

      if (!transaction.status) {
        throw new Error(transaction.message);
      }

      // Persist the transaction ID in the order
      await db.order.update({
        where: { id: order.id },
        data: { transactionId: transaction.data.reference},
      });

      return { url: transaction.data.authorization_url };
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new Error("Failed to create checkout session");
    }
  };
