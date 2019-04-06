import React, { Component } from 'react';
import {SettingsContext} from './../settings-context';
import DynamicField from '.././dynamic-field'
import classNames from './../util/class-names';

export default class Parent extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() { 
    return (
      <div
        className={classNames([
          this.context.prefix + "element-" + this.props.id,
          this.context.prefix + this.props.type,
        ])}
        >

        <h2>{this.props.label}</h2>

        {this.renderFields()}
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
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
Parent.contextType = SettingsContext;