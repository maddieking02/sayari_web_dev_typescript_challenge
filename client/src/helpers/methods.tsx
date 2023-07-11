import axios from "axios";

export const getResults = (search: string, callback?: any) => {
  axios.get(`http://localhost:3000/results`, { params: { search } })
    .then((res: any) => {
      console.log('successful retrieval of data', res.data)
      // callback(res.data)
    })
    .catch((err: unknown) => {
      console.log('failed to get data ', err)
      // callback(null)
    })
}