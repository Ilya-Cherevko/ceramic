import React from "react";
import { NavLink } from "react-router-dom";

export default function NotPage() {
  return (
    <p>
      Такой страницы нет, вернитесь в начало
      <NavLink to="/"></NavLink>
    </p>
  );
}
