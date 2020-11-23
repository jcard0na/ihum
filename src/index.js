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

        this.chunks = []

        this.startStop = this.startStop.bind(this);
        this.captureInputStream = this.captureInputStream.bind(this);
    }

    captureInputStream() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log('getUserMedia supported.');
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    this.mediaRecorder = new MediaRecorder(stream);

                    this.mediaRecorder.ondataavailable = (e) => {
                            console.log(`recorded ${e.data.size} chunks`)
                            this.chunks.push(e.data);
                    }
                    this.mediaRecorder.onstop = (e) => {
                            console.log(`stopped recording`)
                    }
                })
                .catch(function (err) {
                    console.log('The following getUserMedia error occured: ' + err);
                }
                );
        } else {
            console.log('getUserMedia not supported on your browser!');
        }
    }
     
    componentDidMount() { 
        this.captureInputStream() 
    }

    startStop() {
        const INTERVAL = 2000
        if (this.state.isRunning) {
            clearInterval(this.timer);
        } else {
            Tone.start()
            this.synth.triggerAttackRelease(`${this.chords[0]}4`, "8n");
            this.mediaRecorder.start()
            this.timer = setInterval(() => {
                if (this.mediaRecorder.state === 'recording')
                    this.mediaRecorder.stop()
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