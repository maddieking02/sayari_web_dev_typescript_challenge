import axios, { AxiosResponse } from "axios";

export const getResults = (search: string, callback: (err: Error | null, res: []) => void) => {
  axios.get<[]>(`http://localhost:3000/results/${search}`, { params: { search } })
    .then((res: AxiosResponse<[]>) => {
      callback(null, res.data);
    })
    .catch((err: Error) => {
      callback(err, []);
    })
}

export const getPost = (id: number, callback: (err: Error | null, res: []) => void) => {
  axios.get<[]>(`http://localhost:3000/posts/${id}`, { params: { id } })
    .then((res: AxiosResponse<[]>) => {
      callback(null, res.data);
    })
    .catch((err: Error) => {
      callback(err, []);
    })
}