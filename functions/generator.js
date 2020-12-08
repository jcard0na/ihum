const uniqueRandomArray = require('unique-random-array');


const noteStrings = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

/* sorted by difficulty */
const chordTypes = [
    // difficulty 0
    [
        {
            suffix: '',
            intervals: ['P1', 'M3', 'P5'],
        },
        {
            suffix: 'm',
            intervals: ['P1', 'm3', 'P5'],
        },
    ],
    // difficulty 1
    [
        {
            suffix: 'maj7',
            intervals: ['P1', 'M3', 'P5', 'M7'],
        },
        {
            suffix: 'm7',
            intervals: ['P1', 'm3', 'P5', 'm7'],
        },
        {
            suffix: '7',
            intervals: ['P1', 'M3', 'P5', 'm7'],
        },
    ],
    // difficulty 2
    [
        {
            suffix: 'dim',
            intervals: ['P1', 'm3', 'A4', 'M6'],
        },
    ]
];

function generateChord(difficulty) {
    if (difficulty < 0 || difficulty > chordTypes.length - 1)
        return null;

    let chord = {};
    const root = noteStrings[Math.floor(Math.random() * noteStrings.length)];
    const chordBucket = chordTypes[difficulty]
    const type = chordBucket[Math.floor(Math.random() * chordBucket.length)];
    chord["name"] = root + type.suffix;
    chord["intervals"] = type.intervals;
    return chord;
}

exports.generateChord = generateChord;