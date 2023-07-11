const { get } = require('../models/models');

module.exports = {
  getResults: (req, res) => {
    console.log('this is the incoming req: ', req.query)
    res.send(`/results/${req.params}`)
  },
  getPost: (req, res) => {
    console.log('this is the incoming req: ', req)
  }
}