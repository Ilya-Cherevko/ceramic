//import { GradientTitle } from "../GradientTitle/GradientTitle";//
import { Slider } from "../Slider/Slider";
import photo_1 from "../../../images/naznachenie_front_1.jpg";
import photo_2 from "../../../images/naznachenie_front_2.jpg";
import photo_3 from "../../../images/naznachenie_front_3.jpg";
import "../Content/Content.css";
import { NavLink } from "react-router-dom";

const sliderData = [
  {
    label: (
      <NavLink
        to="/plitka"
        className={({ isActive }) =>
          `menu__link ${isActive ? "menu__link_active" : ""}`
        }
      >
        Керамическая плитка
      </NavLink>
    ),
    title: (
      <NavLink
        to="/plitka"
        className={({ isActive }) =>
          `menu__link ${isActive ? "menu__link_active" : ""}`
        }
      >
        Керамическая плитка
      </NavLink>
    ),
    img: photo_1,
  },
  {
    label: (
      <NavLink
        to="/keramogranit"
        className={({ isActive }) =>
          `menu__link ${isActive ? "menu__link_active" : ""}`
        }
      >
        Керамогранит
      </NavLink>
    ),
    title: (
      <NavLink
        to="/keramogranit"
        className={({ isActive }) =>
          `menu__link ${isActive ? "menu__link_active" : ""}`
        }
      >
        Керамогранит
      </NavLink>
    ),
    img: photo_2,
  },
  {
    label: (
      <NavLink
        to="/keramogranit"
        className={({ isActive }) =>
          `menu__link ${isActive ? "menu__link_active" : ""}`
        }
      >
        Гибкий мрамор
      </NavLink>
    ),
    title: (
      <NavLink
        to="/mramor"
        className={({ isActive }) =>
          `menu__link ${isActive ? "menu__link_active" : ""}`
        }
      >
        Гибкий мрамор
      </NavLink>
    ),
    img: photo_3,
  },
];

const Content = () => (
  <div className="content">
    <Slider data={sliderData} />
  </div>
);

export default Content;
