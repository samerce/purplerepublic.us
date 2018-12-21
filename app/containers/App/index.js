import React from 'react'
import {Helmet} from 'react-helmet'

import styled, {ThemeProvider} from 'styled-components'
import {Content} from './styled'
import theme from '../../global/theme'
import {SRC_URL} from '../../global/constants'

import PurpleRouter from 'containers/purpleRouter'
// import withProgressBar from 'components/ProgressBar'

const AppWrapper = styled.div`
  height: 100%;
`;
const pageMeta = [
  {
    name: 'description',
    content: 'purple republic presents curated roots: (sm)art. isness with purpose. performance. politics. play.'
  },
]

export function App(props) {
  return (
    <AppWrapper>
      <Helmet>
        <title>express your mess — by purple republic</title>
        {pageMeta.forEach(m => (
          <meta name={m.name} content={m.content} />
        ))}
        <meta property='og:image' content={SRC_URL + 'commons/splash.jpg'} />
        <meta
          property='og:description'
          content='in a sea of vanilla, why not be lima bean puree?'
        />
      </Helmet>

      <ThemeProvider theme={theme}>
        <Content>
          <PurpleRouter />
        </Content>
      </ThemeProvider>
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
// export default withProgressBar(App);
