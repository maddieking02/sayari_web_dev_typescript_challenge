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