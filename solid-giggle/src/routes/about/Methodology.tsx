
export default function AboutMethodology() {
  return (
    <>
      <Helmet>
        <title>Our Approach — GSA Managers Inc.</title>
        <meta name="description" content="How GSA Managers Inc. delivers honest, expert help for GSA Schedule submissions, contract management, and the $500 FCP Catalog Baseline Only." />
      </Helmet>
      <Section className="py-16">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="font-display text-4xl font-bold mb-6 text-gov-brand">Our Approach</h1>
          <p className="text-lg text-slate-700 mb-8">
            GSA contracting should be simple, honest, and accessible. We focus on three core services to help you succeed:
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-4 mb-8">
            <li>
              <span className="font-bold text-gov-brand">$500 FCP Catalog Baseline Only:</span> We upload your catalog to the FAS Catalog Platform quickly and affordably. For specialized training and guidance, explore our New Vendor Special.
            </li>
            <li>
              <span className="font-bold text-gov-brand">GSA Schedule Submission (Award or No Fee):</span> We handle your entire GSA MAS application from start to finish. If you don’t get awarded, you don’t pay.
            </li>
            <li>
              <span className="font-bold text-gov-brand">GSA MAS Contract Management:</span> Ongoing compliance, modifications, quarterly sales reporting, and catalog updates. No long-term contracts—get help when you need it.
            </li>
          </ul>
          <h2 className="font-display text-2xl font-bold mb-4 text-gov-brand">Our Values</h2>
          <ol className="list-decimal list-inside text-slate-700 space-y-4">
            <li>
              <span className="font-bold text-gov-brand">Clarity:</span> We explain every step, every requirement, and every option. No jargon, no confusion.
            </li>
            <li>
              <span className="font-bold text-gov-brand">Transparency:</span> You always know what you’re paying for, what’s included, and what’s next. No hidden fees, no surprises.
            </li>
            <li>
              <span className="font-bold text-gov-brand">Results:</span> We only succeed when you do—whether that’s getting awarded, staying compliant, or growing your federal sales.
            </li>
          </ol>
        </div>
      </Section>
    </>
  );
}
