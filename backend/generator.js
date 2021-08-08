
const noteStrings = [
  "C",
  "Cγ",
  "D",
  "Eβ",
  "E",
  "F",
  "Fγ",
  "G",
  "Aβ",
  "A",
  "Bβ",
  "B",
];

/* sorted by difficulty */
const chordTypes = [
  // difficulty 0
  [
    {
      suffix: "",
      intervals: ["root", "M3", "P5"],
    },
    {
      suffix: "min",
      intervals: ["root", "m3", "P5"],
    },
  ],
  // difficulty 1
  [
    {
      suffix: "maj7",
      intervals: ["root", "M3", "P5", "M7"],
    },
    {
      suffix: "min7",
      intervals: ["root", "m3", "P5", "m7"],
    },
    {
      suffix: "7",
      intervals: ["root", "M3", "P5", "m7"],
    },
  ],
  // difficulty 2
  [
    {
      suffix: "dim",
      intervals: ["root", "m3", "A4", "M6"],
    },
  ],
];

function generateChord(difficulty) {
  if (difficulty < 0 || difficulty > chordTypes.length - 1) return null;

  let chord = {};
  const root = noteStrings[Math.floor(Math.random() * noteStrings.length)];
  const chordBucket = chordTypes[difficulty];
  const type = chordBucket[Math.floor(Math.random() * chordBucket.length)];
  chord["name"] = root + type.suffix;
  chord["intervals"] = type.intervals;
  return chord;
}

function generateChallenge(difficulty) {
  let challenge = {};
  challenge["chord"] = generateChord(difficulty);
  challenge["time"] = 5000;
  return challenge;
}

exports.generateChord = generateChord;
exports.generateChallenge = generateChallenge;
