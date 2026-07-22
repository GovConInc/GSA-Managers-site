import { Link } from "react-router-dom";
import ArticleLayout, { P, H2, H3, UL, Callout, ArticleCta } from "../../components/ArticleLayout";

/* Simple comparison table styled to the site system. */
function CostTable() {
  const rows = [
    ["Minor modifications & catalog updates", "2–4 hrs/mo", "Included"],
    ["Major modifications (each)", "15–40 hrs + rejection risk", "Included, 14-day guarantee"],
    ["IFF / 72A sales reporting", "1–3 hrs/mo + deadline risk", "Included"],
    ["Mass mod review & acceptance", "1–2 hrs/quarter", "Included"],
    ["FCP catalog maintenance", "2–5 hrs/mo", "Included"],
    ["SAM & registration upkeep", "1–2 hrs/quarter", "Included"],
    ["Staying current on GSA rule changes", "Ongoing, unmeasured", "Our job"],
  ];
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-warm-border">
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr className="bg-ink text-white">
            <th className="text-left px-5 py-4 font-bold">Task</th>
            <th className="text-left px-5 py-4 font-bold">In-house cost</th>
            <th className="text-left px-5 py-4 font-bold">With Complete Management</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([task, inHouse, managed], i) => (
            <tr key={task} className={i % 2 ? "bg-surface" : "bg-white"}>
              <td className="px-5 py-3.5 font-semibold text-ink">{task}</td>
              <td className="px-5 py-3.5 text-ink-light">{inHouse}</td>
              <td className="px-5 py-3.5 font-medium text-brand">{managed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function InHouseVsOutsourced() {
  return (
    <ArticleLayout
      title="In-House GSA Management vs. Outsourcing: The True Cost"
      description="A line-by-line cost comparison of managing a GSA Schedule internally versus a flat-fee retainer — staff hours, salary math, rejection risk, and opportunity cost."
      slug="in-house-vs-outsourced-gsa-management"
      datePublished="2026-03-05"
      readTime="7 min read"
      category="Strategy & ROI"
    >
      <P>
        Every GSA Schedule holder eventually has this conversation: &quot;Should we just handle the
        GSA stuff ourselves?&quot; It feels like the frugal answer. No consultant fees, full
        control, and how hard can quarterly reporting really be?
      </P>
      <P>
        It&apos;s a fair question, and it deserves a real answer — with numbers. So here&apos;s the
        honest accounting, including the cases where in-house genuinely wins.
      </P>

      <H2>What managing a schedule actually takes</H2>
      <P>
        A GSA Schedule is not a set-and-forget asset. In a typical year, keeping one compliant and
        sellable involves:
      </P>
      <CostTable />
      <P>
        Add it up conservatively and an actively used schedule consumes <strong>10+ hours a
        month</strong> of competent administrative and analytical work — 120–150 hours a year. Not
        intern hours, either: this is work where errors carry contractual consequences, so it lands
        on your controller, your ops lead, or you.
      </P>

      <H2>The salary math</H2>
      <P>
        Price those hours honestly. A capable ops or compliance employee with the judgment to handle
        GSA work costs most companies $35–$60 per loaded hour. At 130 hours a year, that&apos;s{" "}
        <strong>$4,550–$7,800 in pure labor cost</strong> — before a single thing goes wrong.
      </P>
      <P>
        Now the part the in-house estimate always omits: that&apos;s the cost when the work is done{" "}
        <em>correctly and on time</em>. The realistic in-house scenario includes:
      </P>
      <UL
        items={[
          <><strong>Rejection rework.</strong> A bounced modification adds 10–20 hours of diagnosis and resubmission — and weeks of delay on whatever revenue the mod was supposed to unlock. (We wrote a full breakdown of <Link to="/intelligence/gsa-modification-rejected" className="font-bold text-brand hover:underline">why mods get rejected</Link>.)</>,
          <><strong>Deadline risk.</strong> A missed mass mod or late sales report isn't a labor cost — it's a compliance finding. The expensive failures are the ones that don't show up on a timesheet.</>,
          <><strong>Knowledge fragility.</strong> When the one person who "does GSA" leaves, their successor starts from zero. The relearning curve is real and recurring.</>,
          <><strong>Opportunity cost.</strong> Every hour your best operations person spends decoding eMod is an hour not spent on billable work or winning bids. For most small businesses this is the largest cost on the list — and the least visible.</>,
        ]}
      />

      <Callout>
        The true annual cost of competent in-house GSA management for an active schedule:{" "}
        <strong>$6,000–$12,000+</strong> in loaded labor and risk — concentrated on exactly the
        people you can least afford to distract.
      </Callout>

      <H2>The outsourced column</H2>
      <P>
        Our <strong>Complete Management</strong> retainer is $4,500 for twelve months — flat. That
        covers every major and minor modification (a single standalone mod alone runs $2,999), all
        reporting and compliance work, FCP catalog maintenance, a 14-day submission guarantee, six
        sales and admin training sessions, and a dedicated project manager. Your team&apos;s
        involvement drops to approving our work.
      </P>
      <P>
        The comparison, then, isn&apos;t &quot;$4,500 versus free.&quot; It&apos;s $4,500 versus
        $6,000–$12,000 of internal cost — performed by a team that does this work once a year
        instead of every day, with the rejection and deadline risk staying on your side of the
        table.
      </P>

      <ArticleCta
        title="$4,500/year vs. $6,000–$12,000 in staff time."
        body="Complete Management: every modification, every report, every deadline — 12 months, flat fee. $375/month option available. No lock-in."
        label="Start Complete Management"
        href="/order?service=complete-management"
        price="$4,500"
      />

      <H2>When in-house genuinely wins</H2>
      <P>We&apos;d rather tell you this directly than have you discover it after buying:</P>
      <UL
        items={[
          <>Your catalog is small, your pricing is stable, and you expect <strong>zero modifications</strong> this year.</>,
          <>You already employ someone with real GSA experience <em>and</em> genuine spare capacity.</>,
          <>Your schedule is dormant by choice — you hold it for an occasional contract vehicle requirement and don't actively sell on it.</>,
        ]}
      />
      <P>
        If that&apos;s your situation, keep it in-house — our{" "}
        <Link to="/resources/fcp-compliance-checklist" className="font-bold text-brand hover:underline">
          free compliance checklist
        </Link>{" "}
        will cover most of what you need to track. The economics flip the moment your schedule is
        supposed to <em>produce revenue</em>: then every week of administrative delay has a price,
        and the flat fee becomes the cheap option.
      </P>

      <H2>A middle path: the 6-month back office</H2>
      <P>
        Not ready to commit to a year? <strong>Core Maintenance</strong> is $1,499 for six months
        (or $250/month): all minor modifications, three sales assessments, and three training
        sessions. It&apos;s the &quot;take the back office off my desk&quot; option — and most
        clients upgrade to Complete Management when their first major mod comes up, because the
        included-mods math makes the decision for them.
      </P>

      <H2>The bottom line</H2>
      <P>
        In-house GSA management isn&apos;t free — it&apos;s prepaid with your team&apos;s most
        expensive hours, plus a risk premium nobody budgets for. Run your own numbers with the
        table above. If the total comes out under $4,500 a year, keep it inside and don&apos;t look
        back. If it doesn&apos;t — and for an active schedule it almost never does — you already
        know what the spreadsheet is telling you.
      </P>

      <ArticleCta
        title="Not sure which side you fall on?"
        body="15-minute call. Bring your schedule details — we'll tell you straight whether outsourcing makes financial sense for your situation."
        label="Book a Free Call"
        href="https://calendar.app.google/EA6JzEhbNTH6AM6S8"
      />
    </ArticleLayout>
  );
}
