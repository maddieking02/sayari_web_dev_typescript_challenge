import axios from "axios";

export const getResults = (search: string) => {
  axios.get(`http://localhost:3000/results`, { params: { search } })
    .then((res: any) => {
      console.log('successful retrieval of data', res)
    })
    .catch((err: unknown) => {
      console.log(err)
    })
}