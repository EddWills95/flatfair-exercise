import React, { Component } from 'react';

const VAT = 0.2;
const MEMBERSHIP_MINIMUM = 120;

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

    if (event.target.id === 'rent') {
      this.calculateMembership();
    }
  }

  calculateMembership() {
    let vat, membershipFee;
    
    // if fixed
    if (this.state.apiResponse.fixed_membership_fee) {
      const fixed = this.state.apiResponse.fixed_membership_fee_amount;
      vat = VAT * fixed;
      membershipFee = fixed + vat;
    // If less than minimum
    } else if (this.state.rent < MEMBERSHIP_MINIMUM) {
      vat = VAT * 120;
      membershipFee = vat + 120;
    // Normal operation
    } else {
      vat = VAT * this.state.rent 
      membershipFee = vat + this.state.rent
    }

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
          
          <input id="rent-selector" type="select" />

          <p id="membership-fee">{`£${this.state.membershipFee}`}</p>

          <input id="postcode" type="string" />

          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}