// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { PAGINATION } from '../../constants';
import { marginTop } from '../../utils/get-margin';

const StyledPagination = styled.div`
  display: flex;
  ${marginTop(2)}
`;

const Container = styled.div`
  width: 50%;
`;

const Previous = styled(Container)`
  text-align: left;
`;

const Next = styled(Container)`
  text-align: right;
`;

const StyledLink = styled(Link)`
  color: var(--color-secondary);
  font-size: 26px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: var(--color-primary);
  }
  ${(props) => props.disabled && css`
  pointer-events: none;
  color: var(--color-gray700);
  `}
`;

type Props = {
  prevPagePath: string,
  nextPagePath: string,
  hasNextPage: boolean,
  hasPrevPage: boolean
};

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasNextPage,
  hasPrevPage
}: Props) => (
  <StyledPagination>
    <Previous>
      <StyledLink rel="prev" to={hasPrevPage ? prevPagePath : '/'} disabled={!hasPrevPage}>{PAGINATION.PREV_PAGE}</StyledLink>
    </Previous>
    <Next>
      <StyledLink rel="next" to={hasNextPage ? nextPagePath : '/'} disabled={!hasNextPage}>{PAGINATION.NEXT_PAGE}</StyledLink>
    </Next>
  </StyledPagination>
);

export default Pagination;
