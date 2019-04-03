import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';

var jQuery = window.jQuery;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      errors:{}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formValues, form, event) {
    console.log(formValues);
    console.log(form.isValid());

    if (!form.isValid()) {
      return;
    }


    jQuery.ajax({
      type: 'POST',
      url: 'http://localhost:3000/submit/',
      dataType: 'json',
      data: JSON.stringify(formValues),
      contentType: "application/json",
    })
    .done((response) => {
      console.log('response');
      console.log(response);
    })
    .fail((jqXHR, textStatus) => {
      console.error("error");
      console.error(jqXHR);
      console.error(jqXHR.responseText);
      try {
        var json = JSON.parse(jqXHR.responseText);
        console.error(JSON.parse(jqXHR.responseText));
        this.setState((prevState) => {
          return {
            "errors": JSON.parse(jqXHR.responseText)
          }
        });
      } catch {
        this.setState((prevState) => {
          return {
            "errors": {
              "email": [
                {"id": "server", "message": "server side error message"}
              ]
            }
          }
        });
        return;
      }

    })
  }

  render() {
    return (
      <Form 
      id={this.props.id}
      elements={this.props.elements}
      onSubmit={this.handleSubmit}
      debug={this.props.debug} 
      errors={this.state.errors} 
      />
    );
  }
}

export default App;
