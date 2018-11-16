import React, { Component } from 'react';

import Ionicon from 'react-ionicons';

import './Wrapper.scss';

import Form from '../../components/form/Form';
import { postForm } from '../../api/api';
import Finished from '../../components/finished/Finished';

export default class Wrapper extends Component {

  constructor() {
    super();

    this.state = {
      finishedForm: false,
      flatfair: null
    }

    this.sendForm = this.sendForm.bind(this);
  }

  sendForm(data) {
    const postObj = {
      postcode: data.postcode,
      rent: data.rent
    } 

    postForm(postObj).then(res => {
      if (res.status === 'created') { 
        this.setState({
          finishedForm: true,
          flatfair: data
        })
      }
    })
  }

  goBack() {
    this.setState({
      finishedForm: false
    })
  }

  render() {
    if (this.state.finishedForm) { 
      return (
        <div className="Wrapper">
          <div className="back-button" onClick={this.goBack.bind(this)} >
            <Ionicon icon="md-arrow-back" fontSize="4rem" color="white"/>
          </div>
          <Finished flatfair={this.state.flatfair}/>
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