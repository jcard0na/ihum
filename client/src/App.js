import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone'
import fetch from 'node-fetch';
import { stringify } from 'query-string';

import { Fab, Button, Card, CardContent, CardActions, Typography } from '@material-ui/core';

import './index.css';
import Chord from './Chord.js';
import Checker from './Checker.js';
import Timer from './Timer.js';

function AppButton(props) {
    if (props.enabled) {
        if (props.main) {
            return <Fab color="primary" variant="contained"
                    onClick={props.onClick}>
                    {props.value}
                </Fab>
        } else {
            return <Button color="primary" variant="contained"
                    onClick={props.onClick}>
                    {props.value}
                </Button>
        }
    } else {
        return null;
    }
}

function Instructions(props) {
    if (props.enabled) {
        return <div>
            <Card className="bloh">
                <CardContent>
                    <Typography className="blah" color="textSecondary" gutterBottom>
                        iHum
                    </Typography>
                    <Typography variant="body2" component="p">
                        When you press 'Start' you will hear a chord. Try to
                        play or sing the individual notes as requested.
                        A new chord will be played on success or after a timeout.
                        </Typography>
                </CardContent>
            </Card> 
        </div>;
    } else {
        return null;
    }
}

const states = {
    PAUSED: 'paused',
    PLAYING: 'playing',
    CHECKING: 'checking',
    FAILED: 'failed',
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
    const [current, setCurrent] = React.useState(states.PAUSED);
    const [challenge, setChallenge] = React.useState({ chord: { name: null, intervals: null }, time: 1000 })
    const [timeRemaining, setTimeRemaining] = React.useState(0);

    const nextChallenge = async (result) => {
        const query = { difficulty: 0 }
        const response = await fetch(`/challenge?${stringify(query)}`);
        const challenge = await response.json();

        console.log(result)
        console.log(challenge);

        setChallenge(challenge);
        setTimeRemaining(challenge.time);
        setCurrent(states.PLAYING);
    }

    useInterval(() => {
        setTimeRemaining((timeRemaining) => (timeRemaining - 1000));
        if (timeRemaining === 1000) {
            setCurrent(states.FAILED);
            nextChallenge("timeout");
        }
    }, (current === states.CHECKING && timeRemaining) ? 1000 : null);

    const checkChallenge = () => {
        setCurrent(states.CHECKING)

    }

    const startStop = () => {
        if (current === states.PAUSED) {
            Tone.start()
            nextChallenge("start");
        } else {
            setCurrent(states.PAUSED)
            setChallenge({ chord: { name: null, intervals: null }, time: 1000 });
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
                <Instructions
                    enabled={current === states.PAUSED}
                />
            </div>
            <div>
                <Chord
                    enabled={current === states.PLAYING}
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
                <AppButton
                    main={true}
                    onClick={startStop}
                    enabled={true} value={(current === states.PAUSED ? "Start" : "Stop")} />
                <AppButton
                    main={false}
                    onClick={replayChord}
                    enabled={current === states.CHECKING} value="Replay" />
            </div>
        </div>
    );
}

export default App;