// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import Sidebar from './Sidebar';
import siteMetadata from '../../../jest/__fixtures__/site-metadata';
import type { RenderCallback } from '../../types';
import 'jest-styled-components';
import Theme from '../Theme';

describe('Sidebar', () => {
  beforeEach(() => {
    StaticQuery.mockImplementationOnce(
      ({ render }: RenderCallback) => (
        render(siteMetadata)
      ),
      useStaticQuery.mockReturnValue(siteMetadata)
    );
  });

  const props = {
    isIndex: true
  };

  it('renders correctly', () => {
    const tree = renderer.create(
    <Theme>
      <Sidebar {...props} />
    </Theme>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
