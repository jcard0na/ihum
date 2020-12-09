import React from 'react';
import * as Tone from 'tone'

import Progress from './Progress.js';
import { Decider } from './Decider';
import { noteStrings } from './Chord';

/* 
Pitch detection code copied from from https://github.com/cwilso/PitchDetect
Copyright (c) 2014 Chris Wilson
Licensed under MIT License
*/



function noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
}

function autoCorrelate(buf, sampleRate) {
    // Implements the ACF2+ algorithm
    var SIZE = buf.length;
    var rms = 0;

    for (let i = 0; i < SIZE; i++) {
        var val = buf[i];
        rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.05) // not enough signal
        return -1;

    var r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++)
        if (Math.abs(buf[i]) < thres) { r1 = i; break; }
    for (let i = 1; i < SIZE / 2; i++)
        if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }

    buf = buf.slice(r1, r2);
    SIZE = buf.length;

    var c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++)
        for (var j = 0; j < SIZE - i; j++)
            c[i] = c[i] + buf[j] * buf[j + i];

    var d = 0; while (c[d] > c[d + 1]) d++;
    var maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
        if (c[i] > maxval) {
            maxval = c[i];
            maxpos = i;
        }
    }
    var T0 = maxpos;

    var x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    let a = (x1 + x3 - 2 * x2) / 2;
    let b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
}

class Checker extends React.Component {
    constructor(props) {
        super(props)
        this.analyser = null
        this.mediaStreamSource = null
        this.buflen = 2048;
        this.buf = new Float32Array(this.buflen);
        this.note = "-"
        this.labels = [""]
        this.state = {
            inputCaptured: false,
            completed: [0],
        }

        this.captureInputStream = this.captureInputStream.bind(this);
        this.updatePitch = this.updatePitch.bind(this);
    }

    captureInputStream() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log('getUserMedia supported.');
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {

                    // Create an AudioNode from the stream.
                    this.mediaStreamSource = Tone.context.createMediaStreamSource(stream);

                    // Connect it to the destination.
                    this.analyser = Tone.context.createAnalyser();
                    this.analyser.fftSize = 2048;
                    this.mediaStreamSource.connect(this.analyser);
                    this.setState({ inputCaptured: true })
                    this.updatePitch();
                })
                .catch(function (err) {
                    console.log('The following getUserMedia error occured: ' + err);
                }
                );
        } else {
            console.log('getUserMedia not supported on your browser!');
        }
    }

    updatePitch(time) {
        this.analyser.getFloatTimeDomainData(this.buf);
        let ac = autoCorrelate(this.buf, Tone.context.sampleRate);
        let note = "-";

        if (ac !== -1) {
            let pitch = ac;
            //console.log(Math.round(pitch));
            note = noteFromPitch(pitch);
            this.note = noteStrings[note % 12];
            // var detune = centsOffFromPitch( pitch, note );
        }

        if (!this.props.enabled)
            return

        if (this.decider.recordNote(this.note))
            this.setState({ completed: this.decider.getCompleted() })
        if (this.decider.isDone()) {
            this.props.onDone()
        } else {
            requestAnimationFrame(this.updatePitch);
        }
    }

    componentDidUpdate(prevProps) {

        if (!this.props.enabled && prevProps.enabled) {
            this.setState({ completed: [0] })
            return
        }

        if (this.props.enabled && !prevProps.enabled) {
            this.decider = new Decider(this.props.challenge);
            this.labels = this.props.challenge.intervals;

            if (this.state.inputCaptured === false)
                this.captureInputStream();
            else
                this.updatePitch()
        }

    }

    render() {
        return <div>
            <div><Progress bgcolor='#123456'
                completed={this.state.completed}
                labels={this.labels} />
            </div>
        </div>
    }
}

export default Checker;