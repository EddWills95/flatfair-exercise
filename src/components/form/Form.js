import React, { Component } from 'react';
import { fetchConfig } from '../../api/api';

import './Form.scss';
import Select from '../select/Select';

// Used to make it easy to change
const VAT = 0.2;
const MEMBERSHIP_MINIMUM = 120;
const MIN_WEEK_RENT = 25;
const MAX_WEEK_RENT = 110;
const MIN_MONTH_RENT = 2000;
const MAX_MONTH_RENT = 8660;


export default class Form extends Component {

  // Rent should always be in weeks ? 

  constructor() {
    super();

    this.state = {
      rent: 0,
      rentSelect: 0,
      postcode: 'CM17 0PT',
      membershipFee: 0,
      apiResponse: {
        fixed_membership_fee: false,
        fixed_memberhsip_fee_amount: 0
      }
    }

    this.calculateMembership = this.calculateMembership.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    fetchConfig().then(res => {
      this.setState({
        response: res
      })
    });
  }

  handleInput(event) {
    console.log(event);
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

  submitForm(event) {
    event.preventDefault();
    const obj = {
      postcode: this.state.postcode,
      rent: this.state.rent
    }

    this.props.submit(obj);
  }

  render() {
    return(
      <div className="Form">
        <h1>Create Your FlatFair</h1>

        <form onSubmit={this.submitForm}>
      
            <div className="form-group">

              <Select options={['Week', 'Month']} handler={this.handleInput.bind(this)} />

              
              <input id="rent" onChange={this.handleInput.bind(this)} 
                    value={this.state.rentSelect === 0 ? this.state.rent : this.state.rent * 4} 
                    type="number"
                    min={this.state.rentSelect === 0 ? MIN_WEEK_RENT : MAX_WEEK_RENT}
                    max={this.state.rentSelect === 0 ? MIN_MONTH_RENT : MAX_MONTH_RENT} 
              />
            
            </div>
            
            {/* <select id="rentSelect" 
                    value={this.state.rentSelect} 
                    onChange={this.handleInput.bind(this)}
            >
              <option value={0}>Weekly</option>
              <option value={1}>Monthly</option>
            </select> */}
            



  
          <p id="membership-fee">{`£${this.state.membershipFee}`}</p>

          <input id="postcode" onChange={this.handleInput.bind(this)} type="string" />
          
          <button className="submit-button" 
                  type="submit"
                  >
            Submit
          </button>
        </form>
      </div>
    )
  }
}