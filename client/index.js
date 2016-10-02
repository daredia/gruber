import ReactDom from 'react-dom';
import React from 'react';
import App from './components/App.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDom.render(
  <App />, document.getElementById('app')
);