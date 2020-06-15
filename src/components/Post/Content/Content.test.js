// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Content from './Content';
import 'jest-styled-components'
import Theme from '../../Theme';

describe('Content', () => {
  it('renders correctly', () => {
    const props = {
      title: 'test',
      body: '<p>test</p>'
    };

    const tree = renderer.create(
      <Theme>
        <Content {...props} />
      </Theme>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
