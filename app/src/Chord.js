import React from "react";
import * as Tone from "tone";

// Storing intervalValues and synthNotes as hashmap objects allows us to easily
// calculate notes separated a given interval from one another 
export const intervalValues = {
  "root": 0,
  "m2": 1,
  "M2": 2,
  "m3": 3,
  "M3": 4,
  "P4": 5,
  "A4": 6,
  "P5": 7,
  "m6": 8,
  "M6": 9,
  "m7": 10,
  "M7": 11,
  "P8": 12,
  "m9": 13,
  "M9": 14,
  "m10": 15,
  "M10": 16,
  "P11": 17,
  "A11": 18,
  "P12": 19,
  "m13": 20,
  "M13": 21,
  "m14": 22,
  "M14": 23,
};

const synthNotes = {
  "C4": 0,
  "C#4": 1,
  "D4": 2,
  "Eb4": 3,
  "E4": 4,
  "F4": 5,
  "F#4": 6,
  "G4": 7,
  "Ab4": 8,
  "A4": 9,
  "Bb4": 10,
  "B4": 11,
  "C5": 12,
  "C#5": 13,
  "D5": 14,
  "Eb5": 15,
  "E5": 16,
  "F5": 17,
  "F#5": 18,
  "G5": 19,
  "Ab5": 20,
  "A5": 21,
  "Bb5": 22,
  "B5": 23
}

// Note that noteStrings use 'γ' and 'β' which our chord font will render
// correctly as sharp and flat symbols. the synth notes use '#' and 'b' instead.
export const noteStrings = [
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


class Chord extends React.Component {
  constructor(props) {
    super(props);
    this.synth = null;
  }

  synthRootFromChordName(name) {
    let root = name[0];
    if (name.length > 2) {
      if (name[1] === "γ") root = `${root}#`;
      if (name[1] === "β") root = `${root}b`;
    }
    return root;
  }

  componentDidUpdate(prevProps) {
    if (this.props.enabled && !prevProps.enabled) {
      if (this.synth !== null && this.synth.disposed !== true) {
        this.synth.releaseAll();
        this.synth = null;
      }
      this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
      let chord = [];
      let intervals = this.props.chord.intervals;
      let root = this.synthRootFromChordName(this.props.chord.name) + "4";
      chord[0] = root;
      let noteNames = Object.keys(synthNotes);
      for (let i = 1; i < intervals.length; i++) {
        chord[i] = noteNames[synthNotes[root] + intervalValues[intervals[i]]];
      }
      console.log(`${chord}`);

      this.synth.triggerAttack(chord);
      // Play chord for one second, schedule unsync one second later.
      this.synth.triggerRelease(chord, "+1");
      this.props.onDone();
      console.log("chord done");
    }
  }

  render() {
    return <div className="chord">{this.props.chord.name}</div>;
  }
}

export default Chord;
