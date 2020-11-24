import React from 'react';
import ReactDOM from 'react-dom';
import * as Tone from 'tone'

import './index.css';
import Chord from './chord.js';
import Checker from './checker.js';

function Starter(props) {
    return <div>
                <button onClick={props.onClick}>
                    {props.value}
                </button>
            </div>;
  }

class HumApp extends React.Component {
    constructor(props) {
        super(props);
        this.chords = ['Bb', 'B', 'C', 'F#', 'E', 'G', 'Ab'];
        this.state = {
            index: 0,
            current: this.chords[0],
            isRunning: false,
        }
        this.synth = new Tone.PolySynth(Tone.Synth).toDestination();

        this.chunks = []

        this.startStop = this.startStop.bind(this);
    }

    startStop() {
        const INTERVAL = 2000
        if (this.state.isRunning) {
            clearInterval(this.timer);
        } else {
            Tone.start()
            this.timer = setInterval(() => {
                let next_idx = (this.state.index + 1) % this.chords.length
                this.setState({ index: next_idx, current: this.chords[next_idx] })
            }, INTERVAL);
        }
        this.setState({ isRunning: !this.state.isRunning })
    }

    render() {
        return (
            <div>
                <div className="chord">
                    <Chord value={this.state.current} synth={this.synth} />
                </div>
                <div className="starter">
                    <Starter onClick={this.startStop} value={(this.state.isRunning ? "Stop" : "Start")} />
                </div>
                <div className="checker">
                    <Checker value={this.state.current} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <HumApp />,
    document.getElementById('root')
);