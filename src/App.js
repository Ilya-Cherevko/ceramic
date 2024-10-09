import "./App.css";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Category from "./Pages/Category";
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
        <Route path="/:id" element={<Category />} />
        <Route path="/:id/:Name" element={<CardBuild />} />
        <Route path="/:id/:Name/:Collection" element={<CardPit />} />
        
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="*" element={<NotPage />} />
      </Routes>
      <Ffooter />
    </div>
  );
}

export default App;
