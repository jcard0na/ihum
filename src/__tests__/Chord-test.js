import React from 'react';
import ReactDOM from 'react-dom';
import Chord from '../Chord';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chord />, div);
});