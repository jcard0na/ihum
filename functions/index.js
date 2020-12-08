const functions = require('firebase-functions')
const express = require('express')
const generator = require('./generator')

var cookieSession = require('cookie-session')

// The Firebase Admin SDK to access the Firebase Realtime Database.                                                                                                                                         
const admin = require('firebase-admin');
admin.initializeApp();

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

app.get('/next-challenge', (req, res) => {
    current_challenge = (current_challenge + 1) % challenges.length;
    res.send(challenges[current_challenge])
})

app.get('/chord', (req, res) => {
    res.send(generator.generateChord(req.query.difficulty));
})


exports.api = functions.https.onRequest(app);
