import React from 'react';
import { shallow } from 'enzyme';

import Form from './Form';

describe('Form', () => {
  beforeEach(() => {
    wrapper.setState({
      rent: 25,
      postcode: '',
      membershipFee: 0,
      apiResponse: {
        fixed_membership_fee: false,
        fixed_memberhsip_fee_amount: 0
      }
    })
  })

  const wrapper = shallow(<Form />)

  it('should have the default state', () => {
    expect(wrapper.state()).toEqual({
      rent: 25,
      postcode: '',
      membershipFee: 0,
      apiResponse: {
        fixed_membership_fee: false,
        fixed_memberhsip_fee_amount: 0
      }
    })
  })

  // it('should call api on mount', () => {
  // })

  describe('functions', () => {
    it('should have a handler function', () =>{
      wrapper.instance().handleInput({ target: { id: 'rent', value: 100 }});
  
      expect(wrapper.update().state('rent')).toEqual(100);
    })

    describe('calculating membership fee', () => {
      describe('fixed: false', () => {
        beforeEach(() => {
          wrapper.setState({
            rent: 300
          })
        })

        it('should caclulate the membership fee based on rent', () => {
          wrapper.instance().calculateMembership()

          expect(wrapper.update().state('membershipFee')).toEqual(360);
        })
      })

      describe('fixed: true', () => {
        beforeEach(() => {
          wrapper.setState({
            rent: 400,
            apiResponse: {
              fixed_membership_fee: true,
              fixed_membership_fee_amount: 320
            }
          })
        })

        it('should calculate', () => {
          wrapper.instance().calculateMembership();
          expect(wrapper.update().state('membershipFee')).toEqual(384);
        })
      })

      describe('minimum reached', () => {
        beforeEach(() => {
          wrapper.setState({
            rent: 110,
            apiResponse: {
              fixed_membership_fee: false,
              fixed_memberhsip_fee_amount: 0
            }
          })
        })

        it('should return 120 as the minimum', () => {
          wrapper.instance().calculateMembership();
          expect(wrapper.update().state('membershipFee')).toEqual(144);
        })
      })
    })
  })


  describe('visual', () => {
    it('should have inputs', () => {
      const rent = wrapper.find('#rent');
      const rentSelector = wrapper.find('#rent-selector');
      const postcode = wrapper.find('#postcode');
      const submit = wrapper.find('button');

      [rent, rentSelector, postcode, submit].forEach(input => {
        expect(input.length).toEqual(1);
      })
    })

    it('should display membership fee', () => {
      const membershipFee = wrapper.find('#membership-fee');

      expect(membershipFee.text()).toEqual('£0');
    })
  })


  describe('interactions', () => {
    it('should handle onCHange', () =>{
      wrapper.find('#rent').simulate('change', { target: { id: 'rent', value: 150 } });
  
      expect(wrapper.update().state('rent')).toEqual(150);
      
    })
    it('should calculate new membership on rent change', () => {
      wrapper.find('#rent').simulate('change', { target: { id: 'rent', value: 150 } });
      
      const membershipFee = wrapper.find('#membership-fee');
      expect(membershipFee.text()).toEqual('£180')
    })
  })
})