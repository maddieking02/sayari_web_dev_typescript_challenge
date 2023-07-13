import React from "react";
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateDisplay, updatePost } from '../auth';
import type { Result } from "../types";
import { format } from 'date-fns';
import { getPost } from '../helpers/methods';
import ReactHtmlParser from 'react-html-parser';


export const Results = (): React.JSX.Element => {
  const { results, post } = useAppSelector(state => state.data)
  const dispatch = useAppDispatch();

  const handleTitleClick = (e: React.MouseEvent<HTMLElement>) => {
    const selectionID = Number(e.currentTarget.getAttribute('data-id'));
    getPost(selectionID, (err: Error | null, res: []) => {
      if (err) {
        dispatch(updatePost([]))
        dispatch(updateDisplay('post'))
      } else {
        dispatch(updatePost(res))
        dispatch(updateDisplay('post'))
      }
    })
    dispatch(updateDisplay('post'))
  }

  return (
    <div id="search-results-contain">
      <h1 id="search-results">Search Results</h1>
      <div id="search-num">{results.length} results</div>
      {results.length > 0 ? results.map((result: Result, idx: number)=> {
        const formattedDate = format(new Date(result.creation * 1000), 'MM/dd/yyyy');

        return (
          <div key={(idx + 1) * Math.random()} className="result-contain">
            <div key={(idx + 1) * Math.random()} data-id={result.post_id} onClick={(e) => handleTitleClick(e)} className="title result-title pointer">{result.title}</div>
            <div key={(idx + 1) * Math.random()} className="result-body">
              {ReactHtmlParser(result.body.substring(0, 300))}
              {result.body.length > 300 && '...'}
            </div>
            <div key={(idx + 1)* Math.random()} className="user">{result.user_name} <p className="user-action">asked {formattedDate}</p></div>
          </div>
        )
      }) : null}
    </div>
  );

};