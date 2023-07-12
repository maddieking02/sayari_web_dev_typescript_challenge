import React from "react";
import bgImage from "../assets/pink-blue-bg.png";
import { useAppSelector, useAppDispatch } from '../hooks';
import { Nav } from "./Nav";
import { Results } from "./Results";
import { Home } from "./Home";

export const App = (): React.JSX.Element => {
  const { display } = useAppSelector(state => state.data)

  return (
    <div>
      <Nav/>
      <h1>Test</h1>
      {/* <img src={bgImage} alt="" /> */}
      {display === 'home' ? <Home /> : <Results />}
    </div>
  );
};