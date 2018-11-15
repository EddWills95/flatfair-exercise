import React, { Component } from 'react';

const VAT = 0.2;

export default class Form extends Component {

  // Rent should always be in weeks ? 

  constructor() {
    super();

    this.state = {
      rent: 25,
      postcode: '',
      membershipFee: 0,
      apiResponse: {
        fixed_membership_fee: false,
        fixed_memberhsip_fee_amount: 0
      }
    }

    this.calculateMembership = this.calculateMembership.bind(this);
  }

  handleInput(event) {
    this.setState({
      [event.target.id]: event.target.value
    })

    // Call calulate membership after set State
  }

  calculateMembership() {
    const vat = VAT * this.state.rent 
    
    const membershipFee = vat + this.state.rent

    this.setState({
      membershipFee: membershipFee
    })
    
    return membershipFee
  }

  render() {
    return(
      <div className="Form">
        <form>
          <input id="rent" onChange={this.handleInput.bind(this)} type="number" />
          
          <input className="rent-selector" type="select" />

          <p className="membership-fee-display"></p>

          <input id="postcode" type="string" />

          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}