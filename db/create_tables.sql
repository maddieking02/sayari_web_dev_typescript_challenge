-- CREATE TABLES
CREATE TABLE users (
  user_id INT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE posts (
  post_id INT PRIMARY KEY,
  title VARCHAR(255),
  body TEXT,
  creation BIGINT,
  score INT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE answers (
  answer_id INT PRIMARY KEY,
  parent_post_id INT,
  body TEXT,
  creation BIGINT,
  score INT,
  accepted BOOLEAN,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (parent_post_id) REFERENCES posts(post_id)
);

CREATE TABLE comments (
  comment_id INT PRIMARY KEY,
  body TEXT,
  user_id INT,
  parent_post_id INT,
  parent_answer_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (parent_post_id) REFERENCES posts(post_id),
  FOREIGN KEY (parent_answer_id) REFERENCES answers(answer_id)
);