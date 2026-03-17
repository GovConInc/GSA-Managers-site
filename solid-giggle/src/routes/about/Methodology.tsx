import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { BRAND, LINKS } from "../../lib/constants";
import MethodologyLoop from "../../components/MethodologyLoop";

export default function AboutMethodology() {
  return (
    <>
      <Helmet>
        <title>Our Methodology — {BRAND.name}</title>
        <meta 
            name="description" 
            content="Explore the 5C Methodology, our proven framework for achieving success in government contracting. From compliance and context to capture, compete, and continuity." 
        />
      </Helmet>

      {/* ===== HERO ===== */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Our Proven Framework</p>
                <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                The 5C Methodology
                </h1>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                We don't believe in guesswork. Our 5C Methodology is a systematic, battle-tested framework that transforms government contracting from an overwhelming challenge into a repeatable process for success. We guide you through every phase to build a durable federal revenue stream.
                </p>
            </div>
            <div className="lg:pl-8">
                <Card className="p-8" hover>
                    <h3 className="font-bold text-slate-900 text-lg">The Core Principle</h3>
                    <p className="text-slate-600 mt-2">
                        Most businesses fail because they jump straight to "Compete" (writing proposals) without a foundation. We force discipline by starting with "Compliance" and "Context", ensuring that by the time you compete, you're already positioned to win.
                    </p>
                </Card>
            </div>
        </div>
      </Section>

      {/* ===== METHODOLOGY LOOP ===== */}
      <MethodologyLoop />

      {/* ===== FINAL CTA ===== */}
      <Section title="See How the 5C Methodology Applies to You" kicker="Take the Next Step" dark>
        <Card
          className="p-8 lg:p-12 bg-white/10 border-white/20"
          hover={false}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl font-bold text-white mb-4">
                Book Your Free Strategy Call
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                In a free consultation, we'll map your current business to our 5C framework, identify your biggest opportunities for growth, and provide a clear, actionable plan to win more government contracts.
              </p>
            </div>
            <div className="lg:pl-8">
              <Card className="p-8 bg-white text-center">
                <h4 className="text-2xl font-bold text-slate-900 mb-3">
                  Get Your Action Plan
                </h4>
                <p className="text-slate-600 mb-6">
                  15 minutes is all it takes to get a clear roadmap for federal success.
                </p>
                <LinkButton
                  href={LINKS.booking}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                  className="w-full"
                >
                  Book Now — It's Free
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
              </Card>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}
