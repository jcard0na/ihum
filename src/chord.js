import React from 'react';
import * as Tone from 'tone'


// Array of notes that will make it easy to build chords from by calculating
// intervals from indices
const notes = [
    'C4', 'C#4', 'D4', 'Eb4', 'E4', 'F4', 'F#4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
    'C5', 'C#5', 'D5', 'Eb5', 'E5', 'F5', 'F#5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
]

class Chord extends React.Component {
    constructor(props) {
        super(props)
        // hashmap to look up index into array from root note
        this.note2idx = {}
        for (let i = 0; i < notes.length; i++)
            this.note2idx[notes[i]] = i

        this.handleDone = this.handleDone.bind(this)
    }
    componentDidUpdate() {
        console.log(`chord enabled: ${this.props.enabled}`)
        if (this.props.enabled) {
            // TODO: Deal with different chord types. Now this only builds a
            // major triad from a given root.
            let root = `${this.props.chord}4`
            let third = notes[this.note2idx[root] + 4]
            let fifth = notes[this.note2idx[root] + 7]
            console.log(`${root} ${third} ${fifth}`)

            this.props.synth.sync();

            // this.props.synth.triggerAttack(root);
            // this.props.synth.triggerAttack(third, "+8n");
            // this.props.synth.triggerAttack(fifth, "+4n");

            this.props.synth.triggerAttack([root, third, fifth]);
            this.props.synth.triggerRelease([root, third, fifth], "+2n");

            Tone.Transport.scheduleOnce((time) => { return this.handleDone() }, "+1n")
            Tone.Transport.start();
        }
    }

    handleDone() {
        console.log('chord done')
        this.props.synth.unsync();
        Tone.Transport.stop();
        this.props.onDone();
    }

    render() {
        return (
            <div>
                {this.props.chord}
            </div>
        )
    }
};

export default Chord;