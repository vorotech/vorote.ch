// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Grid from 'styled-components-grid';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import type { Node } from '../../types';
import { marginTop } from '../../utils/get-margin';
import { mediaUp } from '../../utils/get-media-query';

const PostFooter = styled.div`
  margin: 0 auto;
  padding: 0 15px;
  ${mediaUp.md`
    padding: 0;
  `}
`;

const PostComments = styled.div`
  margin: 0 auto;
  padding: 0 15px;
  ${mediaUp.md`
    padding: 0;
  `}
`;

const HomeButton = styled(Link)`
  display: block;
  max-width: 90px;
  height: ${(props) => props.theme.buttons.height}px;
  padding: 0 24px;
  line-height: ${(props) => props.theme.buttons.height}px;
  text-align: center;
  color: var(--color-text);
  border: 1px solid var(--color-gray500);
  border-radius: ${(props) => props.theme.buttons.borderRadius}px;
  font-size: ${(props) => props.theme.fontSizes.base}px;
  font-weight: normal;
  margin-left: auto;
  margin-right: auto;
  ${marginTop(1)}

  &:hover,
  &:focus {
    color: var(--color-primary);
  }
  ${mediaUp.md`
    position: fixed;
    max-width: auto;
    margin: 0;
    top: 30px;
    left: 30px
  `}
`;

type Props = {
  post: Node
};

const Post = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <>
      <HomeButton to="/">All Articles</HomeButton>
      <Grid id="content-grid" halign="justify-center">
        <Grid.Unit size={{ md: 8 / 12 }}>
          <Content body={html} title={title} />
        </Grid.Unit>
        <Grid.Unit size={{ md: 8 / 12 }}>
          <PostFooter>
            <Meta date={date} />
            {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
            <Author />
          </PostFooter>
        </Grid.Unit>
        <Grid.Unit size={{ md: 8 / 12 }}>
          <PostComments>
            <Comments postSlug={slug} postTitle={post.frontmatter.title} />
          </PostComments>
        </Grid.Unit>
      </Grid>
    </>
  );
};

export default Post;
