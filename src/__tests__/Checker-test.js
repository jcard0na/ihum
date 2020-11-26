import React from 'react';
import ReactDOM from 'react-dom';
import Checker from '../checker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Checker />, div);
});