import React from "react";
import { useAppSelector } from '../hooks';
import { format } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';

export const Post = (): React.JSX.Element => {
  const { post } = useAppSelector(state => state.data)

  const formatDate = (unix: string | number) => {
    const newDate = format(new Date(Number(unix) * 1000), 'MM/dd/yyyy');
    return newDate;
  }

  return (
    <div id="post-contain" className="box">
      {post.post_id !== null ?
        <div>
          <div>
            <div id="post" className="bg">
              <div className="title result-title">{post.title}</div>
              <div className="body">{ReactHtmlParser(post.body)}</div>
              <div className="user">{post.name} <p className="user-action">asked {formatDate(post.creation)}</p></div>
            </div>
            {post.comments?.map((comment, idx) => {
              return (
                <div className="comment-contain" key={(idx + 1) * Math.random()}>
                  <div className="body">{comment.body}</div>
                  <div className="user">--{comment.user_name}</div>
                </div>
              )
            })}
            <div id="answer-num">{post.answers?.length === undefined || 0 ? 0 : post.answers?.length} {post.answers?.length === 1 ? 'Answer' : 'Answers'}</div>
            {post.answers?.map((answer, idx) => {
              return (
                <div className="answer-contain" key={(idx + 1) * Math.random()}>
                  <div className="bg">
                    <div className="body">{ReactHtmlParser(answer.body)}</div>
                    <div className="user">{answer.user_name} <p className="user-action">answered {formatDate(answer.creation)}</p></div>
                  </div>
                  {answer.comments?.map((comment, idx) => {
                    return (
                      <div className="comment-contain" key={(idx + 1) * Math.random()}>
                        <div className="body">{comment.body}</div>
                        <div className="user">--{comment.user_name}</div>
                      </div>
                    )
                  })}
                  <div></div>
                </div>
              )
            })}
          </div>
        </div>
      : null}
    </div>
  );
};