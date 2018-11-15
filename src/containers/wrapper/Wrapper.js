import React, { Component } from 'react';

import { postForm } from '../../api/api';

import Form from '../../components/form/Form';


export default class Wrapper extends Component {

  constructor() {
    super();

    this.state = {
      finishedForm: false
    }

    this.sendForm = this.sendForm.bind(this);
  }


  sendForm(data) {
    postForm(data).then(res => {
      console.log(res);
      if (res.status === 'created') { 
        this.setState({
          finishedForm: true
        })
      }
    })
  }

  render() {
    if (this.state.finishedForm) { 
      return (
        <div className="Wrapper">
          <p>FINISHED</p>
        </div>
      )
    } else {
      return (
        <div className="Wrapper">
          <Form submit={this.sendForm} />
        </div> 
      )
    }
  }
}