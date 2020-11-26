import React from 'react';
import ReactDOM from 'react-dom';
import Challenge from '../challenge';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Challenge />, div);
});