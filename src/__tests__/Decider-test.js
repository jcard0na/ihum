import Decider from '../Decider'

it('constructs without throwing', () => { 
    const challenge = {
        chord: 'Bb',
        ask: ['P1', 'M3', 'P5']
    }
    var decider = new Decider(challenge);
})

it('note from interval', () => { 
    const challenge = {
        chord: 'Bb',
        ask: ['P1', 'M3', 'P5']
    }
    var decider = new Decider(challenge);
    expect( decider.noteFromInterval('Bb', 'M2') ).toEqual('C');
    expect( decider.noteFromInterval('Bb', 'M3') ).toEqual('D');
    expect( decider.noteFromInterval('Bb', 'P5') ).toEqual('F');
    expect( decider.noteFromInterval('Bb', 'P4') ).toEqual('Eb');
    expect( decider.noteFromInterval('Bb', 'M6') ).toEqual('G');
    expect( decider.noteFromInterval('Bb', 'M7') ).toEqual('A');
    expect( decider.noteFromInterval('F', 'P1') ).toEqual('F');
    expect( decider.noteFromInterval('F', 'M3') ).toEqual('A');
})

it('hist built correctly', () => { 
    const challenge1 = {
        chord: 'Bb',
        ask: ['P1', 'M3', 'P5']
    }
    var decider = new Decider(challenge1);
    expect( decider.hist ).toEqual({ 'Bb': 0, 'D': 0, 'F':0 });

    const challenge2 = {
        chord: 'B',
        ask: ['P1', 'M3', 'P5']
    }
    decider = new Decider(challenge2);
    expect( decider.hist ).toEqual({ 'B': 0, 'Eb': 0, 'F#':0 });
})

it('hist updates correctly', () => { 
    const challenge1 = {
        chord: 'B',
        ask: ['P1', 'M3', 'P5']
    }
    var decider = new Decider(challenge1);
    decider.recordNote('B');
    expect( decider.hist ).toEqual({ 'B': 1, 'Eb': 0, 'F#':0 });
    decider.recordNote('B');
    expect( decider.hist ).toEqual({ 'B': 2, 'Eb': 0, 'F#':0 });
    decider.recordNote('Eb');
    expect( decider.hist ).toEqual({ 'B': 2, 'Eb': 0, 'F#':0 });
})