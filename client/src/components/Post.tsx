import React from "react";
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateDisplay, updatePost } from '../auth';
import { format } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';

export const Post = (): React.JSX.Element => {
  const { results, post } = useAppSelector(state => state.data)
  const dispatch = useAppDispatch();

  const formatDate = (unix: string | number) => {
    const newDate = format(new Date(Number(unix) * 1000), 'MM/dd/yyyy');
    console.log('THIS IS UNIX DATE??', unix, typeof unix)
    console.log('THIS IS NEWDATE', newDate)
    return newDate;
  }

  console.log('THIS IS UNIX DATE??', post.creation, typeof post.creation)

  return (
    <div>
      {post.post_id !== null ?
        <div>
          <div>
            <div>{post.title}</div>
            <div>{ReactHtmlParser(post.body)}</div>
            <div>{post.name} asked {formatDate(post.creation)}</div>
            {post.comments?.map((comment, idx) => {
              return (
                <div className="comment-contain" key={(idx + 1) * Math.random()}>
                  <div>{comment.body}</div>
                  <div>--{comment.user_name}</div>
                </div>
              )
            })}
            {post.answers?.map((answer, idx) => {
              return (
                <div className="answer-contain" key={(idx + 1) * Math.random()}>
                  <div>{ReactHtmlParser(answer.body)}</div>
                  <div>{answer.user_name} answered {formatDate(answer.creation)}</div>
                  {answer.comments?.map((comment, idx) => {
                    return (
                      <div className="comment-contain" key={(idx + 1) * Math.random()}>
                        <div>{comment.body}</div>
                        <div>--{comment.user_name}</div>
                      </div>
                    )
                  })}
                  <div></div>
                </div>
              )
            })}
          </div>
          <div>
            {post.score}
          </div>
        </div>
      : null}
    </div>
  );
};