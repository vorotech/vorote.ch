// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import PostTemplate from './post-template';
import siteMetadata from '../../jest/__fixtures__/site-metadata';
import markdownRemark from '../../jest/__fixtures__/markdown-remark';
import type { RenderCallback } from '../types';
import 'jest-styled-components';
import Theme from '../components/Theme';

describe('PostTemplate', () => {
  const props = {
    data: {
      ...markdownRemark
    }
  };

  beforeEach(() => {
    StaticQuery.mockImplementationOnce(
      ({ render }: RenderCallback) => (
        render(siteMetadata)
      ),
      useStaticQuery.mockReturnValue(siteMetadata)
    );
  });

  it('renders correctly', () => {
    const tree = renderer.create(
    <Theme>
      <PostTemplate {...props} />
    </Theme>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
