// -- JSON FILE TYPES
export interface User {
  id: number,
  name: string
}

export interface Comment {
  id: number,
  body: string,
  user: User
}

export interface Answer {
  id: number,
  body: string,
  creation: number,
  score: number,
  user: User,
  accepted: boolean,
  comments: Comment[]
}

export interface Post {
  id: number,
  title: string,
  body: string,
  creation: number,
  score: number,
  user: User,
  comments: Comment[],
  answers: Answer[]
}

// -- REQUEST TYPES
export interface ReqPost {
  id: number,
  title: string,
  body: string,
  creation: number,
  score: number,
  user_id: number,
  user_name: string
}