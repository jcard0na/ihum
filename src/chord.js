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
    }
    componentDidUpdate() {
        const now = Tone.now()
        let root = `${this.props.value}4`
        let third = notes[this.note2idx[root] + 4]
        let fifth = notes[this.note2idx[root] + 7]
        // this.props.synth.triggerAttack(root, "8n", now);
        // this.props.synth.triggerAttack(third, "8n", now + 0.25);
        // this.props.synth.triggerAttack(fifth, "8n", now + 0.5);
        // this.props.synth.triggerRelease([root, third, fifth], now + 1.5);
        this.props.synth.triggerAttackRelease([root, third, fifth], '8n', now);
    }
    render() {
        return <div>
            {this.props.value}
        </div>
    }
};

export default Chord;