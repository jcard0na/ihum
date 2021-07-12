const express = require("express");
const generator = require("./generator");

var cookieSession = require("cookie-session");

const DEV_MODE_ENABLED = process.env.NODE_ENV === "dev";

if (!DEV_MODE_ENABLED) {
  // The Firebase Admin SDK to access the Firebase Realtime Database.
  const admin = require("firebase-admin");
  admin.initializeApp();
}

const challenges = [
  {
    chord: "Bb",
    ask: ["root", "M3", "P5"],
  },
  {
    chord: "F",
    ask: ["root", "M3", "P5"],
  },
  {
    chord: "B",
    ask: ["root", "M3", "P5"],
  },
  {
    chord: "D",
    ask: ["root", "M3", "P5"],
  },
  {
    chord: "G",
    ask: ["root", "M3", "P5"],
  },
];

var current_challenge = 0;

const app = express();

if (DEV_MODE_ENABLED) {
  // Set CORS headers
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
}

app.get("/chord", (req, res) => {
  res.send(generator.generateChord(req.query.difficulty));
});

app.get("/challenge", (req, res) => {
  res.send(generator.generateChallenge(req.query.difficulty));
});

if (DEV_MODE_ENABLED) {
  // Serve directly
  const port = process.env.HTTP_PORT || 8080;
  app.listen(port, () => {
    console.log(`[DEV MODE] Listening on http://localhost:${port}`);
  });
} else {
  const functions = require("firebase-functions");
  exports.api = functions.https.onRequest(app);
}
