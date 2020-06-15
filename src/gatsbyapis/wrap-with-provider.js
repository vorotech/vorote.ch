import React from 'react';
import Theme from '../components/Theme';
import GlobalStyles from '../components/GlobalStyles';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
  <Theme>
    <GlobalStyles />
    {element}
  </Theme>
);
