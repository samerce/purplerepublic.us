import React from 'react'

import {
  Root, HeroSection, Growth, ContentRoot, Button,
} from './styled'
import {
  SectionHeader, TextInput,
} from '../../global/styled'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

@connect(d => ({
  introMode: d.get('intro').get('mode'),
}))
export default class PoetcardHero extends React.PureComponent {

  render() {
    return (
      <Root className={this.props.introMode}>
        <SectionHeader>
          <hr />
          <div>poetcards</div>
        </SectionHeader>
        <HeroSection>
          <ContentRoot>
            <p>
              darling, sweetie,<br />
              want to join the revolution from your couch?
              <hr />
              our plan is to save the world with art. get into it!<br />
              write a postcard to a friend who needs it most!
            </p>
            <Button onClick={this.onClickGetPoetcards}>
              get poetcards
            </Button>
          </ContentRoot>

          <ContentRoot>
            <p>got a poetcard secret code?</p>
            <TextInput placeholder='enter it here!' />
          </ContentRoot>
        </HeroSection>
      </Root>
    )
  }

  @autobind
  onClickGetPoetcards() {
    ga('send', 'event', {
      eventCategory: 'poetcard hero',
      eventAction: 'get-poetcards clicked',
    })
    window.location = '#start/bubble/buy-poetcards'
  }

}
