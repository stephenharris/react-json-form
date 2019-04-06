import React, { Component } from 'react';
import {SettingsContext} from './../settings-context';
import prefix from './../util/prefix';
import AbstractElement from './abstract-element';
import classNames from './../util/class-names';

export default class Button extends AbstractElement {

  render() {
    return (
      <div
      className={classNames([
        this.context.prefix + "element-" + this.props.id,
        this.context.prefix + this.props.type,
      ])}
      >
        <button id={this.props.name} disabled={this.isDisabled()} type="submit">{this.props.label}</button>
      </div>
    );
  }

}

Button.contextType = SettingsContext;