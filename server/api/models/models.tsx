import { ReqPost } from '../../types';
const db = require('../../db/db');

module.exports = {
  getResults: (callback, id: { search: string }) => {
    db.query(`SELECT * FROM posts WHERE title LIKE '%${id.search}%'`)
      .then(res => {
        Promise.all(res.rows.map(post => {
          return db.query(`SELECT name FROM users WHERE user_id=${post.user_id}`)
          .then(res => {
            post.user_name = res.rows[0].name;
            return post;
          })
        }))
          .then((updatedPosts: ReqPost[]) => {
            callback(null, updatedPosts)
          })
      })
      .catch(err => {
        callback(err)
      })
  },
  getPost: (callback, id: { id: number }) => {
    const post_id = Number(id.id);

    const postQuery = `
      SELECT p.*, u.*,
      (SELECT json_agg(answer)
        FROM (
          SELECT a.*
          FROM answers a
          WHERE a.parent_post_id = p.post_id
        ) answer
        ) AS answers,
        (SELECT json_agg(comment)
        FROM (
          SELECT c.*
          FROM comments c
          WHERE c.parent_post_id = p.post_id
        ) comment
        ) AS comments
      FROM posts p
      JOIN users u ON p.user_id = u.user_id
      WHERE p.post_id = $1;
    `;

      db.query(postQuery, [post_id])
        .then(res => {
          Promise.all(res.rows[0].answers.map(answer => {
            return db.query(`SELECT * FROM comments WHERE parent_answer_id=${answer.answer_id}`)
            .then(res => {
              answer.comments = res.rows;
              return answer;
            })
          }))
            .then(updatedAnswers => {
              res.rows[0].answers = updatedAnswers;
              console.log('this is updatedPosts: ', res.rows[0])
              callback(null, res.rows[0])
            })
        })
        .catch(err => {
          callback(err)
        })
  }

  // pull all from posts(post_id) + username(post_id) + answers(post_id) + comments(post_id)
    // use json agg
  // pull all comments(answer_id)
}