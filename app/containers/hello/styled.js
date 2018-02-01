import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE_IN_OUT_SINE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
} from '../../global/constants'

const aColor = '#498359'

injectGlobal`

`
export const Page = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  ${'' /* &.hello-exit {
    opacity: 0;
    transform: scale(2);
    transition: opacity 2s, transform 3s;
    transition-timing-function: ${EASE_OUT};
  } */}
`

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('${p => p.src}');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 2;
  transform: scale(1.01);
  opacity: 0;

  .hello-enter & {
    opacity: 1;
    transform: scale(1.05);
    transition: opacity 1s, transform 1s;
    transition-timing-function: ${EASE_IN_OUT_SINE};

    @media (max-width: ${SCREEN_WIDTH_S_PX}) {
      transform: scale(1.05) translateX(-150px);
    }
  }
  .hello-exit & {
    transform: translateX(-100%);
    transition: transform 3s linear .2s;

    @media (max-width: ${SCREEN_WIDTH_S_PX}) {
      transition-duration: 4.5s;
    }
  }

  @media (max-width: ${SCREEN_WIDTH_S_PX}) {
    width: ${window.innerHeight * 1.2}px;
    transform: scale(1.01) translateX(-150px);
  }
`

export const HeaderRoot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 3;

  .hello-header {
    flex: 0 0 auto;
    text-shadow: 1px 1px ${darken(.2, aColor)};
    width: 100%;
    padding: 50px 0 20px;
    margin: 0;
    background: linear-gradient(to top, ${alpha(.3, 'black')} 0%, transparent 100%);
    opacity: 0;
    transform: translateY(200px);
    transition: all 1s ${EASE_IN_OUT_SINE};

    .hello-enter & {
      opacity: 1;
      transform: none;
      transition: all 3s ${EASE_IN_OUT_SINE} 0s;
    }

    .hello-exit & {
      transform: translateX(-100%);
      transition: transform 3s linear .2s;

      @media (max-width: ${SCREEN_WIDTH_S_PX}) {
        transform: translateY(200px);
        transition: all .5s ${EASE_OUT};
      }
    }

    @media (max-width: ${SCREEN_WIDTH_S_PX}) {
      padding: 50px 5px 20px;
    }
  }
`

export const TransitionGif = styled.div`
  z-index: 1;
  position: absolute;
  bottom: -90px;
  left: 100%;
  background: url('${p => p.src}');
  height: 400px;
  width: 700px;
  background-size: contain;
  background-position: bottom;
  background-repeat: no-repeat;
  transform: translateX(-190px);

  .hello-exit & {
    left: -150px;
    transition: all 3.3s linear .2s;
  }

  @media (max-width: ${SCREEN_WIDTH_S_PX}) {
    .hello-exit & {
      left: -200px;
      transition-duration: 3.8s;
      transition-delay: .7s;
    }
  }
`
