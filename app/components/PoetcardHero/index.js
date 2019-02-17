import React from 'react'

import {
  Root, HeroSection, Growth, ContentRoot, Button,
} from './styled'
import {
  SectionHeader, TextInput,
} from '../../global/styled'

import autobind from 'autobind-decorator'

export default class PoetcardHero extends React.PureComponent {

  render() {
    return (
      <Root>
        <SectionHeader>
          <hr />
          <div>poetcards</div>
        </SectionHeader>
        <HeroSection>
          <ContentRoot>
            <p>want to join the revolution from your couch?<br />
            write a poetcard to those who need to hear you most.</p>
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
