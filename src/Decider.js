import { noteStrings, intervalStrings } from './Checker';

export class Decider {
    constructor(challenge) {
        this.hist = {};
        this.notes = [];
        this.current = 0;
        this.required_hits = 10;
        this.challenge_done = false;
        console.log(`Decider for ${challenge.chord}`);
        for (let i = 0; i < challenge.ask.length; i++) {
            let note = this.noteFromInterval(challenge.chord, challenge.ask[i]);
            this.hist[note] = 0;
            this.notes[i] = note;
        }
    }

    noteFromInterval(root, interval) {
        let root_idx = -1;
        let interval_idx = -1;
        for (let i = 0; i < noteStrings.length; i++) {
            if (root === noteStrings[i])
                root_idx = i;
        }
        for (let i = 0; i < intervalStrings.length; i++) {
            if (interval === intervalStrings[i])
                interval_idx = i;
        }

        if (root_idx === -1 || interval_idx === -1) {
            console.error(`Failed to translate ${root}(${root_idx}) ${interval}(${interval_idx})`)
            return "-";
        }

        return noteStrings[(root_idx + interval_idx) % noteStrings.length];
    }

    recordNote(note) {
        if (note === this.notes[this.current] && !this.challenge_done) {
            console.log(this.hist);
            this.hist[note] += 1;
            if (this.hist[note] === this.required_hits)
                this.current += 1;
            if (this.current === this.notes.length)
                this.challenge_done = true;
        }
    }

    getNotes() {
        return this.notes;
    }

    isDone() {
        if (this.challenge_done)
            console.log("Decider done");
        return this.challenge_done;
    }
}

export default Decider;