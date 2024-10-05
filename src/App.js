import "./App.css";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Plitka from "./Plitka";
import Keramogranit from "./Keramogranit";
import Azori from "./Azori";
import Estima from "./Estima";
import Content from "../src/Components/Slider/Content/Content";
import Ffooter from "./footer";
import AboutUs from "./AboutUs";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/Plitka" element={<Plitka />}>
          <Route path="Azori" element={<Azori />} />
        </Route>
        <Route path="/Keramogranit" element={<Keramogranit />}>
          <Route path="Estima" element={<Estima />} />
        </Route>
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
      <Ffooter />
    </div>
  );
}

export default App;
