import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_S_PX,
} from '../../global/constants'

injectGlobal`
  .bubbleButton-logo-svg {
    fill: white;
    z-index: 10;
    width: 150px;
  }
`


export const Root = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  pointer-events: none;

  &.logo-hangin {
    z-index: 5;
    transition: all 1s ${EASE_OUT};
    transform: translate(
      -${-100 + (window.innerWidth / 2)}px,
      -${-100 + (window.innerHeight / 2)}px
    );
  }
`

export const LogoSVG = styled.object`
  z-index: 3;

  svg {
    fill: white;
  }
`

export const LogoTextRoot = styled.div`
  position: relative;
  z-index: 10;
  .logo-breatheIn & {
    transform: scale(0);
    transition: all .7s ${EASE_IN};
  }
  .logo-hangin & {
    transform: scale(.6);
    transition: all 1.5s ${EASE_OUT};
  }
`

export const CircleRoot = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

export const CircleBill = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  background: #AA4DAF;
  border-radius: 100%;
  transform: scale(0);
  transition: all 2s ${EASE_OUT};
  box-shadow: 2px 2px 20px rgba(0,0,0,.2);

  .logo-intro &, .logo-breatheOut & {
    transform: scale(1.8);
    ${'' /* opacity: 1;
    transition: all 3s ${EASE_OUT};
    transition-delay: .6s; */}
  }
  .logo-breatheIn & {
    transform: scale(0);
    transition: all 1s ${EASE_IN};
  }
  .logo-breatheOut &, .logo-hangin & {
    transform: scale(1);
    transition: all 1.5s ${EASE_OUT};
  }
`

export const CirclePaul = styled(CircleBill)`
  width: 225px;
  height: 225px;
  background: #8536AE;
  transition-delay: .3s;
  .logo-breatheIn & {
    transition-duration: .9s;
  }
`

export const CircleSami = styled(CirclePaul)`
  width: 200px;
  height: 200px;
  background: #6324A9;
  transition-delay: .6s;
  .logo-breatheIn & {
    transition-duration: .8s;
  }
`
