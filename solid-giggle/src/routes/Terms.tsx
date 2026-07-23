import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { BRAND } from "../lib/constants";

const EFFECTIVE_DATE = "July 22, 2026";

export default function Terms() {
  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>Terms of Service — {BRAND.name}</title>
        <meta
          name="description"
          content="Terms of Service for GSA Managers Inc. Review our cancellation policy, guarantee definitions, limitation of liability, and payment terms."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-4">
              Legal
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-ink-light leading-relaxed">
              Effective Date: {EFFECTIVE_DATE}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <div className="prose prose-ink max-w-none space-y-12">
            {/* 1. Agreement Overview */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                1. Agreement Overview
              </h2>
              <p className="text-ink-light leading-relaxed mb-4">
                These Terms of Service ("Terms") constitute a legally binding
                agreement between you ("Client," "you," or "your") and{" "}
                {BRAND.name} Inc. ("{BRAND.name}," "we," "us," or "our"),
                located in {BRAND.location}. By purchasing any service through
                our website, submitting an order form, or otherwise engaging our
                services, you acknowledge that you have read, understood, and
                agree to be bound by these Terms in their entirety.
              </p>
              <p className="text-ink-light leading-relaxed">
                {BRAND.name} provides professional GSA Schedule consulting
                services including, but not limited to, FAS Catalog Platform
                (FCP) catalog uploads, GSA modifications, GSA Schedule
                submissions, compliance audits, back-office management, and
                sales training. These Terms govern all services purchased
                through our website or otherwise agreed upon in writing.
              </p>
            </div>

            {/* 2. Services & Scope of Work */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                2. Services & Scope of Work
              </h2>
              <p className="text-ink-light leading-relaxed mb-4">
                The specific scope, deliverables, and timeline for each
                engagement are determined by the service package selected at
                checkout. Our current service offerings include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-ink-light">
                <li>
                  <span className="font-semibold text-ink">
                    GSA Catalog Upload & Training
                  </span>{" "}
                  — FCP catalog migration, compliance audit, and 1-on-1
                  platform training.
                </li>
                <li>
                  <span className="font-semibold text-ink">
                    GSA Modification
                  </span>{" "}
                  — Preparation and submission of any GSA contract modification.
                </li>
                <li>
                  <span className="font-semibold text-ink">
                    Core Maintenance / Back Office
                  </span>{" "}
                  — Ongoing minor modifications, sales assessments, and
                  back-office management for a defined term.
                </li>
                <li>
                  <span className="font-semibold text-ink">
                    Complete GSA Management
                  </span>{" "}
                  — Full-service, 12-month GSA Schedule management including all
                  modifications, compliance, eBuy support, and a dedicated
                  project manager.
                </li>
                <li>
                  <span className="font-semibold text-ink">
                    GSA Schedule Submission
                  </span>{" "}
                  — Full MAS offer preparation and submission to the General
                  Services Administration.
                </li>
              </ul>
              <p className="text-ink-light leading-relaxed mt-4">
                Any work outside the purchased scope requires a separate
                written agreement and may incur additional fees.
              </p>
            </div>

            {/* 3. Payment Terms */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                3. Payment Terms
              </h2>
              <p className="text-ink-light leading-relaxed mb-4">
                All prices are listed in U.S. Dollars (USD) and are flat fees
                unless otherwise noted. Payment is due in full at the time of
                purchase unless a monthly payment option has been explicitly
                agreed upon in writing.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-ink-light">
                <li>
                  <span className="font-semibold text-ink">
                    One-Time Services:
                  </span>{" "}
                  Full payment is collected at checkout before work begins.
                </li>
                <li>
                  <span className="font-semibold text-ink">
                    Retainer / Management Services:
                  </span>{" "}
                  For services with a monthly payment option (e.g., Core
                  Maintenance at $250/month or Complete Management at
                  $375/month), the first monthly installment is due at
                  checkout. Subsequent payments are billed on the same day of
                  each following month for the duration of the service term.
                </li>
                <li>
                  <span className="font-semibold text-ink">
                    Late Payments:
                  </span>{" "}
                  Invoices not paid within fifteen (15) days of the due date may
                  be subject to a late fee of 1.5% per month on the outstanding
                  balance. {BRAND.name} reserves the right to pause all work
                  until the account is brought current.
                </li>
              </ul>
              <p className="text-ink-light leading-relaxed mt-4">
                All payments are processed securely through Square. Your
                payment information is encrypted and never stored on our
                servers.
              </p>
            </div>

            {/* 4. Definition of "Guarantee" */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                4. Definition of "Guarantee"
              </h2>
              <p className="text-ink-light leading-relaxed mb-4">
                Throughout our website and marketing materials, {BRAND.name}{" "}
                uses the term "guarantee" in connection with certain service
                timelines. These guarantees are defined as follows:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-ink-light">
                <li>
                  <span className="font-semibold text-ink">
                    "7-Day Delivery Guarantee" (Catalog Upload & Training):
                  </span>{" "}
                  We guarantee that your FCP catalog upload, compliance audit,
                  and initial training session will be completed within seven
                  (7) business days of receiving all required materials from
                  you. If we fail to meet this timeline due to causes within
                  our control, we will provide a pro-rata credit toward a
                  future service.
                </li>
                <li>
                  <span className="font-semibold text-ink">
                    "14-Day Submission Guarantee" (Modifications):
                  </span>{" "}
                  We guarantee that your fully prepared modification will be
                  submitted to the GSA within fourteen (14) business days of
                  receiving all required materials from you. If we fail to
                  submit within this timeframe due to causes within our
                  control, we will provide a pro-rata credit toward a future
                  service.
                </li>
                <li>
                  <span className="font-semibold text-ink">
                    "45-Day Submission Guarantee" (GSA Schedule Submission):
                  </span>{" "}
                  We guarantee your complete MAS offer package will be
                  submission-ready within forty-five (45) business days of
                  kickoff, provided all required documentation and information
                  is supplied by you in a timely manner.
                </li>
              </ul>
              <p className="text-ink-light leading-relaxed mt-4 font-semibold">
                Important limitations on all guarantees:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-ink-light mt-2">
                <li>
                  Timeline guarantees begin only after all required
                  documentation and information has been received from the
                  Client. Delays caused by the Client's failure to provide
                  requested materials do not count against the guaranteed
                  timeline.
                </li>
                <li>
                  Our guarantees cover the preparation and/or submission of
                  deliverables. We do <strong>not</strong> guarantee approval,
                  acceptance, or any specific outcome from the General Services
                  Administration or any other government agency. GSA review and
                  approval timelines are outside our control.
                </li>
                <li>
                  The sole remedy for a missed guaranteed timeline is a
                  pro-rata service credit as described above. Guarantee
                  remedies do not include cash refunds or additional monetary
                  compensation.
                </li>
              </ul>
            </div>

            {/* 5. Cancellation & Refund Policy */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                5. Cancellation & Refund Policy
              </h2>
              <p className="text-ink-light leading-relaxed mb-4">
                We understand that circumstances change. Our cancellation
                policy is designed to be fair while reflecting the fact that we
                begin work promptly after purchase.
              </p>

              <h3 className="font-display text-lg font-bold text-ink mt-6 mb-3">
                5a. Cancellation Within 48 Hours (Before Work Begins)
              </h3>
              <p className="text-ink-light leading-relaxed">
                If you cancel within forty-eight (48) hours of purchase{" "}
                <strong>and</strong> before {BRAND.name} has commenced any
                substantive work on your engagement, you are entitled to a full
                refund minus a $150 administrative processing fee.
              </p>

              <h3 className="font-display text-lg font-bold text-ink mt-6 mb-3">
                5b. Cancellation After Work Has Commenced
              </h3>
              <p className="text-ink-light leading-relaxed mb-3">
                Once {BRAND.name} has begun substantive work on your
                engagement (including but not limited to document review,
                catalog data preparation, modification drafting, or compliance
                analysis), the following applies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-ink-light">
                <li>
                  <span className="font-semibold text-ink">
                    One-Time Services (Catalog Upload, Modification, Schedule
                    Submission):
                  </span>{" "}
                  All fees are non-refundable once work has commenced. Any
                  completed work product will be delivered to the Client upon
                  request.
                </li>
                <li>
                  <span className="font-semibold text-ink">
                    Retainer / Management Services (Core Maintenance, Complete
                    Management):
                  </span>{" "}
                  You may cancel at any time with thirty (30) days' written
                  notice sent to{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-semibold text-brand hover:underline"
                  >
                    {BRAND.email}
                  </a>
                  . Upon cancellation: (i) all fees paid through the end of the
                  current billing period are non-refundable; (ii) any work in
                  progress at the time of cancellation will be completed and
                  delivered; and (iii) no further charges will be billed after
                  the 30-day notice period.
                </li>
              </ul>

              <h3 className="font-display text-lg font-bold text-ink mt-6 mb-3">
                5c. Early Termination Fee
              </h3>
              <p className="text-ink-light leading-relaxed">
                For retainer and management services paid on a monthly basis,
                if you cancel before completing the full service term (6 months
                for Core Maintenance; 12 months for Complete Management), an
                early termination fee of 15% of the remaining contract value
                will apply. This fee reflects the resources {BRAND.name}{" "}
                allocates and reserves for the duration of your engagement.
              </p>

              <h3 className="font-display text-lg font-bold text-ink mt-6 mb-3">
                5d. How to Cancel
              </h3>
              <p className="text-ink-light leading-relaxed">
                All cancellation requests must be submitted in writing via
                email to{" "}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="font-semibold text-brand hover:underline"
                >
                  {BRAND.email}
                </a>{" "}
                or by calling{" "}
                <a
                  href={`tel:${BRAND.phone.replace(/[^+\d]/g, "")}`}
                  className="font-semibold text-brand hover:underline"
                >
                  {BRAND.phone}
                </a>
                . Cancellation is effective upon written confirmation from{" "}
                {BRAND.name}.
              </p>
            </div>

            {/* 6. Client Responsibilities */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                6. Client Responsibilities
              </h2>
              <p className="text-ink-light leading-relaxed mb-4">
                To enable {BRAND.name} to deliver services effectively and
                within guaranteed timelines, the Client agrees to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-ink-light">
                <li>
                  Provide all requested documentation, data, and information
                  in a timely manner (generally within five (5) business days
                  of request).
                </li>
                <li>
                  Ensure that all information and materials provided are
                  accurate, complete, and up to date.
                </li>
                <li>
                  Designate a primary point of contact who is authorized to
                  make decisions on behalf of the Client's organization.
                </li>
                <li>
                  Respond to communications from {BRAND.name} within a
                  reasonable timeframe to avoid project delays.
                </li>
                <li>
                  Maintain active SAM.gov registration, UEI, and any other
                  prerequisite registrations required for GSA Schedule
                  activities.
                </li>
              </ul>
              <p className="text-ink-light leading-relaxed mt-4">
                Delays caused by the Client's failure to fulfill these
                responsibilities may extend delivery timelines and do not
                constitute a breach of any {BRAND.name} guarantee.
              </p>
            </div>

            {/* 7. No Guarantee of Government Approval */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                7. No Guarantee of Government Approval or Results
              </h2>
              <p className="text-ink-light leading-relaxed mb-4">
                {BRAND.name} provides expert consulting services to prepare,
                submit, and manage GSA Schedule-related documentation and
                processes. However, all decisions regarding GSA Schedule
                awards, modifications, and compliance determinations are made
                solely by the General Services Administration and/or
                Contracting Officers.
              </p>
              <p className="text-ink-light leading-relaxed font-semibold">
                {BRAND.name} does not and cannot guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-ink-light mt-2">
                <li>
                  Approval of any GSA Schedule application, modification, or
                  submission.
                </li>
                <li>
                  Any specific level of revenue, sales, or contract awards
                  resulting from our services.
                </li>
                <li>
                  Any particular timeline for government review or response.
                </li>
                <li>
                  Continued eligibility for GSA Schedule participation, which
                  is subject to the Client's compliance with federal
                  requirements.
                </li>
              </ul>
              <p className="text-ink-light leading-relaxed mt-4">
                Our role is to prepare the strongest possible submission and
                ensure your documentation meets current GSA requirements. The
                final determination rests with the government.
              </p>
            </div>

            {/* 8. Limitation of Liability */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-ink-light leading-relaxed mb-4">
                To the maximum extent permitted by applicable law, {BRAND.name}
                's total liability to the Client for any and all claims arising
                out of or related to these Terms or any service provided shall
                not exceed the total amount paid by the Client to {BRAND.name}{" "}
                for the specific service giving rise to the claim.
              </p>
              <p className="text-ink-light leading-relaxed mb-4">
                In no event shall {BRAND.name} be liable for any indirect,
                incidental, special, consequential, or punitive damages,
                including but not limited to loss of profits, loss of
                contracts, loss of business opportunity, or loss of data,
                regardless of whether such damages were foreseeable or whether
                {BRAND.name} was advised of the possibility of such damages.
              </p>
              <p className="text-ink-light leading-relaxed">
                This limitation applies to all causes of action in the
                aggregate, including but not limited to breach of contract,
                negligence, and other torts.
              </p>
            </div>

            {/* 9. Intellectual Property & Work Product */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                9. Intellectual Property & Work Product
              </h2>
              <p className="text-ink-light leading-relaxed mb-4">
                All work product created by {BRAND.name} specifically for the
                Client's GSA engagement (e.g., catalog data files, modification
                packages, pricing narratives, submission documents) shall
                become the property of the Client upon full payment.
              </p>
              <p className="text-ink-light leading-relaxed">
                {BRAND.name} retains ownership of all proprietary
                methodologies, templates, processes, training materials, and
                general know-how used in the delivery of services. Nothing in
                these Terms grants the Client any rights to {BRAND.name}'s
                proprietary materials beyond the specific deliverables created
                for their engagement.
              </p>
            </div>

            {/* 10. Confidentiality */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                10. Confidentiality
              </h2>
              <p className="text-ink-light leading-relaxed">
                Both parties agree to maintain the confidentiality of all
                non-public information exchanged during the engagement. This
                includes, but is not limited to, pricing data, business
                strategies, financial information, proprietary processes, and
                any materials shared for the purpose of fulfilling the
                services. This obligation survives termination of the
                engagement and remains in effect for a period of two (2) years
                thereafter.
              </p>
            </div>

            {/* 11. Indemnification */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                11. Indemnification
              </h2>
              <p className="text-ink-light leading-relaxed">
                The Client agrees to indemnify, defend, and hold harmless{" "}
                {BRAND.name}, its officers, employees, and agents from and
                against any and all claims, liabilities, damages, losses, and
                expenses (including reasonable attorneys' fees) arising out of
                or related to: (a) inaccurate, incomplete, or misleading
                information provided by the Client; (b) the Client's violation
                of any applicable law, regulation, or GSA requirement; or (c)
                any third-party claim arising from the Client's use of
                deliverables provided by {BRAND.name}.
              </p>
            </div>

            {/* 12. Dispute Resolution */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                12. Dispute Resolution
              </h2>
              <p className="text-ink-light leading-relaxed mb-4">
                In the event of any dispute arising out of or relating to these
                Terms, the parties agree to first attempt to resolve the matter
                through good-faith negotiation. If a resolution cannot be
                reached within thirty (30) days, either party may initiate
                binding arbitration under the rules of the American Arbitration
                Association, with the arbitration taking place in Hillsborough
                County, Florida.
              </p>
              <p className="text-ink-light leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of the State of Florida, without regard to its
                conflict-of-law principles. The prevailing party in any
                arbitration or legal proceeding shall be entitled to recover
                reasonable attorneys' fees and costs.
              </p>
            </div>

            {/* 13. Force Majeure */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                13. Force Majeure
              </h2>
              <p className="text-ink-light leading-relaxed">
                Neither party shall be liable for any delay or failure to
                perform due to causes beyond its reasonable control, including
                but not limited to acts of God, natural disasters, government
                actions or shutdowns, pandemic, internet or infrastructure
                outages, or changes in GSA policies, regulations, or systems.
                Guaranteed timelines are automatically extended by the duration
                of any such force majeure event.
              </p>
            </div>

            {/* 14. Modifications to Terms */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                14. Modifications to These Terms
              </h2>
              <p className="text-ink-light leading-relaxed">
                {BRAND.name} reserves the right to update or modify these Terms
                at any time. Changes will be posted on this page with an
                updated effective date. Continued use of our services after
                any modification constitutes acceptance of the revised Terms.
                For active engagements, material changes to these Terms will
                be communicated via email at least fifteen (15) days before
                taking effect.
              </p>
            </div>

            {/* 15. Contact */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">
                15. Contact Information
              </h2>
              <p className="text-ink-light leading-relaxed">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="mt-4 rounded-2xl bg-warm-100/50 p-6 border border-warm-border">
                <p className="font-bold text-ink mb-1">{BRAND.name} Inc.</p>
                <p className="text-ink-light">{BRAND.location}</p>
                <p className="text-ink-light mt-2">
                  Email:{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-semibold text-brand hover:underline"
                  >
                    {BRAND.email}
                  </a>
                </p>
                <p className="text-ink-light">
                  Phone:{" "}
                  <a
                    href={`tel:${BRAND.phone.replace(/[^+\d]/g, "")}`}
                    className="font-semibold text-brand hover:underline"
                  >
                    {BRAND.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
