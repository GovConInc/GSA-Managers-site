import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Enroll from "./routes/Enroll";
import Pricing from "./routes/Pricing";

// Services Pages
import ServicesGSA from "./routes/services/GSA";
import ServicesPrograms from "./routes/services/Programs";
import ServicesCompliance from "./routes/services/Compliance";
import ServicesProposalWriting from "./routes/services/ProposalWriting";
import IntelligenceIndex from "./routes/intelligence/Index";
import FcpGuide from "./routes/intelligence/FcpGuide";
import ModRejections from "./routes/intelligence/ModRejections";
import InHouseVsOutsourced from "./routes/intelligence/InHouseVsOutsourced";
import FcpChecklist from "./routes/resources/FcpChecklist";

// Order
import Order from "./routes/Order";

// About & Contact
import About from "./routes/About";
import Contact from "./routes/Contact";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Services Routes — canonical paths */}
        <Route path="/services" element={<ServicesGSA />} />
        <Route path="/services/gsa-contractors" element={<ServicesGSA />} />
        <Route path="/services/programs" element={<ServicesPrograms />} />
        <Route path="/services/compliance-capture" element={<ServicesCompliance />} />
        <Route path="/services/proposal-writing" element={<ServicesProposalWriting />} />

        {/* SEO silo aliases — keyword-rich URLs that resolve to the same service page */}
        <Route path="/gsa-contract-management" element={<ServicesGSA />} />
        <Route path="/gsa-modification-consultant" element={<ServicesGSA />} />
        <Route path="/fcp-transition-service" element={<ServicesGSA />} />
        <Route path="/gsa-schedule-submission" element={<ServicesGSA />} />

        {/* Pricing */}
        <Route path="/pricing" element={<Pricing />} />

        {/* Intelligence Hub — SEO pillar articles */}
        <Route path="/intelligence" element={<IntelligenceIndex />} />
        <Route path="/intelligence/fas-catalog-platform-transition-guide" element={<FcpGuide />} />
        <Route path="/intelligence/gsa-modification-rejected" element={<ModRejections />} />
        <Route path="/intelligence/in-house-vs-outsourced-gsa-management" element={<InHouseVsOutsourced />} />

        {/* Resources */}
        <Route path="/resources/fcp-compliance-checklist" element={<FcpChecklist />} />

        {/* Order / Checkout */}
        <Route path="/order" element={<Order />} />

        {/* Enroll */}
        <Route path="/enroll" element={<Enroll />} />

        {/* About & Contact */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
