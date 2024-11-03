//import { GradientTitle } from "../GradientTitle/GradientTitle";//
import { Slider } from "../Slider/Slider";
import photo_1 from "../../../images/Slider/22651.jpg";
import photo_2 from "../../../images/Slider/plitka-bari-axima-30702.jpg";
import photo_3 from "../../../images/catalog/GK_EXCLUSIVE/Imperador Gold/interiors/Imperador-Gold-v-interere-1(1).jpg";
import "../Content/Content.css";
import { NavLink } from "react-router-dom";

const setActive = ({ isActive }) =>
  `menu__link, label ${isActive ? "menu__link_active" : ""}`;

const sliderData = [
  {
    id: 1001,
    label: (
      <NavLink to="/Plitka" className={setActive}>
        Керамическая плитка
      </NavLink>
    ),
    img: photo_1,
  },
  {
    id: 1002,
    label: (
      <NavLink to="/Keramogranit" className={setActive}>
        Керамогранит
      </NavLink>
    ),
    img: photo_2,
  },
  {
    id: 1003,
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
