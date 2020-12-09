import Decider from '../Decider'

it('constructs without throwing', () => {
    const challenge = {
        name: 'Bb',
        intervals: ['P1', 'M3', 'P5']
    }
    new Decider(challenge);
})

it('note from interval', () => {
    const challenge = {
        name: 'Bb',
        intervals: ['P1', 'M3', 'P5']
    }
    var decider = new Decider(challenge);
    expect(decider.noteFromInterval('Bb', 'M2')).toEqual('C');
    expect(decider.noteFromInterval('Bb', 'M3')).toEqual('D');
    expect(decider.noteFromInterval('Bb', 'P5')).toEqual('F');
    expect(decider.noteFromInterval('Bb', 'P4')).toEqual('Eb');
    expect(decider.noteFromInterval('Bb', 'M6')).toEqual('G');
    expect(decider.noteFromInterval('Bb', 'M7')).toEqual('A');
    expect(decider.noteFromInterval('F', 'P1')).toEqual('F');
    expect(decider.noteFromInterval('F', 'M3')).toEqual('A');
})

it('hist built correctly', () => {
    const challenge1 = {
        name: 'Bb',
        intervals: ['P1', 'M3', 'P5']
    }
    var decider = new Decider(challenge1);
    expect(decider.hist).toEqual({ 'Bb': 0, 'D': 0, 'F': 0 });

    const challenge2 = {
        name: 'B',
        intervals: ['P1', 'M3', 'P5']
    }
    decider = new Decider(challenge2);
    expect(decider.hist).toEqual({ 'B': 0, 'Eb': 0, 'F#': 0 });
})

it('hist updates correctly', () => {
    const challenge1 = {
        name: 'B',
        intervals: ['P1', 'M3', 'P5']
    }
    var decider = new Decider(challenge1);
    decider.recordNote('B');
    expect(decider.hist).toEqual({ 'B': 1, 'Eb': 0, 'F#': 0 });
    decider.recordNote('B');
    expect(decider.hist).toEqual({ 'B': 2, 'Eb': 0, 'F#': 0 });
    decider.recordNote('Eb');
    expect(decider.hist).toEqual({ 'B': 2, 'Eb': 0, 'F#': 0 });
})

it('completed is correct', () => {
    const challenge1 = {
        name: 'B',
        intervals: ['P1', 'M3', 'P5']
    }
    var decider = new Decider(challenge1);
    decider.recordNote('B');
    expect(decider.getCompleted()).toEqual([10, 0, 0])
    decider.recordNote('B');
    expect(decider.getCompleted()).toEqual([20, 0, 0])
    for (let i = 0; i < 100; i++) {
        decider.recordNote('B');
    }
    expect(decider.getCompleted()).toEqual([100, 0, 0])
    decider.recordNote('Eb');
    expect(decider.getCompleted()).toEqual([100, 10, 0])
    for (let i = 0; i < 100; i++) {
        decider.recordNote('Eb');
    }
    expect(decider.getCompleted()).toEqual([100, 100, 0])
    decider.recordNote('F#');
    expect(decider.getCompleted()).toEqual([100, 100, 10])
})