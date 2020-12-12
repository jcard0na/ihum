import React from 'react';
import * as Tone from 'tone'


export const intervalStrings = [
    'root', 'm2', 'M2', 'm3', 'M3', 'P4', 'A4', 'P5', 'm6', 'M6', 'm7', 'M7',
    'P8', 'm9', 'M9', 'm10', 'M10', 'P11', 'A11', 'P12', 'm13', 'M13', 'm14', 'M14',
]

// Note that noteStrings use 'γ' and 'β' which our chord font will render
// correctly as sharp and flat symbols. the synth notes use '#' and 'b' instead.
export const noteStrings = ['C', 'Cγ', 'D', 'Eβ', 'E', 'F', 'Fγ', 'G', 'Aβ', 'A', 'Bβ', 'B'];

const synthNotes = [
    'C4', 'C#4', 'D4', 'Eb4', 'E4', 'F4', 'F#4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
    'C5', 'C#5', 'D5', 'Eb5', 'E5', 'F5', 'F#5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
]

class Chord extends React.Component {

    constructor(props) {
        super(props)
        // Array of notes that will make it easy to build chords from by calculating
        // intervals from indices
        // hashmap to look up index into array from root note
        this.note2idx = {}
        this.intval2offset = {}
        for (let i = 0; i < synthNotes.length; i++)
            this.note2idx[synthNotes[i]] = i
        for (let i = 0; i < intervalStrings.length; i++)
            this.intval2offset[intervalStrings[i]] = i

        this.handleDone = this.handleDone.bind(this)
    }

    synthRootFromChordName(name) {
        let root = name[0];
        if (name.length > 2) {
            if (name[1] === 'γ')
                root = `${root}#`;
            if (name[1] === 'β')
                root = `${root}b`;
        }
        return root;
    }

    componentDidUpdate(prevProps) {
        if (this.props.enabled && !prevProps.enabled) {
            let chord = [];
            let intervals = this.props.chord.intervals;
            let root = this.synthRootFromChordName(this.props.chord.name) + '4'
            chord[0] = root;
            for (let i = 1; i < intervals.length; i++) {
                chord[i] = synthNotes[this.note2idx[root] + this.intval2offset[intervals[i]]];
            }
            console.log(`${chord}`)

            this.props.synth.sync();

            this.props.synth.triggerAttack(chord);
            // Play chord for one second, schedule unsync one second later.
            this.props.synth.triggerRelease(chord, "1");
            Tone.Transport.scheduleOnce((time) => { return this.handleDone() }, "2")

            Tone.Transport.start();
        }
    }

    handleDone() {
        console.log('chord done')
        this.props.synth.releaseAll(Tone.now());
        this.props.synth.unsync();
        Tone.Transport.stop();
        this.props.onDone();
    }

    render() {
        return (
            <div className="chord">
                {this.props.chord.name}
            </div>
        )
    }
};

export default Chord;