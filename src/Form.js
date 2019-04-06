import React, { Component } from 'react';
import {SettingsContext} from './settings-context';
import prefix from './util/prefix';
import classNames from './util/class-names';
import DynamicField from './dynamic-field'
import notEmptyValidator from './validators/not-empty';
import validate from './validators/validate';
import validateElement from './validators/validate-element';

var settings = {
    'prefix': 'json-form-',
    'googleRecaptchaSitekey':''
  }

export default class Form extends Component {
  static contextType = SettingsContext;

  childElements = [];

  constructor(props) {
    super(props);
    this.state = { 
      "errors":{
      },
      "values":{}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.setRef = (element) => {
      this.childElements.push(element);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState((prevState) => {
        return {
          'errors': nextProps.errors
        }
      });
    }
  }

  componentDidMount() {
    this.validate();
  }

  componentDidUpdate(previousProps, previousState) {
    if(previousState.values != this.state.values) {
      this.validate();
    }
  }

  /**
   * Update the form value when a field changes
   * @param event The origin change event
   * @param element The element whose value has changed
   */
  handleChange(event, value, element) {
    this.setState((prevState) => {
      var newState = Object.assign({}, prevState);
      newState.values = Object.assign({}, prevState.values,{
        [element.id]: value
      });
      return newState;
    });
  }

  /**
   * Handles the submit event. 
   * 'Touches' each element so errors can appear.
   * @param evt 
   */
  handleSubmit(evt) {
    evt.preventDefault();
    this.childElements.map((element) => element.touch());
    if(this.props.onSubmit) {
      this.props.onSubmit(this.state.values, this, evt);
    }
  }

  /**
   * Checks whether the form is valid
   */
  isValid() {
    var foundError = this.state.errors && Object.entries(this.state.errors).find((elementErrors) => {
      return elementErrors[1].length > 0;
    });
    return !foundError;
  }

  validate() {
    this.props.elements.forEach((element) => {
      var errors = validateElement(element, this.state.values[element.id]);
      this.setErrors(element.id, errors);
    });
  }

  setErrors(elementId, errors) {
    this.setState((prevState) => {
      prevState.errors[elementId] = errors;
      return prevState;
    });
  }

  removeErrors(elementId) {
    this.setErrors(elementId, []);
  }
  
  renderFields() {
    return this.props.elements
      .filter(element => element)
      .map((element) => {
        return <DynamicField 
          {...element} 
          ref={this.setRef}
          formValues={this.state.values}
          errors={this.state.errors[element.id]}
          value={this.state.values[element.id]}
          onChange={this.handleChange}
          key={element.id}/>;
      });
  }

  render() {
    return (
        <SettingsContext.Provider value={settings}>
            <form 
                id={this.props.id} 
                className={classNames([
                    this.context.prefix + "elements-collection",
                    {"hideState": !this.props.debug}
                ])}
                onSubmit={this.handleSubmit}
                >
                {this.renderFields()}

                <pre>{JSON.stringify(this.state)}</pre>
            </form>
            
        </SettingsContext.Provider>
    );
  }
}