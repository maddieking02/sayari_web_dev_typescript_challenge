import { Request, Response } from 'express';
import { ReqPost } from '../../types';
const { getResults } = require('../models/models');

module.exports = {
  getResults: (req: Request, res: Response) => {
    getResults((err: Error | null, data: ReqPost[] ) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    }, req.query)
  }
}