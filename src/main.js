import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import search from './ajax';


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <App search={search}/>,
    document.getElementById('app')
  );
});
