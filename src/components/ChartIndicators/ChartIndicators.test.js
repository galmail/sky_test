import React from 'react';
import { shallow } from 'enzyme';

import ChartIndicators from './ChartIndicators';

describe('Test ChartIndicators Component', () => {

  it('should render without crashing', () => {
    const wrapper = shallow(<ChartIndicators />);
    expect(wrapper).toMatchSnapshot();
  });

});
