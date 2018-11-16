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
     
  render() {
    return (
      <div className="Input">
        <span>{this.props.prefix}</span>
        <input onChange={this.passEvent} 
              type={this.props.type}
              value={this.props.value}
              min={this.props.min}
              max={this.props.max}
              placeholder={this.props.placeholder}
              autoComplete={this.props.autocomplete}
              required={this.props.required}
        >
        
        </input>

        {/* <p>{this.state.errors}</p> */}
      
      </div>
    )
  }
}