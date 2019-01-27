import React from 'react'

import {
  Root, HeroSection, Growth,
} from './styled'

export default class PoetcardHero extends React.PureComponent {

  render() {
    return (
      <Root>
        <HeroSection>
          <i className='fa fa-key' />
          got a poetcard secret code? enter it here!
        </HeroSection>
      </Root>
    )
  }

}
