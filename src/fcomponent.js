import React from 'react'
import { Link } from "react-router-dom";

export default function fcomponent(props) {
  return (
    <div>
      <h1>Привет, {props.name}</h1>
      <Link to="/Plitka">
         Керамическая плитка
      </Link>
      <Link to="/Keramogranit">
         Керамогранит
      </Link>
    </div>
  )
}
