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
    <div>
      <h1>Search Results</h1>
      <div>{results.length} results</div>
      {results.length > 0 ? results.map((result: Result, idx: number)=> {
        const formattedDate = format(new Date(result.creation * 1000), 'MM/dd/yyyy');

        return (
          <div key={(idx + 1) * Math.random()} style={{ border: '2px solid grey'}}>
            <div key={(idx + 1) * Math.random()} data-id={result.post_id} onClick={(e) => handleTitleClick(e)} className="result-title pointer">{result.title}</div>
            <div key={(idx + 1) * Math.random()} >{ReactHtmlParser(result.body)}</div>
            <div key={(idx + 1)* Math.random()}>{result.user_name} asked {formattedDate}</div>
          </div>
        )
      }) : null}
    </div>
  );

};