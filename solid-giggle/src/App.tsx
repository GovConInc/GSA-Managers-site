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

// Order
import Order from "./routes/Order";

// About & Contact
import About from "./routes/About";
import Contact from "./routes/Contact";

// Location Pages — City
import TampaPage from "./routes/locations/Tampa";
import WashingtonDCPage from "./routes/locations/WashingtonDC";
import OrlandoPage from "./routes/locations/Orlando";
import MiamiPage from "./routes/locations/Miami";
import AtlantaPage from "./routes/locations/Atlanta";
import DallasPage from "./routes/locations/Dallas";
import SanDiegoPage from "./routes/locations/SanDiego";
import NorfolkPage from "./routes/locations/Norfolk";
import HuntsvillePage from "./routes/locations/Huntsville";
import ColoradoSpringsPage from "./routes/locations/ColoradoSprings";

// Location Pages — State
import FloridaPage from "./routes/locations/Florida";
import VirginiaPage from "./routes/locations/Virginia";
import MarylandPage from "./routes/locations/Maryland";
import TexasPage from "./routes/locations/Texas";
import CaliforniaPage from "./routes/locations/California";

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

        {/* Order Page */}
        <Route path="/order" element={<Order />} />

        {/* Enroll Page */}
        <Route path="/enroll" element={<Enroll />} />

        {/* About & Contact */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Location Routes — City */}
        <Route path="/locations/tampa-fl" element={<TampaPage />} />
        <Route path="/locations/washington-dc" element={<WashingtonDCPage />} />
        <Route path="/locations/orlando-fl" element={<OrlandoPage />} />
        <Route path="/locations/miami-fl" element={<MiamiPage />} />
        <Route path="/locations/atlanta-ga" element={<AtlantaPage />} />
        <Route path="/locations/dallas-tx" element={<DallasPage />} />
        <Route path="/locations/san-diego-ca" element={<SanDiegoPage />} />
        <Route path="/locations/norfolk-va" element={<NorfolkPage />} />
        <Route path="/locations/huntsville-al" element={<HuntsvillePage />} />
        <Route path="/locations/colorado-springs-co" element={<ColoradoSpringsPage />} />

        {/* Location Routes — State */}
        <Route path="/locations/florida" element={<FloridaPage />} />
        <Route path="/locations/virginia" element={<VirginiaPage />} />
        <Route path="/locations/maryland" element={<MarylandPage />} />
        <Route path="/locations/texas" element={<TexasPage />} />
        <Route path="/locations/california" element={<CaliforniaPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
