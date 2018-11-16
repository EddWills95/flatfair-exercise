import React, { Component } from 'react';

import './Input.scss';

export default class Input extends Component {

  constructor() {
    super();

    this.state = {
      value: '',
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
     
  render() {
    return (
      <div className="Input">
        <span>{this.props.prefix}</span>
        <input onChange={this.passEvent} 
              type={this.props.type}
              value={this.state.value}
              min={this.props.min}
              max={this.props.max}
              placeholder={this.props.placeholder}
              autocomplete={this.props.autocomplete}
        >
        
        </input>

        {/* <p>{this.state.errors}</p> */}
      
      </div>
    )
  }
}