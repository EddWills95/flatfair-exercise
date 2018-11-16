import React, { Component } from 'react';

import './Select.scss';

export default class Select extends Component {

  constructor() {
    super();

    this.state = {
      selected: 0
    }

    this.passEvent = this.passEvent.bind(this);
  }

  // This will pass the index of the option
  passEvent(selectedIndex) {
    this.setState({
      selected: selectedIndex
    });

    this.props.handler({
      target: {
        value: this.state.selected
      }
    })
  }

  render() {
    return ( 
      <div className="Select">
        {this.props.options.map((o, i) => 
          <div className="select-option" key={i} onClick={() => this.passEvent(i)}>
            {o}   
          </div>
        )}
      </div>
    )
  }

}