import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE_IN_OUT_SINE} from '../../global/constants'

const aColor = '#498359'

export const Page = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`

export const QuoteRoot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`

export const TextRoot = styled.div`
  border-radius: 5px;
  font-size: 36px;
  font-family: american typewriter;
  width: 630px;
  height: 200px;
  padding: 15px;
  text-align: center;

  .reveal & {
    background-color: ${alpha(.3, 'white')};
    transition: all 8s ${EASE_IN_OUT_SINE} 7s;
  }
  .exit & {
    transform: scale(0);
    opacity: 0;
    transition: opacity .5s, transform 1s;
    transition-timing-function: ${EASE_OUT};
  }
`

export const BackgroundRoot = styled.div`
  position: absolute;
  background: url('${p => p.src}');
  background-size: cover;
  background-attachment: fixed;
  opacity: 0;
  z-index: 2;
  height: 100%;
  width: 100%;
  transform: scale(1.2);

  .reveal & {
    opacity: 1;
    transform: none;
    transition: opacity 10s ${EASE_IN_OUT_SINE} 4s,
                transform 9.5s ${EASE_IN_OUT_SINE} 4.5s;
  }
`
