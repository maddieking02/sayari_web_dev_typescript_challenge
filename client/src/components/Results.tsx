import React from "react";
import { useAppSelector, useAppDispatch } from '../hooks';
import type { Result } from "../types";
import { format } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';


export const Results = (): React.JSX.Element => {
  const { results } = useAppSelector(state => state.data)

  console.log('this is results: ', results)

  return (
    <div>
      <h1>RESULTS</h1>
      {results.length > 0 ? results.map((result: Result, idx: number)=> {
        const formattedDate = format(new Date(result.creation * 1000), 'MM/dd/yyyy');

        return (
          <div style={{ border: '2px solid blue'}}>
            <div key={idx}>{result.title}</div>
            <div key={idx} >{ReactHtmlParser(result.body)}</div>
            <div key={idx}>{result.user_name} asked {(formattedDate)}</div>
          </div>
        )
      }) : null}
    </div>
  );

};