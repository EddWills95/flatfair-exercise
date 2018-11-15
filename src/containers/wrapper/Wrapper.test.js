import React from 'react';
import { shallow } from 'enzyme';
import Wrapper from './Wrapper';

describe('Wrapper', () => {
  const comp = shallow(<Wrapper />);

  it('should render without fail', () => {
    expect(comp).toBeTruthy();
  })

  it('should render its children', () => {
    const mockChild = () => {
      return <div className="i-am-child"> </div>
    }
    
    comp.setProps({
      children: mockChild()
    })

    const child = comp.update().find('.i-am-child');

    expect(child.length).toEqual(1);
  })
})