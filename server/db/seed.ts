const db = require('./db')
const data = require('./stackoverfaux.json');
// const data = require('./testdata.json');
import type { User, Comment, Answer, Post } from '../types';

data.forEach(( post: Post ) => {

  const post_user = post.user;
  const post_comments = post.comments;
  const post_answers = post.answers;

  // -- SEED USERS TABLE
  const insertUser = (): Promise<User> => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users(user_id, name) VALUES ($1, $2)', [post_user.id, post_user.name], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };


  // -- SEED POSTS TABLE
  const insertPost = () => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO posts(post_id, title, body, creation, score, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
        [post.id, post.title, post.body, post.creation, post.score, post_user.id],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  };

  // -- SEED <POST> COMMENTS TABLE
  const insertPostComments = () => post_comments.forEach((comment: Comment) => {

    const insertUser = (): Promise<User> => {
      return new Promise((resolve, reject) => {
        db.query(
          'SELECT * FROM users WHERE user_id = $1',
          [comment.user.id],
          (err, res) => {
            if (err) {
              reject(err);
            } else {
              if (res.rows.length > 0) {
                // User already exists, resolve with existing user data
                resolve(res.rows[0]);
              } else {
                // User doesn't exist, insert the new user
                db.query(
                  'INSERT INTO users(user_id, name) VALUES ($1, $2)',
                  [comment.user.id, comment.user.name],
                  (err, res) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(res.rows[0]);
                    }
                  }
                );
              }
            }
          }
        );
      });
    };


    const insertComment = () => {
      return new Promise((resolve, reject) => {
        db.query(
          'INSERT INTO comments(comment_id, body, user_id, parent_post_id) VALUES ($1, $2, $3, $4)',
          [comment.id, comment.body, comment.user.id, post.id],
          (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          }
        );
      });
    };

    insertUser()
      .then(() => {
        console.log('SUCCESS in post_comment_user insertion');
        return insertComment();
      })
      .then(() => {
        console.log('SUCCESS in post_comment insertion');
      })
      .catch((error) => {
        console.log('ERROR:', error);
        return insertComment();
      });
  });

  // -- SEED ANSWERS TABLE
  const insertPostAnswers = () => post_answers.forEach(( answer: Answer ) => {

    const insertUser = (): Promise<User> => {
      return new Promise((resolve, reject) => {
        db.query(
          'SELECT * FROM users WHERE user_id = $1',
          [answer.user.id],
          (err, res) => {
            if (err) {
              reject(err);
            } else {
              if (res.rows.length > 0) {
                resolve(res.rows[0]);
              } else {
                db.query(
                  'INSERT INTO users(user_id, name) VALUES ($1, $2)',
                  [answer.user.id, answer.user.name],
                  (err, res) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(res.rows[0]);
                    }
                  }
                );
              }
            }
          }
        );
      });
    };

    const insertAnswer = () => {
      return new Promise((resolve, reject) => {
        db.query(
          'INSERT INTO answers(answer_id, parent_post_id, body, creation, score, accepted, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [answer.id, post.id, answer.body, answer.creation, answer.score, answer.accepted, answer.user.id]
        )
          .then((res) => {
            console.log('SUCCESS in post_answers insertion');
            resolve(res);
          })
          .catch((err) => {
            console.log('ERROR in post_answers insertion:', err);
            reject(err);
          });
      });
    };

    // -- SEED <ANSWER> COMMENTS TABLE
    const insertAnswerComments = () => answer.comments.forEach(( comment: Comment ) => {
      const insertUser = (): Promise<User> => {
        return new Promise((resolve, reject) => {
          db.query(
            'SELECT * FROM users WHERE user_id = $1',
            [comment.user.id],
            (err, res) => {
              if (err) {
                reject(err);
              } else {
                if (res.rows.length > 0) {
                  // User already exists, resolve with existing user data
                  resolve(res.rows[0]);
                } else {
                  // User doesn't exist, insert the new user
                  db.query(
                    'INSERT INTO users(user_id, name) VALUES ($1, $2)',
                    [comment.user.id, comment.user.name],
                    (err, res) => {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(res.rows[0]);
                      }
                    }
                  );
                }
              }
            }
          );
        });
      };

      const insertComment = () => {
        return new Promise((resolve, reject) => {
          db.query(
            'INSERT INTO comments(comment_id, body, user_id, parent_answer_id) VALUES ($1, $2, $3, $4)',
            [comment.id, comment.body, comment.user.id, answer.id] // need to wait until answer.id is inserted into answers table
          )
            .then((res) => {
              console.log('SUCCESS in answer_comment insertion');
              resolve(res);
            })
            .catch((err) => {
              console.log('ERROR in answer_comment insertion:', err);
              reject(err);
            });
        });
      };

      insertUser()
        .then(() => {
          return insertComment();
        })
        .catch(() => {
          return insertComment();
        })
    })

    insertUser()
    .then(() => {
      console.log('SUCCESS in insertUser');
    })
    .catch((error) => {
      console.log('ERROR in insertUser:', error);
    })
    .then(() => {
      // Regardless of success or failure, run insertAnswer() and chain insertAnswerComments()
      return insertAnswer();
    })
    .then(() => {
      // insertAnswer() succeeded, now run insertAnswerComments()
      return insertAnswerComments();
    })
    .then(() => {
      console.log('Both insertAnswer() and insertAnswerComments() have completed');
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
  })

  // -- INVOKE ALL SEEDING FUNCTIONS
  insertUser()
  .then(() => {
    console.log('SUCCESS in user insertion');
    return insertPost();
  })
  .then(() => {
    console.log('SUCCESS in post insertion');
    return insertPostComments()
  })
  .then(() => {
    console.log('SUCCESS in post_comments insertion');
    return insertPostAnswers()
  })
  .then(() => {
    console.log('SUCCESS in post_answers insertion');
  })
  .catch((error) => {
    console.log('ERROR:', error);
  });

})

// -- TEST THAT DB CONNECTION HAS BEEN ESTABLISHED
// const db = require('./db');

// async function testConnection() {
//   try {
//     const client = await db.connect();

//     const result = await client.query('SELECT NOW()');
//     console.log('Connected to the db:', result.rows[0].now);

//     client.release();
//   } catch (error) {
//     console.error('Error connecting to the db:', error);
//   }
// }

// testConnection();