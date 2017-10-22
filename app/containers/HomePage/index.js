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
import QuarkArt from '../quarkart'

const router = {
  '#happenings': Happenings,
  '#politics': Politics,
  '#letsfocus': QuarkArt,
  '#movement': Movement,
  '#reflection': Reflection,
  '#action': Action,
}

export default class HomePage extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      prevRoute: null,
      route: window.location.hash || Object.keys(router)[0],
      transitionInit: false,
      transitionActive: false,
    }
  }

  componentDidMount() {
    window.onhashchange = () => this.setState({
      route: window.location.hash,
      prevRoute: this.state.route,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    // if (!this.state.transitionInit && !prevState.prevRoute && this.state.prevRoute) {
    //   this.setState({transitionInit: true})
    //   setTimeout(() => this.setState({transitionActive: true}), 50)
    // }
    // if (this.state.transitionActive) {
    //   setTimeout(() => this.setState({
    //     transitionInit: false,
    //     transitionActive: false,
    //     prevRoute: null,
    //   }), 600)
    // }
  }

  render() {
    const {route, prevRoute, transitionInit, transitionActive} = this.state
    const RouteComponent = router[route]
    const PrevRouteComponent = prevRoute && router[prevRoute]

    return (
      <Root>
        <RouteComponent className={`route entered`} />
      </Root>
    )
  }

}
