import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Check } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="bg-slate-50 py-16">
      <MaxWidthWrapper className="px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Terms of Service
          </h1>

          <div className="prose lg:prose-lg mx-auto">
            <p className="text-lg leading-8 text-gray-700 mb-6">
              These Terms of Service ("Terms") govern your use of the
              PilloweXpress website and services. By accessing or using our
              website, you agree to be bound by these Terms. Please read them
              carefully as they contain important information about your rights
              and obligations.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              By using PilloweXpress's services, you agree to be bound by these
              Terms of Service, as well as our Privacy Policy and Cookie Policy.
              If you do not agree with any part of these terms, you should not
              use our services.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              2. Changes to Terms
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              We reserve the right to modify or update these Terms of Service at
              any time. Any changes will be effective immediately upon posting
              on our website. We will make reasonable efforts to notify you of
              any significant changes, such as by sending an email to the
              address associated with your account or displaying a prominent
              notice on our website.
            </p>
            <p className="text-lg leading-8 text-gray-700">
              Your continued use of our services after changes are posted
              constitutes your acceptance of the updated terms. If you do not
              agree with the changes, you must stop using our services.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              3. Use of Our Services
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              You agree to use our services only for lawful purposes and in
              accordance with these terms. You must not:
            </p>
            <ul className="text-lg leading-8 text-gray-700 list-disc ml-6">
              <li>Violate any applicable laws or regulations.</li>
              <li>
                Infringe on the rights of others, including intellectual
                property rights.
              </li>
              <li>Transmit any harmful or malicious code or content.</li>
              <li>
                Engage in any activity that disrupts or interferes with our
                services.
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              4. Account Registration
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              To access certain features of our website, you may need to
              register for an account. You agree to provide accurate and
              complete information during registration and to keep your account
              information up-to-date. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              All content on our website, including text, graphics, logos,
              images, and software, is the property of PilloweXpress or its
              licensors and is protected by intellectual property laws. You may
              not use, reproduce, distribute, or create derivative works based
              on our content without our prior written permission, except as
              explicitly permitted by these Terms of Service or applicable law.
            </p>
            <p className="text-lg leading-8 text-gray-700">
              The PilloweXpress name, logo, and other trademarks and trade dress
              are owned by PilloweXpress and may not be used without our prior
              written consent.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              6. User Content
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              By submitting any content to our website, you grant PilloweXpress
              a non-exclusive, royalty-free, perpetual, and worldwide license to
              use, reproduce, modify, publish, and distribute your content in
              any media. You represent and warrant that you have the necessary
              rights to grant this license and that your content does not
              infringe on the rights of others.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              7. Third-Party Services and Links
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              Our website may contain links to third-party websites or services
              that are not owned or controlled by PilloweXpress. We have no
              control over, and assume no responsibility for, the content,
              privacy policies, or practices of any third-party websites or
              services. We encourage you to review the terms and privacy
              policies of those third parties before using their services or
              providing any personal information.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              8. Disclaimers and Limitation of Liability
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              Our services are provided "as is" and "as available" without any
              warranties, express or implied. We do not guarantee that our
              services will be uninterrupted, error-free, or secure. To the
              fullest extent permitted by law, PilloweXpress disclaims all
              warranties and is not liable for any direct, indirect, incidental,
              or consequential damages arising from your use of our services.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              9. Indemnification
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              You agree to indemnify, defend, and hold harmless PilloweXpress
              and its affiliates, officers, directors, employees, and agents
              from and against any claims, liabilities, damages, losses, and
              expenses, including legal fees, arising out of or in any wayw
              connected with your use of our services or violation of these
              terms.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              10. Termination
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              PilloweXpress reserves the right to terminate or suspend your
              access to our services, in whole or in part, at any time and for
              any reason, without prior notice or liability. In the event of
              termination, your rights under these Terms of Service will
              immediately cease.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              11. Severability
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              If any provision of these Terms of Service is found to be invalid
              or unenforceable, that provision will be severed from the rest of
              the terms, and the remaining provisions will remain in full force
              and effect.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              12. Governing Law
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              These Terms of Service are governed by and construed in accordance
              with the laws of the jurisdiction where PilloweXpress is located,
              without regard to its conflict of law principles. Any disputes
              arising from these terms will be resolved in the courts of that
              jurisdiction.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
