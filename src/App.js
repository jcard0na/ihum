import React from 'react';
import * as Tone from 'tone'

import './index.css';
import Chord from './Chord.js';
import Checker from './Checker.js';
import Challenge from './Challenge.js';
import { challenges } from './challenges';

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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            challenge: { chord: null, ask: null },
            num: -1,
            current: states.PAUSED,
        }
        this.synth = new Tone.PolySynth(Tone.Synth).toDestination();

        this.startStop = this.startStop.bind(this);
        this.nextChallenge = this.nextChallenge.bind(this);
        this.checkChallenge = this.checkChallenge.bind(this);
    }

    nextChallenge() {
        const next_challenge = (this.state.num + 1) % challenges.length
        /* TODO: check if challenge passed or failed before moving on to next */
        this.setState({ current: states.PLAYING, num: next_challenge, challenge: challenges[next_challenge] })
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
                        chord={this.state.challenge.chord}
                        onDone={this.checkChallenge} />
                </div>
                <div className="challenge">
                    <Challenge
                        enabled={this.state.current === states.CHECKING}
                        ask={this.state.challenge.ask}
                    />
                </div>
                <div className="checker">
                    <Checker
                        enabled={this.state.current === states.CHECKING}
                        challenge={this.state.challenge}
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

export default App;