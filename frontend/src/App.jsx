import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Landing from "./pages/Landing.jsx";
import VoiceAdvisory from "./pages/VoiceAdvisory.jsx";
import DiseaseDetection from "./pages/DiseaseDetection.jsx";
import VerifiedProducts from "./pages/VerifiedProducts.jsx";
import CounterfeitDetection from "./pages/CounterfeitDetection.jsx";
import UsageGuidance from "./pages/UsageGuidance.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/advisory" element={<VoiceAdvisory />} />
        <Route path="/disease-detection" element={<DiseaseDetection />} />
        <Route path="/products" element={<VerifiedProducts />} />
        <Route path="/counterfeit-check" element={<CounterfeitDetection />} />
        <Route path="/usage-guide/:productId" element={<UsageGuidance />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
