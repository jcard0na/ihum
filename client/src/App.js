import React from 'react';
//import { useLocation } from "react-router-dom";
import * as Tone from 'tone'

import './index.css';
import Chord from './Chord.js';
import Checker from './Checker.js';
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

function App(props) {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    const [num,setNum] = React.useState(-1);
    const [current,setCurrent] = React.useState(states.PAUSED);
    const [challenge,setChallenge] = React.useState({ chord: null, ask: null})

    const nextChallenge = () => {
        const next_challenge = (num + 1) % challenges.length
        /* TODO: check if challenge passed or failed before moving on to next */
        setCurrent(states.PLAYING);
        setNum(num+1);
        setChallenge(challenges[next_challenge]);
    }

    const checkChallenge = () => {
        setCurrent(states.CHECKING)
    }

    const startStop = () => {
        if (current === states.PAUSED) {
            Tone.start()
            nextChallenge();
        } else {
            setCurrent(states.PAUSED)
        }
    }

    return (
        <div>
            <div>
                <Chord
                    enabled={current === states.PLAYING}
                    synth={synth}
                    chord={challenge.chord}
                    onDone={checkChallenge} />
            </div>
            <div>
                <Checker
                    enabled={current === states.CHECKING}
                    challenge={challenge}
                    onDone={nextChallenge}
                />
            </div>
            <div>
                <Starter onClick={startStop}
                    value={(current === states.PAUSED ? "Start" : "Stop")} />
            </div>
        </div>
    );
}

export default App;