require("dotenv").config();
const express = require("express");
const router = require("express").Router();
const path = require("path");
const { controllers } = require('./api/controllers');
const PORT = process.env.PORT;
const cors = require('cors')

const app = express();

// -- ENABLE CORS FOR DOCKER
app.use(cors())
app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// -- SERVER ROUTES
router.get('/results/:search?', controllers.getResults)
router.get('/posts/:post_id?', controllers.getPost)

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
