import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
} from '../../global/constants'

const aColor = '#498359'

injectGlobal`
  @keyframes runAway {
    0% {
      transform: none;
    }

    30% {
      transform: translateX(10px);
      opacity: 1;
    }

    70% {
      opacity: 0;
    }

    100% {
      transform: translateX(-2000px);
      opacity: 0;
    }
  }
`

export const Page = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  .img-loader {
    opacity: 0;
    pointer-events: none;
  }
`

export const QuoteRoot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`

export const TextRoot = styled.div`
  border-radius: 5px;
  font-size: 36px;
  width: ${window.innerWidth - 20}px;
  max-width: 605px;
  padding: 15px;
  text-align: center;
  cursor: pointer;


  .reveal & {
    background-color: ${alpha(.2, 'white')};
    transition: background-color 8s ${EASE} 7s,
    transform .3s ${EASE_OUT}, box-shadow .3s ${EASE_OUT};

    &:hover {
      transform: scale(1.01);
      box-shadow: 3px 5px 20px rgba(0,0,0,.3);
      transition: all .5s ${EASE};
    }
  }
  .exit & {
    transform: scale(.95);
    opacity: 0;
    transition: opacity .5s, transform 1s;
    transition-timing-function: ${EASE_OUT};
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    font-size: 22px;
  }

  & > * {
    pointer-events: none;
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
  pointer-events: none;

  .reveal & {
    opacity: 1;
    transform: none;
    transition: opacity 10s ${EASE} 3s,
                transform 9.5s ${EASE} 3.5s;
  }
`
