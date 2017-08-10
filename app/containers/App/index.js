/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import {Content} from './styled'
import {Redirect} from 'react-router'

import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';

const AppWrapper = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  background: rgba(87, 5, 76, .8);
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
        {React.Children.toArray(props.children)}
      </Content>
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
