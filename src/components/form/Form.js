import React, { Component } from 'react';

const VAT = 0.2;
const MEMBERSHIP_MINIMUM = 120;

export default class Form extends Component {

  // Rent should always be in weeks ? 

  constructor() {
    super();

    this.state = {
      rent: 0,
      rentSelect: 0,
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
    }, () => {
      this.calculateMembership();
    })
  }

  calculateMembership() {
    if (this.state.rent === 0) return 0;

    let membershipFee = 0.0;
    // if fixed
    if (this.state.apiResponse.fixed_membership_fee) {
      membershipFee = this.state.apiResponse.fixed_membership_fee_amount;
    // If less than minimum
    } else if (this.state.rent < MEMBERSHIP_MINIMUM) {
      membershipFee = 120;
    // Normal operation
    } else {
      membershipFee = this.state.rent
    }
    
    // const finalFee = parseFloat(membershipFee).toFixed(2);
    // Forcing it to a string - Not ideal
    let finalFee = parseFloat(parseFloat(membershipFee) + (VAT * membershipFee)).toFixed(2);
    
    this.setState({
      membershipFee: finalFee
    })
    
    return finalFee
  }

  render() {
    return(
      <div className="Form">
        <form>
          <input id="rent" onChange={this.handleInput.bind(this)} 
                 value={this.state.rentSelect === 0 ? this.state.rent : this.state.rent * 4} 
                 type="number"
                 min={this.state.rentSelect === 0 ? 25 : 110}
                 max={this.state.rentSelect === 0 ? 2000 : 8660} 
          />
          
          <select id="rentSelect" 
                  value={this.state.rentSelect} 
                  onChange={this.handleInput.bind(this)}
          >
            <option value={0}>Weekly</option>
            <option value={1}>Monthly</option>
          </select>

          <p id="membership-fee">{`£${this.state.membershipFee}`}</p>

          <input id="postcode" type="string" />

          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}