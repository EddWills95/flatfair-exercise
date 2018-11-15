import React, { Component } from 'react';

export default class Wrapper extends Component {

  constructor() {
    super();

    this.state = {
      finishedForm: false
    }
  }


  sendForm() {
    const dataObj = {
      rent: this.state.rent,
      postcode: this.state.postcode
    }
    postForm(dataObj).then()
  }

  render() {
    return (
      <div className="Wrapper">
  
        {this.props.children}
      
      </div>
    )
  }

}