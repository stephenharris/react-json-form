import React, { Component } from 'react';
import {SettingsContext} from './../settings-context';
import prefix from './../util/prefix';
import Label from './label';
import AbstractElement from './abstract-element';
import Errors from './errors';
import classNames from './../util/class-names';
import Recaptcha from 'react-recaptcha';


export default class GoogleRecaptcha extends AbstractElement {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.expiredCallback = this.expiredCallback.bind(this);
  }

  verifyCallback(response) {
    this.setState({'dirty': true, 'touched': true});
    this.props.onChange(null, response, this.props);
  }

  expiredCallback(response) {
    this.props.onChange(null, '', this.props);
  }

  render() {   
    return (
      <div
        className={classNames([
          {
          [this.context.prefix + "element-has-error"]: this.hasError() && this.state.touched,
          },
          this.context.prefix + "element-" + this.props.id,
          this.context.prefix + this.props.type,
        ])}
        >

        <Label required={this.props.required} className={this.context.prefix + "element-label"} htmlFor={this.props.name}>
            {this.props.label}
        </Label>
 
        <Recaptcha
          sitekey={this.context.googleRecaptchaSitekey}
          render="explicit"
          verifyCallback={this.verifyCallback}
          expiredCallback={this.expiredCallback}
          onloadCallback={() => null}//without this this.verifyCallback is not called
        /> 

        {this.props.description &&
          <span className={this.context.prefix + "element-description"}>{this.props.description}</span>
        }

        {this.state.touched && this.props.errors &&
          <Errors errors={this.props.errors}/>
        }
          
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}


