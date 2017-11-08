import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import {Content} from './styled'

import Header from 'components/Header'
import Footer from 'components/Footer'
import PurpleRouter from 'containers/purpleRouter'
import withProgressBar from 'components/ProgressBar'

const AppWrapper = styled.div`
  height: 100%;
`;
const pageMeta = [
  {
    name: 'description',
    content: 'the purple party presents a new vision for america — a purple republic'
  },
]

export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s"
        meta={pageMeta}>
      </Helmet>

      <Content>
        <Header />
        <PurpleRouter />
      </Content>
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
