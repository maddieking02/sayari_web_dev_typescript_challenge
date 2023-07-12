import { Request, Response } from 'express';
import { ReqPost } from '../../types';
const { getResults, getPost } = require('../models/models');

module.exports = {
  getResults: (req: Request, res: Response) => {
    getResults((err: Error | null, data: ReqPost[] ) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    }, req.query)
  },
  getPost: (req: Request, res: Response) => {
    getPost((err: Error | null, data: ReqPost[] ) => {
      if (err) {
        console.log('err inside controllers getPost: ', err)
        res.status(404).send(err);
      } else {
        console.log('sucess inside controllers getPost: ', data)
        res.status(200).send(data);
      }
    }, req.query)
  }
}