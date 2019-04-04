import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createHooks } from '@wordpress/hooks';
 
window.jsonForm = {};
window.jsonForm.hooks = createHooks();

var jQuery = window.jQuery;

function getQueryStringParams (query){
  return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split('&')
          .reduce((params, param) => {
                  let [key, value] = param.split('=');
                  params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                  return params;
              }, {}
          )
      : {}
};

function initForm(form) {
  const params = getQueryStringParams(window.location.search);
  const debug = params.debug ? true : false;

  ReactDOM.render(
    <App 
      {...form}
      debug={debug} 
      />, document.getElementById('root'));
}

const params = getQueryStringParams(window.location.search);
const form = params.form ? params.form : 'form.json';

jQuery.ajax({
    type: 'GET',
    url: 'http://localhost:3000/' + form,
    contentType: 'json'
  })
  .done(initForm)
  .fail(function(jqXHR, textStatus) {
    console.error(jqXHR);
  });


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
