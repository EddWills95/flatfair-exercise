import React, { Component } from 'react';

import './Button.scss';

export default class Button extends Component {

  render() {
    return (
      <div className="Button">
        <button onClick={this.props.handler}>
          {this.props.text}
        </button>
      </div>
    )
  }
}