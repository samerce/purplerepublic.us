import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, FlexColumn, Boto, AbsoluteFlex, screen,
} from '../../global/styled'

injectGlobal`
  #mc_embed_signup{
    background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;
  }
  .mc_hidden_input {
    position: absolute;
    left: -5000px;
  }
`

export const Root = Flex.extend`
  padding: 20px 0 40px;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  background: ${p => p.theme.veryDarkTransparent};
  position: relative;
`

export const ContentRoot = Flex.extend`
  flex-wrap: wrap;
  padding: 0 15px;
  width: 100%;
  align-items: center;

  ${screen.medium`
    flex-direction: column;
  `}
`

export const IconGroup = Flex.extend`
  flex: 0 0 40%;
  position: relative;

  ${screen.medium`
    flex: 0 0 210px;
    width: 100%;
  `}

  i {
    position: absolute;
    font-size: 160px;
    margin: 0 10px;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    color: white;

    &.a {
      transform: translate(50%,-50%) rotate(-14deg);
      top: 0;
      right: 190px;
    }
    &.b {
      right: 380px;
      top: 180px;
      transform: translate(50%,-50%) rotate(12deg);
    }
    &.c {
      top: 100px;
      right: 120px;
      transform: translate(50%, -50%) rotate(-5deg);
    }
    &.d {
      top: 10px;
      right: 300px;
      transform: translate(50%, -50%) rotate(9deg);
    }

    &.med {
      color: ${p => p.theme.veryLight};
      font-size: 90px;
    }
    &.small {
      color: ${p => p.theme.veryLight};
      font-size: 60px;
    }
  }
`

export const Blurb = FlexColumn.extend`
  flex: 0 0 60%;
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  border: 1px solid ${p => p.theme.veryLight};
  background ${p => p.theme.veryDark};
  font-size: 26px;
  padding: 20px;
  justify-content: flex-start;
  color: white;
  max-width: 780px;

  strong {
    text-transform: uppercase;
    font-size: 30px;
    font-family: playfair display;
  }
  span {
    margin: 15px 0 0;
    font-size: 20px;
    color: ${p => p.theme.veryLight};
  }
  i {
    font-style: italic;
  }

  ${screen.medium`
    width: 100%;
    flex: 0 0 auto;
  `}
`

export const MailingListRoot = FlexColumn.extend`
  flex: 0 0 100%;
  margin: 40px auto 0;
  max-width: 740px;
  font-size: 24px;
  text-align: center;
  border: 1px solid ${p => p.theme.veryLight};
  background: ${p => p.theme.veryDark};
  border-radius: 10px;
  box-shadow: ${p => p.theme.shadowVeryHeavy};
  padding: 20px;

  ${screen.medium`
    flex: 0 0 auto;
    width: 100%;
  `}

  #mc_embed_signup {
    background: transparent;
  }

  .email {
    max-width: 100%;
    width: 500px;
    background: transparent;
    padding: 10px;
    font-size: 22px;
    color: white;
    border-bottom: 1px solid ${p => p.theme.veryLight};
    text-align: center;
    font-family: alice;
    margin: 20px 0 10px;
  }

  #mc-embedded-subscribe {
    background: ${p => p.theme.tweet};
    font-family: alice;
    font-size: 26px;
    color: white;
    border-radius: 10px;
    width: 300px;
    padding: 10px;
    border: 1px solid ${p => p.theme.tweetLight};
    cursor: pointer;
    max-width: 100%;

    &:hover {
      background: white;
      border-color: ${p => p.theme.tweet};
      color: ${p => p.theme.tweet};
    }
  }
  .hiddenInput {
    visibility: hidden;
  }
`

export const Header = Flex.extend`
  font-size: 24px;
  color: white;
  justify-content: center;
  font-family: playfair display;
  text-transform: uppercase;
`
