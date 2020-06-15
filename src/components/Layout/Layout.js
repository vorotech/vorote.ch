// @flow strict
import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import styled from 'styled-components';
import Grid, { grid } from 'styled-components-grid';
import type { Node as ReactNode } from 'react';
import { useSiteMetadata } from '../../hooks';

const StyledLayout = styled.div`
 ${grid({ halign: 'justify-center' })}
`;

type Props = {
  children: ReactNode,
  title: string,
  description?: string,
  socialImage?: string
};

const Layout = ({
  children,
  title,
  description,
  socialImage
}: Props) => {
  const { author, url } = useSiteMetadata();
  const metaImage = socialImage != null ? socialImage : author.photo;
  const metaImageUrl = url + withPrefix(metaImage);

  return (
    <StyledLayout>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={metaImageUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImageUrl} />
      </Helmet>
      <Grid.Unit size={{ lg: 10 / 12 }}>
        <Grid>
          {children}
        </Grid>
      </Grid.Unit>
    </StyledLayout>
  );
};

export default Layout;
