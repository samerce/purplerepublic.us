import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_M,
} from '../../global/constants'
import {
  Flex,
} from '../../global/styled'

export const Root = Flex.extend`
  &#mc_embed_signup {
    background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;
    justify-content: center;
    background: transparent;
  }
  .mc_hidden_input {
    position: absolute;
    left: -5000px;
  }
  #mc_embed_signup_scroll {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #mc-embedded-subscribe-form {
    width: 100%;
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
  .hiddenInput {
    visibility: hidden;
  }
`
