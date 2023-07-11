require("dotenv").config();
const express = require("express");
const router = require("express").Router();
const path = require("path");
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
