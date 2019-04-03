import React, { Component } from 'react';
import {SettingsContext} from './../settings-context';
import prefix from './../util/prefix';
import Label from './label';
import AbstractElement from './abstract-element';
import Errors from './errors';
import classNames from './../util/class-names';


export default class Textarea extends AbstractElement {
  static contextType = SettingsContext;

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
 
        <textarea 
          onBlur={() => this.setState({'touched': true})}
          onChange={this.handleChange}
          id={this.props.name}
          name={this.props.name}
          value={this.props.value || ''}/>

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
