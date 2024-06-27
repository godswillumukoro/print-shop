import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Check } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 py-16">
      <MaxWidthWrapper className="px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Privacy Policy
          </h1>

          <div className="prose lg:prose-lg mx-auto">
            <p className="text-lg leading-8 text-gray-700">
              At PilloweXpress, we are deeply committed to protecting your
              privacy. This Privacy Policy outlines the types of personal
              information we collect, how we use and safeguard that information,
              and your rights regarding your personal data.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              We collect personal information that you voluntarily provide to us
              when you register on our website, place an order, subscribe to our
              newsletter, or contact us. This information may include your name,
              email address, phone number, shipping address, and payment
              details.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              The personal information we collect is used to:
            </p>
            <ul className="text-lg leading-8 text-gray-700 list-disc ml-6">
              <li>Process and fulfill your orders efficiently.</li>
              <li>Improve our website, products, and services.</li>
              <li>
                Send you updates, promotional materials, and other information
                related to our services.
              </li>
              <li>Respond to your inquiries and provide customer support.</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              3. Data Retention
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              We retain your personal information only as long as necessary to
              provide you with our services and for legitimate business
              purposes. Once your information is no longer needed, we will
              securely delete or anonymize it.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              4. Security of Your Information
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              Protecting your personal information is a top priority for us. We
              implement industry-standard security measures to safeguard your
              data from unauthorized access, alteration, disclosure, or
              destruction. However, please note that no method of electronic
              transmission or storage is 100% secure.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              5. Your Rights
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              You have the right to access, correct, or delete your personal
              information at any time. You can also object to or restrict the
              processing of your data. To exercise these rights, please contact
              us using the details provided below.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              6. Changes to This Policy
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. We will notify you
              of any significant changes by posting the new policy on our
              website and updating the effective date. We encourage you to
              review this policy periodically to stay informed about how we
              protect your information.
            </p>

            <p className="text-lg leading-8 text-gray-700">
              Your continued use of our website constitutes your acceptance of
              our Privacy Policy and any updates thereto.
            </p>
w          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
