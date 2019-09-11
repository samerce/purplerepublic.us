// Needed for redux-saga es6 generator support
import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'sanitize.css/sanitize.css';

// dependency imports
require('wavesurfer.js')
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import App from 'containers/App';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

import {canShowEditingTools, isInsider} from './utils/nav'
import configureStore from './store'
import './global-styles'

const initialState = {};
const store = configureStore(initialState);
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
}

render()

if (process.env.NODE_ENV === 'production' && !canShowEditingTools() && !isInsider()) {
  ga('create', 'UA-104536966-1', 'auto')
  ga('send', 'pageview')

  // Install ServiceWorker and AppCache in the end since
  // it's not most important operation and if main code fails,
  // we do not want it installed
  // require('offline-plugin/runtime').install(); // eslint-disable-line global-require
} else {
  // disable analytics for development
  window.ga = () => {}
  // disable hotjar for development
  window.hj = () => {}
}
