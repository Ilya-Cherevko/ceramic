//import { GradientTitle } from "../GradientTitle/GradientTitle";//
import { Slider } from "../Slider/Slider";
import photo_1 from "../../../images/naznachenie_front_1.jpg";
import photo_2 from "../../../images/naznachenie_front_2.jpg";
import photo_3 from "../../../images/naznachenie_front_3.jpg";
import "../Content/Content.css";
import { NavLink } from "react-router-dom";

const setActive = ({ isActive }) =>
  `menu__link, label ${isActive ? "menu__link_active" : ""}`;

const sliderData = [
  {
    id: 1,
    label: (
      <NavLink to="/Plitka" className={setActive}>
        Керамическая плитка
      </NavLink>
    ),
    img: photo_1,
  },
  {
    id: 3,
    label: (
      <NavLink to="/Keramogranit" className={setActive}>
        Керамогранит
      </NavLink>
    ),
    img: photo_2,
  },
  {
    id: 3,
    label: (
      <NavLink to="/Keramogranit" className={setActive}>
        Гибкий мрамор
      </NavLink>
    ),
    img: photo_3,
  },
];

const Content = () => (
  <div className="content">
    <Slider data={sliderData} key={sliderData.id} />
  </div>
);

export default Content;
