import React, { Component } from 'react';
import {SettingsContext} from './../settings-context';
import conditionsCheck from './../util/conditions-check';

export default class AbstractElement extends Component {

  constructor(props) {
      super(props);
      this.state = { 
        touched: false,
        dirty: false,
      };
  
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({'dirty': true});
    this.props.onChange(event, event.target.value, this.props);
  }

  touch() {
    this.setState({'touched': true}); 
  }

  hasError() {
    return this.props.errors && Object.keys(this.props.errors).length > 0;
  }

  isDisabled() {
    if(this.props.disabled && (typeof this.props.disabled !== "boolean")) {
      return conditionsCheck(this.props.disabled, this.props.formValues);
    }
    return this.props.disabled ? true : false;
  }
}

