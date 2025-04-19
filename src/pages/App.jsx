import { Routes, Route } from "react-router-dom";
import "../styles/App.css";
import MainLayout from "../components/layouts/Main";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import Service from "./Service";
import NotFound from "./NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="service" element={<Service />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
