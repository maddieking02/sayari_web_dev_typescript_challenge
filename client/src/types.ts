export type Display = 'home' | 'results' | 'post';

export interface Result {
  id: number,
  title: string,
  body: string,
  creation: number,
  score: number,
  user_id: number,
  user_name: string
}