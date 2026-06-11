import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";

// Services — SEO silo pages
import ServicesHub from "./routes/ServicesHub";
import Management from "./routes/services/Management";
import Modifications from "./routes/services/Modifications";
import FcpTransition from "./routes/services/FcpTransition";
import Submission from "./routes/services/Submission";

// Pricing
import Pricing from "./routes/Pricing";

// Intelligence Hub
import IntelligenceIndex from "./routes/intelligence/Index";
import FcpGuide from "./routes/intelligence/FcpGuide";
import ModRejections from "./routes/intelligence/ModRejections";
import InHouseVsOutsourced from "./routes/intelligence/InHouseVsOutsourced";

// Resources
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

        {/* Services hub (legacy /services/gsa-contractors hashes redirect inside) */}
        <Route path="/services" element={<ServicesHub />} />
        <Route path="/services/gsa-contractors" element={<ServicesHub />} />

        {/* SEO silo — keyword slugs */}
        <Route path="/gsa-contract-management" element={<Management />} />
        <Route path="/gsa-modification-consultant" element={<Modifications />} />
        <Route path="/fcp-transition-service" element={<FcpTransition />} />
        <Route path="/gsa-schedule-submission" element={<Submission />} />

        {/* Pricing */}
        <Route path="/pricing" element={<Pricing />} />

        {/* Intelligence Hub */}
        <Route path="/intelligence" element={<IntelligenceIndex />} />
        <Route path="/intelligence/fas-catalog-platform-transition-guide" element={<FcpGuide />} />
        <Route path="/intelligence/gsa-modification-rejected" element={<ModRejections />} />
        <Route path="/intelligence/in-house-vs-outsourced-gsa-management" element={<InHouseVsOutsourced />} />

        {/* Resources */}
        <Route path="/resources/fcp-compliance-checklist" element={<FcpChecklist />} />

        {/* Order Page */}
        <Route path="/order" element={<Order />} />

        {/* About & Contact */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
