import React, { Component } from 'react';
import { fetchConfig } from '../../api/api';

import './Form.scss';
import Select from '../select/Select';
import Input from '../input/Input';
import Button from '../button/Button';

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
      },
      errors: true
    }

    this.calculateMembership = this.calculateMembership.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.checkFormValiditiy = this.checkFormValiditiy.bind(this);
  }

  componentDidMount() {
    fetchConfig().then(res => {
      this.setState({
        response: res,
        errors: null
      })
    });
  }

  handleInput(event) {
    this.setState({
      [event.target.id]: event.target.value
    }, () => {
      this.calculateMembership();
    })
  }

  calculateMembership() {
    // relies on this being in weeks

    let rent = this.state.rent;

    if (this.state.rent === 0) return 0;

    // If selected months.
    if (this.state.rentSelect === 1) {
      rent = rent / 4;
    }

    let membershipFee = 0.0;
    // if fixed
    if (this.state.apiResponse.fixed_membership_fee) {
      membershipFee = this.state.apiResponse.fixed_membership_fee_amount;
    // If less than minimum
    } else if (rent < MEMBERSHIP_MINIMUM) {
      membershipFee = 120;
    // Normal operation
    } else {
      membershipFee = rent
    }
    
    let finalFee = parseFloat(parseFloat(membershipFee) + (VAT * membershipFee)).toFixed(2);
    
    this.setState({
      membershipFee: finalFee
    })
    
    return finalFee
  }

  submitForm(event) {
    event.preventDefault();

    if (!this.state.errors) { 
      const obj = {
        postcode: this.state.postcode,
        rent: this.state.rent
      }
      this.props.submit(obj);
    }
  }

  checkFormValiditiy() {
    const form = document.getElementById('flatfair-form');

    if(!form.checkFormValiditiy()) {
      this.setState({
        errors: 'Form Not Valid'
      })
    } else {
      this.setState({
        errors: null
      })
    }
  }

  render() {
    return(
      <div className="modal Form">
        <h1>Create Your FlatFair</h1>

        <form onSubmit={this.submitForm} id="flatfair-form">
      
            <div className="form-group">
              <h2>How much is your rent?</h2>

              <div className="form-group-content">

                <Input type="number" handlerId="rent" prefix="£"
                       handler={this.handleInput.bind(this)}
                       min={this.state.rentSelect === 0 ? MIN_WEEK_RENT : MAX_WEEK_RENT}
                       max={this.state.rentSelect === 0 ? MIN_MONTH_RENT : MAX_MONTH_RENT}
                       placeholder="Rent"
                       value={this.state.rent} 
                       required={true}
                />

                <Select options={['Week', 'Month']} handler={this.handleInput.bind(this)} handlerId="rentSelect" /> 

              </div>
            
            </div>
        
            <div className="membership-fee">
              <p className="membership-fee-prefix">Estimated Cost: </p>
              <p className="membership-fee-cost">{`£${this.state.membershipFee}`}</p>
            </div>
              
            <div className="form-group">
              <div className="form-group-content">
                <Input type="text" handlerId="postcode"
                       handler={this.handleInput.bind(this)}
                       placeholder="Postcode"
                       autocomplete="postal-code"
                       required={true}
                />
                
              </div>
            </div>
              
            <div className="form-group">
              <div className="form-group-content">
                <Button text="Create" disabled={this.state.errors}/>
              </div>
            </div>

            <p>{this.state.errors}</p> 
        
        </form>
      </div>
    )
  }
}