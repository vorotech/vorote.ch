// @flow strict
import React from 'react';
import styled from 'styled-components';
import { marginTop, marginBottom } from '../../../utils/get-margin';
import { lineHeight } from '../../../utils/get-line-height';
import { mediaUp } from '../../../utils/get-media-query';

const StyledContent = styled.div`
  padding: 0 15px;
  margin: 0 auto;
  ${mediaUp.md`
    padding: 0;
  `}
`;

const ContentTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes.base * 2}px;
  margin-left: auto;
  margin-right: auto;
  font-weight: ${props => props.theme.fontWeights.heading};
  text-align: center;
  ${lineHeight(1.65)}
  ${marginTop(1)}
  margin-bottom: 0;

  ${mediaUp.md`
    font-size: ${props => props.theme.fontSizes.base * 3}px;
    ${lineHeight(2.25)}
    ${marginTop(2.25)}
    ${marginBottom(1.5)}
  `}
`;

const ContentBody = styled.div`
  & figure {
    ${marginBottom(1)}
  } 

  & figure blockquote {
    font-style: italic;
    text-align: center;
    margin-top: 0;
    padding: ${props => props.theme.spacing}px 0;
  }

  & figure blockquote p {
    font-size: ${props => props.theme.fontSizes.base * 1.6817}px;
    ${lineHeight(1.5)}
    margin-top: 0;
    ${marginBottom(1)}
  }

  & a {
    text-decoration: underline;
  }

  & * {
    margin-left: auto;
    margin-right: auto
  }

  & img {
    max-width: 100%;
  }

  ${mediaUp.md`
    font-size: ${props => props.theme.fontSizes.base * 1.125}px;
    ${lineHeight(1.125)}
    ${marginBottom(1.125)}

    & p {
      font-size: ${props => props.theme.fontSizes.base * 1.125}px;
      ${lineHeight(1.125)}
      ${marginBottom(1.125)}
    }
  `}
`;

type Props = {
  body: string,
  title: string
};

const Content = ({ body, title }: Props) => (
  <StyledContent>
    <ContentTitle>{title}</ContentTitle>
    <ContentBody dangerouslySetInnerHTML={{ __html: body }} />
  </StyledContent>
);

export default Content;
