// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Tags from './Tags';
import 'jest-styled-components';
import Theme from '../../Theme';


describe('Tags', () => {
  it('renders correctly', () => {
    const props = {
      tags: [
        'test_0',
        'test_1'
      ],
      tagSlugs: [
        '/test_0',
        '/test_1'
      ]
    };

    const tree = renderer.create(
    <Theme>
      <Tags {...props} />
    </Theme>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
