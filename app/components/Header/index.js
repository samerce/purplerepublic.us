import React from 'react'
import {
  Title, Subtitle, Root, SocialMediaLinks, Icon,
  NavDropdownButton, NavDropdown, NavLinkArea,
} from './styled'
import NavLink from '../NavLink'
import {ACTIVE_NAV_LINK_DURATION} from '../../global/constants'
import {createStructuredSelector} from 'reselect'
import {makeSelectLocationState} from 'containers/App/selectors'
import {connect} from 'react-redux'
import {NAV_LINKS} from './constants'

let timer = null

export default class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super()
    this.state = {
      activeKey: 0,
      navDropdownOpen: false,
      tickled: false,
    }
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        if (window.location.hash) {
          this.setActiveKeyForLocation()
        }
        window.location = window.location.hash || NAV_LINKS[0].route
        this.forceUpdate()
      }
    }
    document.body.onscroll = () => this.stopAutoAdvance()
    document.addEventListener('touchmove', () => this.stopAutoAdvance())
    window.onhashchange = () => this.setActiveKeyForLocation()

    document.body.onclick = () => {
      if (this.state.navDropdownOpen) {
        this.setState({navDropdownOpen: false})
      }
    }
  }

  componentDidMount() {
    timer = setInterval(() => {
      let newActiveKey = this.state.activeKey + 1
      if (newActiveKey >= NAV_LINKS.length) newActiveKey = 0
      this.setState({activeKey: newActiveKey, hasAdvancedOnce: true})
      window.location = NAV_LINKS[newActiveKey].route
    }, ACTIVE_NAV_LINK_DURATION)
  }

  render() {
    const {
      activeKey,
      navDropdownOpen,
      tickled,
    } = this.state;
    return (
      <Root routeKey={activeKey}>
        <Title routeKey={activeKey}>purple republic</Title>
        <Subtitle routeKey={activeKey}>is</Subtitle>

        <NavLinkArea
          onMouseEnter={() => this.setState({tickled: true})}
          onMouseLeave={() => this.setState({tickled: false})}>
          {this.renderNavLinks()}
          <NavDropdownButton
            className={tickled && 'cower'}
            onClick={this.onClickNavDropdownButton.bind(this)}>
            <i className='fa fa-ellipsis-h' />
          </NavDropdownButton>
        </NavLinkArea>


        <NavDropdown isOpen={navDropdownOpen}>
          {this.renderNavLinks(true)}
        </NavDropdown>

        <SocialMediaLinks className={tickled && 'cower'}>
          <Icon
            href='mailto:rise@purplerepublic.us'
            title='email'
            target='_blank'>
            <i className='fa fa-envelope' />
          </Icon>
          <Icon
            href='https://www.facebook.com/purplerepublic.us'
            title='facebook'
            target='_blank'>
            <i className='fa fa-facebook-square' />
          </Icon>
          <Icon
            href='https://twitter.com/1PurpleRepublic'
            title='twitter'
            target='_blank'>
            <i className='fa fa-twitter-square' />
          </Icon>
          <Icon
            href='https://www.youtube.com/channel/UCESV_c8siQuX-Hl371lLvcg'
            title='youtube'
            target='_blank'>
            <i className='fa fa-youtube-square' />
          </Icon>
          <Icon
            href='https://www.instagram.com/1PurpleRepublic'
            title='instagram'
            target='_blank'>
            <i className='fa fa-instagram' />
          </Icon>
          <Icon
            href='https://medium.com/the-purple-republic'
            title='medium'
            target='_blank'>
            <i className='fa fa-medium' />
          </Icon>
        </SocialMediaLinks>
      </Root>
    );
  }

  renderNavLinks(isInMenu = false) {
    const route = window.location.hash || NAV_LINKS[0].route
    const {tickled} = this.state
    return NAV_LINKS.map((linkData, key) => (
      <NavLink
        className={tickled && 'tickled'}
        key={key}
        canHide={key > 2}
        isSelected={route === linkData.route}
        routeKey={this.getActiveRouteKey()}
        isTimed={timer}
        isInMenu={isInMenu}
        onClick={this.onClickNavLink.bind(this, linkData.route)}>
        {linkData.text}
      </NavLink>
    ))
  }

  onClickNavLink(route) {
    this.setState({navDropdownOpen: false})
    this.clearTimer()

    window.location = route
    setTimeout(() => this.setActiveKeyForLocation(), 300)
  }

  clearTimer() {
    clearInterval(timer)
    timer = null
  }

  stopAutoAdvance() {
    this.clearTimer()
    this.forceUpdate()
  }

  onClickNavDropdownButton() {
    this.setState({navDropdownOpen: !this.state.navDropdownOpen})
  }

  getActiveRouteKey() {
    return NAV_LINKS.findIndex(link => {
      return link.route === window.location.hash
    })
  }

  setActiveKeyForLocation() {
    this.setState({activeKey: this.getActiveRouteKey()})
  }

}

// Header.propTypes = {
//   location: React.PropTypes.object,
// }
//
// export default connect(createStructuredSelector({
//   location: makeSelectLocationState(),
// }))(Header)
