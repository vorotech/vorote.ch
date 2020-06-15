// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Page from './Page';
import 'jest-styled-components'
import Theme from '../Theme';

describe('Page', () => {
  const props = {
    children: 'test',
    title: 'test',
  };

  it('renders correctly', () => {
    const tree = renderer.create(
    <Theme>
      <Page {...props} />
    </Theme>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
