import React from 'react';
import ReactDOM from 'react-dom';
import Progress from '../Progress';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const completed=[ 100, 50, 0 ];
  ReactDOM.render(<Progress bgcolor="#112233" completed={completed} />, div);
});