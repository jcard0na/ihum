import { noteStrings, intervalStrings } from "./Chord";

export class Decider {
  constructor(challenge) {
    this.challenge = challenge;
    // histogram of hits
    this.hist = {};
    // list of notes from requested intervals, in the same order
    this.notes = [];
    this.current = 0;
    this.required_hits = 10;
    this.challenge_done = false;
    console.log(`Decider for ${challenge.name}`);
    for (let i = 0; i < challenge.intervals.length; i++) {
      let root = this.rootFromChordName(challenge.name);
      let note = this.noteFromInterval(root, challenge.intervals[i]);
      this.hist[note] = 0;
      this.notes[i] = note;
    }
  }

  rootFromChordName(name) {
    let root = name[0];
    if (name.length >= 2 && (name[1] === "γ" || name[1] === "β"))
      root = root + name[1];
    return root;
  }

  noteFromInterval(root, interval) {
    let root_idx = -1;
    let interval_idx = -1;
    for (let i = 0; i < noteStrings.length; i++) {
      if (root === noteStrings[i]) root_idx = i;
    }
    for (let i = 0; i < intervalStrings.length; i++) {
      if (interval === intervalStrings[i]) interval_idx = i;
    }

    if (root_idx === -1 || interval_idx === -1) {
      console.error(
        `Failed to translate ${root}(${root_idx}) ${interval}(${interval_idx})`
      );
      return "-";
    }

    return noteStrings[(root_idx + interval_idx) % noteStrings.length];
  }

  recordNote(note) {
    let progress_made = false;
    if (note === this.notes[this.current] && !this.challenge_done) {
      console.log(this.hist);
      progress_made = true;
      this.hist[note] += 1;
      if (this.hist[note] === this.required_hits) this.current += 1;
      if (this.current === this.notes.length) this.challenge_done = true;
    }
    return progress_made;
  }

  getChallenge() {
    return this.challenge;
  }

  getCompleted() {
    return Array.from(
      this.notes,
      (note) => {
        return (100 * this.hist[note]) / this.required_hits;
      },
      this
    );
  }

  isDone() {
    if (this.challenge_done) console.log("Decider done");
    return this.challenge_done;
  }
}

export default Decider;
