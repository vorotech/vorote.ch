// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Menu from './Menu';
import 'jest-styled-components';
import Theme from '../../Theme';

describe('Menu', () => {
  const props = {
    menu: [
      {
        label: 'Item 0',
        path: '/#0/'
      },
      {
        label: 'Item 1',
        path: '/#1/'
      }
    ]
  };

  it('renders correctly', () => {
    const tree = renderer.create(
    <Theme>
      <Menu {...props} />
    </Theme>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
