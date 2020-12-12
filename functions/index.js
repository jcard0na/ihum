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
        ask: ['root', 'M3', 'P5'],
    },
    {
        chord: 'F',
        ask: ['root', 'M3', 'P5'],
    },
    {
        chord: 'B',
        ask: ['root', 'M3', 'P5'],
    },
    {
        chord: 'D',
        ask: ['root', 'M3', 'P5'],
    },
    {
        chord: 'G',
        ask: ['root', 'M3', 'P5'],
    },
];

var current_challenge = 0;

const app = express()

app.get('/chord', (req, res) => {
    res.send(generator.generateChord(req.query.difficulty));
})

app.get('/challenge', (req, res) => {
    res.send(generator.generateChallenge(req.query.difficulty));
})

exports.api = functions.https.onRequest(app);
