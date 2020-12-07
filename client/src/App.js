import React from 'react';
//import { useLocation } from "react-router-dom";
import * as Tone from 'tone'

import './index.css';
import Chord from './Chord.js';
import Checker from './Checker.js';
import { challenges } from './challenges';

function Button(props) {
    if (props.enabled) {
        return <div>
            <button onClick={props.onClick}>
                {props.value}
            </button>
        </div>;
    } else {
        return null;
    }
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
        const random = Math.floor(Math.random()*challenges.length);
        setNum(random);
        setChallenge(challenges[next_challenge]);
        setCurrent(states.PLAYING);
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

    const replayChord = () => {
        if (current === states.CHECKING) {
            setCurrent(states.PAUSED)
            setCurrent(states.PLAYING)
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
                <Button onClick={startStop}
                    enabled={true} value={(current === states.PAUSED ? "Start" : "Stop")} />
            </div>
            <div>
                <Button onClick={replayChord}
                    enabled={current === states.CHECKING} value="Replay" />
            </div>
        </div>
    );
}

export default App;