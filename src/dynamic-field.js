import React, { Component } from 'react';
import createElement from './elements/factory';
import conditionsCheck from './util/conditions-check';

export default class DynamicField extends Component {

  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  touch() {
    if(this.element.current !== null && typeof this.element.current.touch !== 'undefined') {
      this.element.current.touch();
    }
  }

  render() {
      var show = true;
      if(this.props.conditional) {
        show = (conditionsCheck(this.props.conditional, this.props.formValues)
                ^ (this.props.conditional.action == 'hide')) == 1;
      }
      return (show ? createElement(this.props, this.element) : null);
  }
}

