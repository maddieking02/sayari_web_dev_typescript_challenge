import React from "react";
import { useAppSelector } from '../hooks';
import { Nav } from "./Nav";
import { Results } from "./Results";
import { Home } from "./Home";
import { Post } from "./Post";

export const App = (): React.JSX.Element => {
  const { display } = useAppSelector(state => state.data)

  return (
    <div>
      <Nav/>
      {
        display === 'home' ? <Home /> :
        display === 'results' ? <Results /> :
        display === 'post' ? <Post /> :
        null
      }
    </div>
  );
};