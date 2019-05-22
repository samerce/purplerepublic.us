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
  FlexColumn,
} from '../../global/styled'

export const Root = FlexColumn.extend`
  padding: 20px;
  max-width: 550px;

  &#mc_embed_signup {
    clear:left;
    width:100%;
    justify-content: center;
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
    padding: 20px 10px 10px;
    transform: translate(0, -10px);
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
    border-radius: 10px;
    padding: 20px;
    font-size: 22px;
    color: white;
    border-color: ${p => p.theme.veryLight};
    z-index: 1;
  }
  .hiddenInput {
    visibility: hidden;
    height: 0;
  }
`
