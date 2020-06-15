// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Author from './Author';
import 'jest-styled-components';
import Theme from '../../Theme';

describe('Author', () => {
  const props = {
    author: {
      name: 'test',
      photo: '/photo.jpg',
      bio: 'test'
    },
    isIndex: false
  };

  it('renders correctly', () => {
    const tree = renderer.create(
      <Theme>
        <Author {...props} />
      </Theme>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
