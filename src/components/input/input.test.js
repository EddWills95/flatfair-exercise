import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';

describe('Input', () => {
  const mockHandler = jest.fn();
  const wrapper = shallow(<Input handler={mockHandler} />);
  
  it('should render without fail', () => {
    expect(wrapper).toBeTruthy();
  })

  it('should pass the event back up', () => {
    const mockEvent = {
      target: {
        id: 'test-id',
        value: 'test-value'
      }
    }
    
    wrapper.instance().passEvent(mockEvent);

    expect(mockHandler).toHaveBeenCalled();
  })
})