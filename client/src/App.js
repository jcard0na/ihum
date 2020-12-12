import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone'
import fetch from 'node-fetch';
import { stringify } from 'query-string';

import './index.css';
import Chord from './Chord.js';
import Checker from './Checker.js';
import Timer from './Timer.js';

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

// See https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// for this gem
function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function App(props) {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    const [current, setCurrent] = React.useState(states.PAUSED);
    const [challenge, setChallenge] = React.useState({ chord: { name: null, intervals: null }, time: 1000 })
    const [timeRemaining, setTimeRemaining] = React.useState(0);

    const nextChallenge = async () => {
        const query = { difficulty: 0 }
        const response = await fetch(`/challenge?${stringify(query)}`);
        const challenge = await response.json();

        console.log(challenge);

        setChallenge(challenge);
        setTimeRemaining(challenge.time);
        setCurrent(states.PLAYING);
    }

    useInterval(() => {    
        setTimeRemaining(timeRemaining - 1000);
        if (timeRemaining === 1000)
            nextChallenge();
    }, (current === states.CHECKING && timeRemaining) ? 1000 : null);

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
                <Timer
                    enabled={current === states.CHECKING}
                    remaining={Math.round(timeRemaining * 100 / (challenge.time))}
                />
            </div>
            <div>
                <Checker
                    enabled={current === states.CHECKING}
                    challenge={challenge.chord}
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