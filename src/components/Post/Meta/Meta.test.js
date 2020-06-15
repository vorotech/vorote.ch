// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Meta from './Meta';
import 'jest-styled-components';
import Theme from '../../Theme';

describe('Meta', () => {
  it('renders correctly', () => {
    const props = {
      date: '2016-09-01'
    };

    const tree = renderer.create(
    <Theme>
      <Meta {...props} />
    </Theme>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
