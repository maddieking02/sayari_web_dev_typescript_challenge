export type Display = 'home' | 'results' | 'post';

export interface Result {
  post_id: number,
  title: string,
  body: string,
  creation: number,
  score: number,
  user_id: number,
  user_name: string
}

export interface PostComment {
  comment_id: number,
  body: string,
  user_id: number,
  parent_post_id: number,
  parent_answer_id: null,
  user_name: string
}

export interface AnswerComment {
  comment_id: number,
  body: string,
  user_id: number,
  parent_post_id: null,
  parent_answer_id: number,
  user_name: string
}

export interface Answer {
  answer_id: number,
  parent_post_id: number,
  body: string,
  creation: number,
  accepted: boolean,
  score: number,
  user_id: number,
  user_name: string,
  comments?: AnswerComment[]
}

export interface Post {
  post_id: string | null,
  title: string | null,
  body: string | null,
  creation: string | '',
  score: number | null,
  user_id: number | null,
  name: string | null,
  answers?: Answer[],
  comments?: PostComment[]
}