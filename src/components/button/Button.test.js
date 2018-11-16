import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

describe('Button', () => {
  const mockHandler = jest.fn();
  const mockText = 'Test';
  const wrapper = shallow(<Button handler={mockHandler} text={mockText} />);

  it('should render without fail', () => {
    expect(wrapper).toBeTruthy();
  })

  it('should have a button', () => {
    const button = wrapper.find('button');

    expect(button.length).toEqual(1);
  })

  it('should call the handler on click', () => {
    const button = wrapper.find('button');

    button.simulate('click');

    expect(mockHandler).toHaveBeenCalled();
  })

  it('should display the text passed to it', () => {
    const button = wrapper.find('button');

    expect(button.text()).toEqual(mockText);
  })
})