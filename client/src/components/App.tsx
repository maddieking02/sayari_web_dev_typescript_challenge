import React from "react";
import bgImage from "../assets/pink-blue-bg.png";
import { Nav } from "./Nav";

export const App = (): React.JSX.Element => {
  return (
    <div>
      <Nav/>
      <h1>Test</h1>
      <img src={bgImage} alt="" />
    </div>
  );
};