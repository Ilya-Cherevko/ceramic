import "./App.css";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Plitka from "./Pages/Plitka";
import Keramogranit from "./Pages/Keramogranit";
import Content from "../src/Components/Slider/Content/Content";
import Ffooter from "./Components/footer";
import AboutUs from "./Pages/AboutUs";
import CardBuild from "./Pages/CardBuild";
import CardPit from "./Pages/CardPit";
import NotPage from "./Pages/404";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/Plitka" element={<Plitka />} />
        <Route path="/Plitka/:Name" element={<CardBuild />} />
        <Route path="/Keramogranit" element={<Keramogranit />} />
        <Route path="/Keramogranit/:Name" element={<CardBuild />} />
        <Route path="/Keramogranit/:Name/:Сollection" element={<CardPit />} />
        <Route path="/*/:Сollection" element={<CardPit />} />
        
        <Route path="/Keramogranit/*" element={<CardPit />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="*" element={<NotPage />} />
      </Routes>
      <Ffooter />
    </div>
  );
}

export default App;
