import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {makeSelectLocationState} from 'containers/App/selectors';
import {Root, Image, CatchLine} from './styles'
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

import Politics from '../Politics'
import Theatre from '../Theatre'
import Movement from '../Movement'
import Reflection from '../Reflection'
import Happenings from '../Happenings'
import Action from '../Action'

const router = {
  '#happenings': Happenings,
  '#politics': Politics,
  '#theatre': Theatre,
  '#movement': Movement,
  '#reflection': Reflection,
  '#action': Action,
}

@connect(createStructuredSelector({
  route: makeSelectLocationState(),
}))
export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    window.onhashchange = () => this.forceUpdate()
  }

  render() {
    const route = window.location.hash || Object.keys(router)[0]
    const RouteComponent = router[route]

    return (
      <Root>
        <RouteComponent />
      </Root>
    );
  }
}
