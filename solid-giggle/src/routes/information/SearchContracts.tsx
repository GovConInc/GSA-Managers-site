import { Helmet } from "react-helmet-async";
import Section from "../../components/Section";
import ContractDataExplorer from "../../components/ContractDataExplorer";

export default function SearchContracts() {
  return (
    <>
      <Helmet>
        <title>Search Contract Award Data — {LINKS.name}</title>
        <meta name="description" content="Search, filter, and analyze federal contract award data from SAM.gov. Use our market intelligence tool to find competitors, identify opportunities, and understand agency spending." />
      </Helmet>

      <Section>
        <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Market Intelligence</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Contract Award History
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
              Analyze who is winning, what they are selling, and which agencies are buying. Use this historical data to build a smarter capture strategy, identify potential teaming partners, and price your offerings competitively.
            </p>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <ContractDataExplorer />
      </Section>
    </>
  );
}