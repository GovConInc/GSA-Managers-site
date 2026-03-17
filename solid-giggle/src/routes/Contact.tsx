import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Section from "../components/Section";
import Card from "../components/Card";
import { Button, LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";
import { submitContact } from "../lib/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    cage: "",
    interest: "General Inquiry",
    bestTime: "Anytime",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const r = await submitContact(formData);
      setSuccess("Your message has been sent successfully! We'll be in touch within 24 hours.");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        cage: "",
        interest: "General Inquiry",
        bestTime: "Anytime",
      });
    } catch (e: any) {
      setError(e?.message ?? "Failed to send message. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us — {BRAND.name}</title>
        <meta name="description" content="Get in touch with the experts at GSA Managers. Whether you have questions about GSA Schedules, federal capture, or proposal writing, we're here to help." />
      </Helmet>

      {/* ===== HERO ===== */}
      <Section>
        <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Contact Us</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Let's Build Your Federal Strategy.
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
              Have questions? We have answers. Whether you're just starting out or looking to optimize your existing federal business, our team is ready to provide clear, actionable guidance.
            </p>
        </div>
      </Section>
      
      {/* ===== CONTACT FORM & INFO ===== */}
      <Section className="bg-slate-50">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-8" hover={false}>
              <h2 className="text-2xl font-bold text-slate-900">Send Us a Message</h2>
              <p className="mt-2 text-sm text-slate-600">
                We respond to all inquiries within one business day.
              </p>

              <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700">Full Name *</label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required className="input-field" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Email Address *</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="input-field" placeholder="you@company.com" />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-slate-700">Company Name</label>
                    <input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} className="input-field" placeholder="Acme Inc." />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700">Phone Number</label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="input-field" placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cage" className="block text-sm font-semibold text-slate-700">CAGE Code (Optional)</label>
                    <input id="cage" name="cage" type="text" value={formData.cage} onChange={handleInputChange} className="input-field" placeholder="e.g. 1A2B3" maxLength={5} />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-semibold text-slate-700">Primary Interest</label>
                    <select id="interest" name="interest" value={formData.interest} onChange={handleInputChange} className="input-field">
                      <option>General Inquiry</option>
                      <option>FCP Baseline Package</option>
                      <option>GSA Schedule Management</option>
                      <option>Compliance & Certifications</option>
                      <option>Proposal Writing</option>
                    </select>
                  </div>
                </div>
                
                <div>
                    <label htmlFor="bestTime" className="block text-sm font-semibold text-slate-700">Best Time to Contact</label>
                    <select id="bestTime" name="bestTime" value={formData.bestTime} onChange={handleInputChange} className="input-field">
                      <option>Anytime</option>
                      <option>Morning (8am-12pm)</option>
                      <option>Afternoon (12pm-5pm)</option>
                      <option>Evening (5pm-8pm)</option>
                    </select>
                </div>

                {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}
                {success && <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">{success}</div>}

                <Button type="submit" disabled={loading} size="lg">
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Info Side */}
          <div className="space-y-6">
              <Card className="p-6" hover>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600"><Phone size={24} /></div>
                  <h3 className="text-lg font-bold text-slate-900">Direct Contact</h3>
                </div>
                <div className="space-y-3">
                  <a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition group">
                      <span className="font-semibold group-hover:underline">{BRAND.phone}</span>
                  </a>
                  <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition group">
                      <span className="font-semibold group-hover:underline">{BRAND.email}</span>
                  </a>
                  <div className="flex items-start gap-3 text-slate-600">
                    <p className="font-semibold">{BRAND.location}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-blue-600 text-white text-center" hover>
                <h3 className="font-bold text-xl">Ready for a Strategy Call?</h3>
                <p className="mt-2 text-sm text-blue-100">
                  The fastest way to get answers is a free, 15-minute readiness call. No pressure, just a clear plan.
                </p>
                <LinkButton 
                  href={LINKS.booking}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 w-full bg-white text-blue-600 hover:bg-slate-100"
                >
                  Book Your Free Call
                  <ArrowRight size={16} className="ml-2"/>
                </LinkButton>
              </Card>
            </div>
        </div>
      </Section>
    </>
  );
}

// Add this style to your globals.css or a relevant stylesheet
/*
.input-field {
  @apply mt-2 block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10;
}
*/
