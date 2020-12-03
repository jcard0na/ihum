const functions = require('firebase-functions')
const express = require('express')
var cookieSession = require('cookie-session')

const challenges = [
      {
          chord: 'Bb',
          ask: ['P1', 'M3', 'P5'],
      },
      {
          chord: 'F',
          ask: ['P1', 'M3', 'P5'],
      },
      {
          chord: 'B',
          ask: ['P1', 'M3', 'P5'],
      },
      {
          chord: 'D',
          ask: ['P1', 'M3', 'P5'],
      },
      {
          chord: 'G',
          ask: ['P1', 'M3', 'P5'],
      },
  ];

  var current_challenge = 0;

const app = express()

app.use(cookieSession({
      name: 'session',
      keys: ['12siehdieosfehf'],
      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.get('/next-challenge', (req, res) => {
      current_challenge = (current_challenge + 1) % challenges.length;
      res.send(challenges[current_challenge])
})



exports.api = functions.https.onRequest(app);
exports.app = express;
