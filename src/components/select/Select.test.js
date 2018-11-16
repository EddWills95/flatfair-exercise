import React from 'react';
import { shallow } from 'enzyme';
import Select from './Select';

describe('Select', () => {
  const mockHandler = jest.fn();
  const mockOptions = [
    'Thing1', 'Thing2'
  ]
  const wrapper = shallow(<Select handler={mockHandler} options={mockOptions} />);
  
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