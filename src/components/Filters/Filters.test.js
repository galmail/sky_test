import React from 'react';
import { shallow } from 'enzyme';

import Filters from './Filters';

describe('Test Filters Component', () => {

  it('should render without crashing', () => {
    const wrapper = shallow(<Filters />);
    expect(wrapper).toMatchSnapshot();
  });

});
