import React, { Component } from 'react';
import {SettingsContext} from './../settings-context';

class Label extends Component {
  static contextType = SettingsContext;

  render() { 
    return (
    <label className={this.props.className} htmlFor={this.props.htmlFor}>
        {this.props.children}  
        {this.props.required &&
            <span className={this.context.prefix + "element-required"}>*</span>
        }
      </label> 
    );
  }

}

export default Label;


