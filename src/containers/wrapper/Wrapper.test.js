import React from 'react';
import { shallow } from 'enzyme';
import Wrapper from './Wrapper';

describe('Wrapper', () => {
  const wrapper = shallow(<Wrapper />);

  it('should render without fail', () => {
    expect(wrapper).toBeTruthy();
  })

  it('should render components conditionally', () => {
    wrapper.setState({
      finishedForm: false
    })

    const form = wrapper.update().find('Form');

    expect(form.length).toEqual(1);
  })
})