import React from 'react';
import ReactDOM from 'react-dom';
import * as Tone from 'tone'

import './index.css';
import Chord from './chord.js';
import Checker from './checker.js';

// A challenge is a series of chords that will be played in sequence, followed
// by a series of notes that need to be hummed.
const challenges = [
    {
        chord: ['Bb'],
        notes: ['Bb'],
    },
    {
        chord: ['F'],
        notes: ['F', 'A', 'C'],
    },
    {
        chord: ['B'],
        notes: ['B', 'Eb', 'F#'],
    },
    {
        chord: ['D'],
        notes: ['D', 'F#', 'A'],
    },
    {
        chord: ['G'],
        notes: ['G', 'B', 'D'],
    },
]

function Starter(props) {
    return <div>
        <button onClick={props.onClick}>
            {props.value}
        </button>
    </div>;
}

const states = {
    PAUSED: 'paused',
    PLAYING: 'playing',
    CHECKING: 'checking',
}

class HumApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            challenge: { chord: null, notes: null },
            num: -1,
            current: states.PAUSED,
        }
        this.synth = new Tone.PolySynth(Tone.Synth).toDestination();

        this.chunks = []

        this.startStop = this.startStop.bind(this);
        this.nextChallenge = this.nextChallenge.bind(this);
        this.checkChallenge = this.checkChallenge.bind(this);
    }

    nextChallenge() {
        const next_challenge = (this.state.num + 1) % challenges.length
        /* TODO: check if challenge passed or failed before moving on to next */
        this.setState({ current: states.PLAYING, num: next_challenge, challenge: challenges[next_challenge] })
        // const INTERVAL = 2000
        // this.timer = setTimeout(() => {
        //     this.nextChallenge();
        // }, INTERVAL);
    }

    checkChallenge() {
        this.setState({ current: states.CHECKING })
    }

    startStop() {
        if (this.state.current === states.PAUSED) {
            Tone.start()
            this.nextChallenge();
        } else {
            this.setState({ current: states.PAUSED })
            // clearTimeout(this.timer);
        }
    }

    render() {
        console.log(this.state.current)
        return (
            <div>
                <div className="chord">
                    <Chord
                        enabled={this.state.current === states.PLAYING}
                        synth={this.synth}
                        value={this.state.challenge.chord}
                        onDone={this.checkChallenge} />
                </div>
                <div className="checker">
                    <Checker
                        enabled={this.state.current === states.CHECKING}
                        challenge={this.state.challenge.notes}
                        onDone={this.nextChallenge}
                    />
                </div>
                <div className="starter">
                    <Starter onClick={this.startStop}
                        value={(this.state.current === states.PAUSED ? "Start" : "Stop")} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <HumApp />,
    document.getElementById('root')
);