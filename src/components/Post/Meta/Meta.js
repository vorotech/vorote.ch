// @flow strict
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const PublishedDate = styled.p`
  font-style: italic;
`;

type Props = {
  date: string
};

const Meta = ({ date }: Props) => (
  <div>
    <PublishedDate>Published {moment(date).format('D MMM YYYY')}</PublishedDate>
  </div>
);

export default Meta;
