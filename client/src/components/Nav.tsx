import React from "react";
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateDisplay, updateSearch, updateResults } from '../auth';
import { getResults } from '../helpers/methods';
import { BiSearch } from 'react-icons/bi';
import Logo from '../assets/stackoverfaux.png';

export const Nav = (): React.JSX.Element => {
  const { search } = useAppSelector(state => state.data)
  const dispatch = useAppDispatch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      getResults(search, (err: Error | null, res: []) => {
        if (err) {
          dispatch(updateResults([]))
          dispatch(updateDisplay('results'))
        } else {
          dispatch(updateResults(res))
          dispatch(updateDisplay('results'))
        }
      })
      dispatch(updateSearch(''))
    }
  }

  return (
    <div id="nav-contain" className="center-items-row">
      <div id="logo-contain" className="center-items-row pointer" onClick={() => dispatch(updateDisplay('home'))}>
        <img id="logo" src={Logo} alt=""/>
      </div>
      <div id="icon-input-contain" className="center-items-row">
        <BiSearch />
        <input
          id="search-input"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => dispatch(updateSearch(e.target.value))}
          onKeyDown={(e) => handleKeyDown(e)}
        ></input>
      </div>
      <div id="button-contain" className="center-items-row">
        <button className="button" type="button">Log in</button>
        <button className="button" type="button">Sign Up</button>
      </div>
    </div>
  );
};
