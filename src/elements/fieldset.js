import React, { Component } from 'react';
import {SettingsContext} from './../settings-context';
import DynamicField from '.././dynamic-field'
import classNames from './../util/class-names';

export default class Parent extends Component {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() { 
    return (
      <fieldset 
        className={classNames([
          this.context.prefix + "element-" + this.props.id,
          this.context.prefix + this.props.type,
        ])}
      >
        <legend className={this.context.prefix + "element-label"}>
            {this.props.label}
        </legend>
        
        {this.renderFields()}

        <pre>{JSON.stringify(this.props, null, 2)}</pre>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

      </fieldset>
    );
  }

  handleChange(event, value, element) {
    this.props.onChange(event, value, element);
  }

  renderFields() {
    return this.props.elements.map((element) => {
        return <DynamicField {...element} value={this.props.formValues[element.id]} onChange={this.handleChange} key={element.id}/>;
    });
  }

}


