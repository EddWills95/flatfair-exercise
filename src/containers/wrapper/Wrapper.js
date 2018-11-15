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
          finsihedForm: true
        })
      }
    })
  }

  render() {
    return (
      <div className="Wrapper">
        
          <Form submit={this.sendForm} />

      
      </div>
    )
  }

}