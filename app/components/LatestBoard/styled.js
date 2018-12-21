import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'

const aColor = '#498359'

injectGlobal`
  @keyframes spinning {
    0% {
      transform: rotate(180deg) scale(1.5);
    }
    50% {
      transform: rotate(270deg) scale(.9);
    }
    100% {
      transform: rotate(360deg) scale(1.5);
    }
  }

  @keyframes blinking {
    from {
      opacity: 1;
    }

    to {
      opacity: .3;
    }
  }
`

export const Root = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    z-index: 8;
    color: white;
    font-size: 20px;
    opacity: 0;
    transform: scale(2);
    transition: all 1s ${EASE_OUT};
    pointer-events: none;

    &.show {
      opacity: 1;
      transform: none;
      transition: all 1s ${EASE};
    }

    i {
      animation-duration: 1s;
      animation-name: spinning;
      animation-iteration-count: infinite;
      animation-timing-function: ${EASE};
      flex: 0 0 auto;
      color: inherit;
      font-size: inherit;
    }
    span {
      animation-duration: 1s;
      animation-name: blinking;
      animation-iteration-count: infinite;
      animation-timing-function: ${EASE};
      animation-direction: alternate;
    }
`
