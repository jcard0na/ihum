const uniqueRandomArray = require('unique-random-array');
 

const noteStrings = [ 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B' ];

const chordTypes = [
    {
        suffix: '',
        intervals: ['P1', 'M3', 'P5'],
    },
    {
        suffix: 'm',
        intervals: ['P1', 'm3', 'P5'],
    },
    {
        suffix: 'maj7',
        intervals: ['P1', 'M3', 'P5', 'M7'],
    },
    {
        suffix: 'm7',
        intervals: ['P1', 'm3', 'P5', 'm7'],
    },
    {
        suffix: 'dim',
        intervals: ['P1', 'm3', 'A4', 'M6'],
    },
];

function generateChord(difficulty) {
    let chord = {};
    const root = noteStrings[Math.floor(Math.random()*noteStrings.length)];
    const type = chordTypes[Math.floor(Math.random()*chordTypes.length)];
    chord["name"] = root + type.suffix;
    chord["intervals"] = type.intervals;
    return chord;
}

exports.generateChord = generateChord;