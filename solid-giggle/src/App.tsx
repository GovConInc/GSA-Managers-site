import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Enroll from "./routes/Enroll";

// Services Pages
import ServicesGSA from "./routes/services/GSA";
import ServicesPrograms from "./routes/services/Programs";
import ServicesCompliance from "./routes/services/Compliance";
import ServicesProposalWriting from "./routes/services/ProposalWriting";

// About & Contact
import About from "./routes/About";
import Contact from "./routes/Contact";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Services Routes */}
        <Route path="/services" element={<ServicesGSA />} />
        <Route path="/services/gsa-contractors" element={<ServicesGSA />} />
        <Route path="/services/programs" element={<ServicesPrograms />} />
        <Route path="/services/compliance-capture" element={<ServicesCompliance />} />
        <Route path="/services/proposal-writing" element={<ServicesProposalWriting />} />

        {/* Enroll Page */}
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
