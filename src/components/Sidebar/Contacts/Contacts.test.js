
// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Contacts from './Contacts';
import 'jest-styled-components'
import Theme from '../../Theme';

describe('Contacts', () => {
  const props = {
    contacts: {
      email: '#',
      twitter: '#',
      vkontakte: '#',
      github: '#',
      rss: '#',
      telegram: '#'
    }
  };

  it('renders correctly', () => {
    const tree = renderer.create(
    <Theme>
      <Contacts {...props} />
    </Theme>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
