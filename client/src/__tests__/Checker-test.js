import React from 'react';
import ReactDOM from 'react-dom';
import Checker from '../Checker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let challenge = { chord: 'B', ask:['A', 'B', 'C']}
  ReactDOM.render(<Checker challenge={challenge} />, div);
});