import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { grid } from 'styled-components-grid';
import { mediaUp } from '../../utils/get-media-query';
import { margin, marginBottom } from '../../utils/get-margin';
import { lineHeight } from '../../utils/get-line-height';

const StyledPage = styled.div`
  ${marginBottom(2)}
  ${grid.unit({ size: { sm: 7 / 12, md: 2 / 3 } })}
`;

const PageInner = styled.div`
  padding: 25px 20px;
  ${mediaUp.sm`
    padding: 30px 20px;
  `}
  ${mediaUp.md`
    padding: 40px 35px;
  `}
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.base * 2.5}px;
  font-weight: ${(props) => props.theme.fontWeights.heading};
  ${lineHeight(2)}
  margin-top: 0px;
  ${marginBottom(1.45)}
`;

const PageContent = styled.div`
  font-size: ${(props) => props.theme.fontSizes.base}px;
  ${lineHeight(1)}
  ${margin(0, 0, 1)}
`;

type Props = {
  title?: string,
  children: React.Node
};

const Page = ({ title, children }: Props) => {
  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });

  return (
    <StyledPage ref={pageRef}>
      <PageInner>
        {title && <Title>{title}</Title>}
        <PageContent>
          {children}
        </PageContent>
      </PageInner>
    </StyledPage>
  );
};

export default Page;
