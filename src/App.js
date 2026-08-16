import React from "react";
import "./style.css";
import MainBox from "./MainBox";

export default function App() {
  let st = { display: "flex" };
  return (
    <div className="main">
      <MainBox />
    </div>
  );
}
