import React, { Component } from 'react';

import './Input.scss';

export default class Input extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.type === 'number' ? 0 : '',
      error: null
    }

    this.passEvent = this.passEvent.bind(this);
  }

  passEvent(event) {
    // Errors need a bit more passing around (Not showing validity)
    // const valid = event.target.checkValidity();
      
    this.setState({
      value: event.target.value,
    }, () => {
      this.props.handler({
        target: {
          id: this.props.handlerId,
          value: this.state.value
        }
      })
    })
  }

  modifiedValue() {
    if (this.props.valueModifier) {
      return this.state.value * this.props.valueModifier;
    }
    return this.state.value;
  }
     
  render() {
    return (
      <div className="Input">
        <span>{this.props.prefix}</span>
        <input onChange={this.passEvent} 
              type={this.props.type}
              value={this.modifiedValue()}
              min={this.props.min}
              max={this.props.max}
              placeholder={this.props.placeholder}
              autoComplete={this.props.autocomplete}
        >
        
        </input>

        {/* <p>{this.state.errors}</p> */}
      
      </div>
    )
  }
}