import React, { Component } from 'react';

import './Wrapper.scss';

import Form from '../../components/form/Form';
import { postForm } from '../../api/api';
import Finished from '../../components/finished/Finished';

export default class Wrapper extends Component {

  constructor() {
    super();

    this.state = {
      finishedForm: true
    }

    this.sendForm = this.sendForm.bind(this);
  }

  sendForm(data) {
    postForm(data).then(res => {
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
          <Finished />
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