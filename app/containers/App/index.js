import React from 'react'
import {Helmet} from 'react-helmet'

import styled, {ThemeProvider} from 'styled-components'
import {Content} from './styled'
import theme from '../../global/theme'

import Header from 'components/Header'
import Footer from 'components/Footer'
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
        <title>purple republic - isness with purpose</title>
        {pageMeta.forEach(m => (
          <meta name={m.name} content={m.content} />
        ))}
      </Helmet>

      <ThemeProvider theme={theme}>
        <Content>
          <Header />
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
