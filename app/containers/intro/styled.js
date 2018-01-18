import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  CatchLine as aCatchLine,
  SweetTalk as aSweetTalk,
} from '../../global/styled'
import {EASE_OUT, EASE_IN, EASE_IN_OUT_SINE} from '../../global/constants'

const getRandInt = range => Math.ceil(Math.random() * range)
const getRand = range => `${getRandInt(range)}px`

injectGlobal`
  @keyframes fromHeaven {
    0% {
      transform: none;
      opacity: 0;
    }
    100% {
      transform: rotate(-5deg);
      opacity: 1;
    }
  }
`

export const Root = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`

export const BackgroundRoot = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: white;
`

export const TypingRoot = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;

  .intro-text {
    font-size: 52px;
    font-family: quattrocento;
  }
`

export const YouAre = styled.div`
  opacity: 0;

  .intro-youAre & {
    opacity: 1;
  }

  .intro-enough & {
    transform: translateX(-800px);
    opacity: 0;
    transition-timing-function: ${EASE_OUT};
    transition: opacity 3s, transform 5s;
  }
`

export const Enough = styled.div`
  opacity: 0;

  .intro-enough & {
    opacity: 1;
    transition: all .01s linear .5s;
  }
  .intro-now & {
    opacity: 0;
    transform: translateX(800px);
    transition-timing-function: ${EASE_IN_OUT_SINE};
    transition: opacity 2s, transform 2s;
  }
`

export const Now = styled.div`
  position: relative;
  opacity: 0;

  .intro-now & {
    opacity: 1;
    transition: all .01s linear .5s;
  }
`

export const Sneaky = styled.div`
  font-size: 32px;
  opacity: 0;
  font-family: quattrocento;

  .intro-now & {
    position: absolute;
    width: 300px;
    top: -50%;
    left: -60px;
    animation-name: fromHeaven;
    animation-duration: 2s;
    animation-direction: alternate;
    animation-delay: 2s;
    animation-iteration-count: 2;
    animation-fill-mode: both;
  }
`

export const What = styled.div`
  opacity: 0;

  .intro-what & {
    opacity: 1;
  }

  .intro-exit & {
    opacity: 0;
    transform: scale(0);
    transition: all .5s ${EASE_IN_OUT_SINE};
  }
`

export const DualityRoot = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
`

export const Duality = styled.div`
`
