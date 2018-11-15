import React, { Component } from 'react';

import { postForm } from '../../api/api';

import Form from '../../components/form/Form';


export default class Wrapper extends Component {

  constructor() {
    super();

    this.state = {
      finishedForm: false
    }

    // this.sendForm = this.sendForm.bind(this);
  }


  // sendForm(event, data) {
  //   event.preventDefault();
  //   postForm(data).then(res => {
  //     console.log(res);
  //     if (res.status === 'created') { 
  //       this.setState({
  //         finsihedForm: true
  //       })
  //     }
  //   })
  // }

  render() {
    return (
      <div className="Wrapper">
  
        {/* {!this.state.finishedForm &&  */}
          <Form submit={this.submitForm} />
        {/* } */}

        {/* {this.state.finishedForm &&} */}
      
      </div>
    )
  }

}