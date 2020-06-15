// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Copyright from './Copyright';
import 'jest-styled-components'
import Theme from '../../Theme';

describe('Copyright', () => {
  it('renders correctly', () => {
    const props = {
      copyright: 'copyright'
    };

    const tree = renderer.create(
      <Theme>
        <Copyright {...props} />
      </Theme>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
