import React from "react";
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateDisplay, updatePost } from '../auth';
import { format } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';

export const Post = (): React.JSX.Element => {
  const { results, post } = useAppSelector(state => state.data)
  const dispatch = useAppDispatch();

  // const formattedPostDate = post.creation ? format(new Date(Number(post.creation) * 1000), 'MM/dd/yyyy') : '';

  const formatDate = (unix: string | number) => {
    const newDate = format(new Date(Number(unix) * 1000), 'MM/dd/yyyy');
    return newDate;
  }

  return (
    <div>
      {post.post_id !== null ?
        <div>
          <div>
            <div>{post.title}</div>
            <div>{ReactHtmlParser(post.body)}</div>
            <div>{post.name} asked {formatDate(post.creation)}</div>
            {post.comments?.map(comment => {
              return (
                <div className="comment-contain" >
                  <div>{comment.body}</div>
                  <div>--{comment.user_id}</div>
                  {/* missing comment user name */}
                </div>
              )
            })}
            {post.answers?.map(answer => {
              return (
                <div className="answer-contain">
                  <div>{ReactHtmlParser(answer.body)}</div>
                  <div>{answer.user_id} answered {formatDate(answer.creation)}</div>
                  {/* missing answer user name */}
                  {answer.comments?.map(comment => {
                    return (
                      <div className="comment-contain" >
                        <div>{comment.body}</div>
                        <div>--{comment.user_id}</div>
                        {/* missing comment user name */}
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