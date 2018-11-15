import React, { Component } from 'react';

export default class Wrapper extends Component {


  render() {
    return (
      <div className="Wrapper">
      
        {this.props.children}
      
      </div>
    )
  }

}