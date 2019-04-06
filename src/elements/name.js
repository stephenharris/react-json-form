import React, { Component } from 'react';
import {SettingsContext} from './../settings-context';
import prefix from './../util/prefix';
import Label from './label';
import AbstractElement from './abstract-element';
import Errors from './errors';
import classNames from './../util/class-names';

export default class Name extends AbstractElement {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);
    this.state = { 
      touched: {
        fname: false,
        lname: false
      },
      dirty: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    this.setState({'dirty': true});
    let key = event.target.id.endsWith('fname') ? 'fname' : 'lname';
    let value = Object.assign({fname: null,lname: null}, this.props.value, {[key]: event.target.value});
    console.log(key);
    console.log(event.target.value);
    this.props.onChange(event, value, this.props);
  }

  handleBlur(event) {
    let key = event.target.id.endsWith('fname') ? 'fname' : 'lname';
    this.setState((currentState) => {
      return {
        'touched': Object.assign({}, currentState.touched, {[key]: true})
      }
    });
  }

  fname() {
      return this._getValProp('fname');
  }

  lname() {
    return this._getValProp('lname');
  }

  _getValProp(key) {
      var value = Object.assign({
        fname: '',
        lname: ''
    }, this.props.value);
    return value[key] || '';
  }


  touch() {
    this.setState({
      touched: {
        fname: true,
        lname: true
      }
    }); 
  }
  
  isTouched() {
    return this.state.touched.fname && this.state.touched.lname;
  }

  render() {   
    return (
      <div
        className={classNames([
          {
          [this.context.prefix + "element-has-error"]: this.hasError() && this.isTouched(),
          },
          this.context.prefix + "element-" + this.props.id,
          this.context.prefix + this.props.type,
        ])}
        >
                
        <Label required={this.props.required} className={this.context.prefix + "element-label"} htmlFor={this.props.name}>
            {this.props.label}
        </Label>

        <div>
            
            <span className={this.context.prefix + "name-fname"}>

                <label htmlFor={this.props.name + '-fname'}>{this.props.label_fname}</label>

                <input 
                  type="text"
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  id={this.props.name + '-fname'}
                  value={this.fname()}
                  name={this.props.name}
                  placeholder="First Name"
                  disabled={this.isDisabled()}/> 
            </span>

            <span className={this.context.prefix + "name-lname"}>


                <label htmlFor={this.props.name + '-lname'}>{this.props.label_fname}</label>

                <input 
                  type="text"
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  id={this.props.name + '-lname'}
                  value={this.lname()}
                  name={this.props.name}
                  placeholder="Last Name"
                  disabled={this.isDisabled()}/> 
            </span>

        </div>

        {this.props.description &&
          <span className={this.context.prefix + "element-description"}>{this.props.description}</span>
        }

        {this.isTouched() && this.props.errors &&
          <Errors errors={this.props.errors}/>
        }
          
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
Name.contextType = SettingsContext;