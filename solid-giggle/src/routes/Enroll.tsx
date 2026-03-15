import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

// Inline styles from enroll.html (for demo; move to CSS module for production)
const enrollStyles = `
	/* ... (all CSS from <style> in enroll.html goes here) ... */
`;

export default function Enroll() {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalType, setModalType] = useState("fcp");
	const [success, setSuccess] = useState(false);
	const [form, setForm] = useState({ company: "", name: "", email: "", phone: "", contract: "" });
	const [error, setError] = useState({ company: false, name: false, email: false, phone: false });
	const modalOverlayRef = useRef(null);

	// Modal open/close logic
	const openModal = (type) => {
		setModalType(type);
		setModalOpen(true);
		document.body.style.overflow = "hidden";
	};
	const closeModal = () => {
		setModalOpen(false);
		document.body.style.overflow = "";
	};
	const closeModalOutside = (e) => {
		if (e.target === modalOverlayRef.current) closeModal();
	};

	// Form validation
	const validate = () => {
		const err = {
			company: !form.company,
			name: !form.name,
			email: !/^\S+@\S+\.\S+$/.test(form.email),
			phone: form.phone.length < 7,
		};
		setError(err);
		return !Object.values(err).some(Boolean);
	};

	// Simulate checkout
	const checkout = (e) => {
		e.preventDefault();
		if (!validate()) return;
		setTimeout(() => setSuccess(true), 1000); // Simulate success
	};

	// Success view
	if (success) {
		return (
			<div className="success-wrap" style={{ maxWidth: 600, margin: "80px auto", padding: 24, textAlign: "center" }}>
				<div className="success-ring" style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(5,150,105,.1)", border: "2px solid rgba(5,150,105,.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}>
					<svg viewBox="0 0 32 32" fill="none" width={32} height={32}><polyline points="6,16 13,22 26,10" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
				</div>
				<h2>You're in. Let's go.</h2>
				<p>Payment confirmed. Book your intro meeting below and we'll get to work immediately.</p>
				<button className="cal-btn" style={{ background: "#1e3a5f", color: "white", fontWeight: 700, fontSize: 15, padding: "15px 30px", borderRadius: 10, border: "none", cursor: "pointer", marginTop: 24 }} onClick={() => window.open("https://calendly.com/YOUR_CALENDLY_LINK", "_blank")}>Book Your Intro Meeting →</button>
				<div className="success-note" style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>Welcome packet sent automatically once you book.</div>
			</div>
		);
	}

	return (
		<>
			<Helmet>
				<title>GSA Managers Inc. — Get Your Schedule Running</title>
			</Helmet>
			<style>{enrollStyles}</style>
			{/* NAV */}
			<nav>
				<div className="nav-in">
					<a className="logo" href="/">GSA Managers Inc.</a>
					<a className="nav-cta" href="#entry-offer">Get Started →</a>
				</div>
			</nav>
			{/* PAGE CONTENT (simplified for demo) */}
			<div id="pageView">
				<section className="hero">
					<div className="hero-eyebrow">GSA Schedule Specialists</div>
					<h1>Already Have a GSA Schedule<br/>But Don't Know <span>How to Run It?</span></h1>
					<p className="hero-sub">We help GSA contractors upload their catalog correctly, understand the system, and manage their Schedule — without dealing with every portal, modification, and compliance requirement themselves.</p>
					<div className="hero-btns">
						<button className="btn-primary" onClick={() => openModal("fcp")}>Upload My Catalog &amp; Get Training</button>
						<a href="#annual-offer" className="btn-secondary">See Annual Management ↓</a>
					</div>
				</section>
				{/* ...rest of enroll.html content would be converted here... */}
			</div>
			{/* MODAL (simplified) */}
			{modalOpen && (
				<div className="modal-overlay open" ref={modalOverlayRef} onClick={closeModalOutside}>
					<div className="modal">
						<div className="modal-head">
							<div>
								<h3>Catalog Upload + Training</h3>
								<p>One-time — $1,200</p>
							</div>
							<button className="modal-close" onClick={closeModal}>×</button>
						</div>
						<form className="modal-body" onSubmit={checkout}>
							<div className="m-row">
								<div className="m-field">
									<label className="m-label">Company</label>
									<input type="text" className={`m-input${error.company ? " err" : ""}`} value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Acme Federal LLC" />
									{error.company && <div className="m-err on">Required</div>}
								</div>
								<div className="m-field">
									<label className="m-label">Your Name</label>
									<input type="text" className={`m-input${error.name ? " err" : ""}`} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Jane Smith" />
									{error.name && <div className="m-err on">Required</div>}
								</div>
							</div>
							<div className="m-field">
								<label className="m-label">Email</label>
								<input type="email" className={`m-input${error.email ? " err" : ""}`} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@acmefederal.com" />
								{error.email && <div className="m-err on">Valid email required</div>}
							</div>
							<div className="m-row">
								<div className="m-field">
									<label className="m-label">Phone</label>
									<input type="tel" className={`m-input${error.phone ? " err" : ""}`} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 000-0000" />
									{error.phone && <div className="m-err on">Required</div>}
								</div>
								<div className="m-field">
									<label className="m-label">Contract # <span className="m-opt">(if existing)</span></label>
									<input type="text" className="m-input" value={form.contract} onChange={e => setForm(f => ({ ...f, contract: e.target.value }))} placeholder="GS-00F-XXXXX" />
								</div>
							</div>
							<button className="m-cta crimson" type="submit">Pay &amp; Get Started →</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
}