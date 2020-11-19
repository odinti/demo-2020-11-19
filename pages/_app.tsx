import React from 'react';

import '../styles.css';

// @ts-ignore
function App({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default App;
