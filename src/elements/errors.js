import React, { Component } from 'react';
import {SettingsContext} from './../settings-context';

export default class Errors extends Component {
  static contextType = SettingsContext;

  render() { 

    if (!this.props.errors) {
        return null;
    }

    return this.props.errors.map((error, index) => {
        return (<div className={this.context.prefix + "error"} key={index} data-error={error.id}>{error.message}</div>);
    })

  }

}


