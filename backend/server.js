const express = require("express");
const generator = require("./generator");

var cookieSession = require("cookie-session");

const app = express();

// Set CORS headers: allow requests from all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/chord", (req, res) => {
  res.send(generator.generateChord(req.query.difficulty));
});

app.get("/challenge", (req, res) => {
  res.send(generator.generateChallenge(req.query.difficulty));
});

module.exports = app;
