import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.querySelector('main').appendChild(document.createElement('div')),
  )
});
