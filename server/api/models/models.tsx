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
  }
}