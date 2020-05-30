import React from 'react';
import { Helmet } from 'react-helmet';

/* eslint-disable react/prop-types */
const wrapPageElement = ({ element }) => (
  <>
    <Helmet
      defer={false}
      htmlAttributes={{ lang: 'en' }}
      title="react-beautiful-dnd sample"
    >
      <meta charSet="utf-8" />
      <meta name="description" content="react-beautiful-dnd sample" />
    </Helmet>
    {element}
  </>
);

export default wrapPageElement;
