// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from './Pagination';
import 'jest-styled-components'
import Theme from '../Theme';

describe('Pagination', () => {
  const props = {
    prevPagePath: '/page/1',
    nextPagePath: '/page/3',
    hasNextPage: true,
    hasPrevPage: true
  };

  it('renders correctly', () => {
    const tree = renderer.create(
    <Theme>
      <Pagination {...props} />
    </Theme>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
