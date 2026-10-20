import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import About from "@/pages/About";
import Bag from "@/pages/Bag";
import Collections from "@/pages/Collections";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/NotFound";
import ProductPage from "@/pages/Product";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/:id" element={<ProductPage />} />
        <Route path="bag" element={<Bag />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="legal" element={<Legal />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
