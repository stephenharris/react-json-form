import React from 'react';
import {SettingsContext} from './../settings-context';
import prefix from './../util/prefix';
import Label from './label';
import classNames from './../util/class-names';
import AbstractElement from './abstract-element';
import Errors from './errors';

export default class Checkbox extends AbstractElement {

  constructor(props) {
    super(props);
    this.state = { 
      touched: false,
      dirty: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var defaultValue = Object.keys(this.props.options).reduce((defaultValue, key) => {
      defaultValue[key] = false;
      return defaultValue;
    }, {});

    var value = Object.assign(defaultValue, this.props.value, {
      [event.target.value]: event.target.checked
    });
    this.setState({'dirty': true, 'touched': true});
    this.props.onChange(event, value, this.props);
  }

  isChecked(value) {
    return (this.props.value || '') && (value in this.props.value) && this.props.value[value]
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

        <ul id={this.props.name} className={this.context.prefix + "element-checkbox-list"}>
          {this.renderOptions()}                  
        </ul>

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

  renderOptions() {
    return Object.entries(this.props.options).map((pair) =>{
      return (<li key={pair[0]}>
          <label>
            <input 
              type="checkbox"    
              onBlur={() => this.setState({'touched': true})}
              onChange={this.handleChange}
              name={this.props.name + '[]'}
              checked={this.isChecked(pair[0])}
              value={pair[0]||''}/>
            {pair[1]}
          </label>
        </li>);
    });
  }

}

Checkbox.contextType = SettingsContext;