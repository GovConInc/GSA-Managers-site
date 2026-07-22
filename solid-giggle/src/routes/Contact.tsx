import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
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
      await submitContact(formData);
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
        <meta name="description" content="Get in touch with GSA Managers. Questions about GSA Schedules, compliance, or proposals — we're here to help." />
      </Helmet>

      {/* Hero */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-4">Contact Us</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Get in touch.
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg text-ink-light leading-relaxed">
            New applicant, existing holder, or just have a question — send us a message or book a call. We respond within one business day.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-surface py-20 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8" hover={false}>
                <h2 className="text-xl font-bold text-ink">Send Us a Message</h2>
                <p className="mt-1 text-sm text-ink-light">
                  We respond to all inquiries within one business day.
                </p>

                <form className="mt-8 space-y-5" onSubmit={onSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-ink">Full Name *</label>
                      <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required className="input-field" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-ink">Email Address *</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="input-field" placeholder="you@company.com" />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-ink">Company Name</label>
                      <input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} className="input-field" placeholder="Acme Inc." />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-ink">Phone Number</label>
                      <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="input-field" placeholder="(555) 123-4567" />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cage" className="block text-sm font-medium text-ink">CAGE Code (Optional)</label>
                      <input id="cage" name="cage" type="text" value={formData.cage} onChange={handleInputChange} className="input-field" placeholder="e.g. 1A2B3" maxLength={5} />
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-ink">Primary Interest</label>
                      <select id="interest" name="interest" value={formData.interest} onChange={handleInputChange} className="input-field">
                        <option>General Inquiry</option>
                        <option>Catalog Upload &amp; Training ($999)</option>
                        <option>GSA Modification ($1,999)</option>
                        <option>Complete GSA Management ($4,500/yr)</option>
                        <option>GSA Schedule Submission</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bestTime" className="block text-sm font-medium text-ink">Best Time to Contact</label>
                    <select id="bestTime" name="bestTime" value={formData.bestTime} onChange={handleInputChange} className="input-field">
                      <option>Anytime</option>
                      <option>Morning (8am–12pm)</option>
                      <option>Afternoon (12pm–5pm)</option>
                      <option>Evening (5pm–8pm)</option>
                    </select>
                  </div>

                  {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
                  )}
                  {success && (
                    <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-700">{success}</div>
                  )}

                  <Button type="submit" disabled={loading} size="lg">
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <Card className="p-6" hover={false}>
                <h3 className="text-lg font-bold text-ink mb-4">Direct Contact</h3>
                <div className="space-y-3">
                  <a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 text-sm text-ink-light hover:text-cta transition-colors">
                    <Phone size={16} className="text-cta shrink-0" />
                    {BRAND.phone}
                  </a>
                  <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-sm text-ink-light hover:text-cta transition-colors">
                    <Mail size={16} className="text-cta shrink-0" />
                    {BRAND.email}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-ink-light">
                    <MapPin size={16} className="text-cta shrink-0" />
                    {BRAND.location}
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-ink text-white border-0" hover={false}>
                <h3 className="font-bold text-lg text-white">Prefer a call?</h3>
                <p className="mt-2 text-sm text-white/60">
                  15 minutes. We'll assess where your schedule stands and tell you what it needs. Free, no obligation.
                </p>
                <LinkButton
                  href={LINKS.booking}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 w-full"
                >
                  Book Your Free Call
                  <ArrowRight size={14} className="ml-2" />
                </LinkButton>
              </Card>

              <Card className="p-6 border-warm-border" hover={false}>
                <h3 className="font-bold text-lg text-ink">Know what you need?</h3>
                <p className="mt-2 text-sm text-ink-light">
                  Skip the form. Order directly — checkout takes two minutes.
                </p>
                <LinkButton
                  href="/order"
                  variant="secondary"
                  className="mt-5 w-full"
                >
                  Go to Order Page
                  <ArrowRight size={14} className="ml-2" />
                </LinkButton>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
