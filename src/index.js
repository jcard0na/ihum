import React from 'react';
import ReactDOM from 'react-dom';
import * as Tone from 'tone'

import './index.css';

class Chord extends React.Component {
    render() {
        return this.props.value
    }
}

class Sound extends React.Component {
    render() {
        return (

            <div>
                <button onClick={this.props.onClick}>
                    {this.props.value}
                </button>
            </div>
        )
    }
}

class HumApp extends React.Component {
    constructor(props) {
        super(props);
        this.chords = ['Bb', 'F#', 'E', 'G', 'Ab'];
        this.state = {
            index: 0,
            current: this.chords[0],
            isRunning: false,
        }
        this.synth = new Tone.Synth().toDestination();

        this.startStop = this.startStop.bind(this);
    }

    startStop() {
        const INTERVAL = 2000
        console.log(this.state.isRunning)
        if (this.state.isRunning) {
            clearInterval(this.timer);
        } else {
            Tone.start()
            this.synth.triggerAttackRelease(`${this.chords[0]}4`, "8n");
            this.timer = setInterval(() => {
                let next_idx = (this.state.index + 1) % this.chords.length
                this.synth.triggerAttackRelease(`${this.chords[next_idx]}4`, "8n");
                this.setState({ index: next_idx, current: this.chords[next_idx] })
            }, INTERVAL);
        }
        this.setState({ isRunning: !this.state.isRunning })
    }

    render() {
        return (
            <div>
                <div className="chord">
                    <Chord value={this.state.current} />
                </div>
                <div className="sound">
                    <Sound onClick={this.startStop} value={(this.state.isRunning ? "Stop" : "Start")} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <HumApp />,
    document.getElementById('root')
);