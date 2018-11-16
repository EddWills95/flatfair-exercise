import React from 'react';
import { shallow } from 'enzyme';
import Finished from './Finished';

describe('Finished', () => {
  const mockFlatfair = {
    membershipFee: 200,
    postcode: 'POS1 CDE',
    rent: 130
  }

  const wrapper = shallow(<Finished flatfair={mockFlatfair}/>);

  it('should render without fail', () => {
    expect(wrapper).toBeTruthy();
  })

  it('should render the information passed to it', () => {
    const details = wrapper.update().find('.finished-details');
    const membership = details.find('.finished-details-membership');
    
    expect(membership.length).toEqual(1);
    expect(membership.text()).toEqual('£ 200 / month');
    
  })
})