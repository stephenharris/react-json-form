import React, { Component } from 'react';
import {SettingsContext} from './../settings-context';
import prefix from './../util/prefix';
import Label from './label';
import AbstractElement from './abstract-element';
import Errors from './errors';
import classNames from './../util/class-names';

class Input extends AbstractElement {
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
 
        <input 
          type="text"
          onBlur={() => this.setState({'touched': true})}
          onChange={this.handleChange}
          id={this.props.name}
          value={this.props.value || ''}
          name={this.props.name} 
          type={this.props.field_type ? this.props.field_type : 'text'}
          placeholder={this.props.placeholder}
          disabled={this.isDisabled()}/> 

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

export default Input;
