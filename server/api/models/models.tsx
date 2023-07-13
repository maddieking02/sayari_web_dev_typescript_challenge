import { ReqPost } from '../../types';
import { QueryResult, QueryResultError } from 'pg';
import { from, forkJoin } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
const db = require('../../db/db');

module.exports = {
  getResults: (callback, id: { search: string }) => {
    from(db.query(`SELECT * FROM posts WHERE title LIKE '%${id.search}%'`)).pipe(
      switchMap((res: QueryResult) => {
        const updatedResults = res.rows.map(post => {
          return from(db.query(`SELECT name FROM users WHERE user_id=${post.user_id}`)).pipe(
            map((res: QueryResult) => {
              post.user_name = res.rows[0].name;
              return post;
            }),
          );
        });
        return forkJoin(updatedResults);
      })
    ).subscribe({
      next: (updatedPosts : ReqPost[]) => {
        callback(null, updatedPosts);
      },
      error: (err: QueryResultError) => {
        callback(err);
      }
    });
  },
  getPost: (callback, id: { id: number }) => {
    const post_id = Number(id.id);

    const postQuery = `
      SELECT p.*, u.*,
      (SELECT json_agg(answer)
        FROM (
          SELECT a.*, u_answer.name AS user_name
          FROM answers a
          JOIN users u_answer ON a.user_id = u_answer.user_id
          WHERE a.parent_post_id = p.post_id
        ) answer
        ) AS answers,
        (SELECT json_agg(comment)
        FROM (
          SELECT c.*, u_comment.name AS user_name
          FROM comments c
          JOIN users u_comment ON c.user_id = u_comment.user_id
          WHERE c.parent_post_id = p.post_id
        ) comment
        ) AS comments
      FROM posts p
      JOIN users u ON p.user_id = u.user_id
      WHERE p.post_id = $1;
    `;

      db.query(postQuery, [post_id])
        .then(res => {
          if (res.rows[0].answers && res.rows[0].answers.length > 0) {
            return Promise.all(res.rows[0]?.answers.map(answer => {
              return db.query(`SELECT * FROM comments WHERE parent_answer_id=${answer.answer_id}`)
                .then(res => {
                  answer.comments = res.rows;
                  return answer;
                })
            }))
              .then(updatedAnswers => {
                res.rows[0].answers = updatedAnswers || [];
                const answerPromises = res.rows[0].answers?.map(answer => {
                  return Promise.all(answer.comments?.map(comment => {
                    return db.query(`SELECT name FROM users WHERE user_id = ${comment.user_id}`)
                      .then(commentUser => {
                        comment.user_name = commentUser.rows[0].name;
                        return comment;
                      })
                  }))
                    .then(updatedComments => {
                      answer.comments = updatedComments || null;
                      return answer;
                    })
                });
                return Promise.all(answerPromises)
                  .then(updatedAnswersWithComments => {
                    res.rows[0].answers = updatedAnswersWithComments;
                    callback(null, res.rows[0]);
                  });
              });
          } else {
            callback(null, res.rows[0]);
          }
        })
        .catch(err => {
          callback(err);
        });
  }
}