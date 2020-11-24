import React from 'react';

class Chord extends React.Component {
    componentDidUpdate() {
        this.props.synth.triggerAttackRelease(`${this.props.value}4`, "8n");
    }
    render() {
        return this.props.value
    }
};

export default Chord;