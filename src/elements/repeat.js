import React, { Component } from 'react';
import {SettingsContext} from './../settings-context';
import DynamicField from '.././dynamic-field'
import Parent from './parent'

export default class Repeat extends Component {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() { 
    return (
      <div>

        <h2>{this.props.label}</h2>

          {this.renderFields()}
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }

  getTargetValue() {
    return this.props.target ? this.props.formValues[this.props.target] : 0;
  }

  handleChange(event, value, element) {
    this.props.onChange(event, value, element);
  }

  renderFields() {
    var i = 0;
    var fieldGroups = [];
    for(i = 0; i < this.getTargetValue(); i++) {
      var elements = this.props.elements.map((element) => {
        return Object.assign({}, element, {
          id:  element.id + '_' + i,
          name:  element.name + '_' + i,
          value:  this.props.formValues[element.id + '_' + i],
        });
      });

      fieldGroups.push(
        <Parent 
            elements={elements}
            formValues={this.props.formValues}
            key={i}
            
            onChange={this.handleChange} />
      );
    }
    return fieldGroups;
  }

}


