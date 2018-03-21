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
    width: 190px;
  }
`


export const Root = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  pointer-events: none;

  &.logo-hangin {
    z-index: 5;
    transition: all .01s linear .2s;
  }
`

export const LogoSVG = styled.object`
  z-index: 3;

  svg {
    fill: white;
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
  width: 300px;
  height: 300px;
  background: #AA4DAF;
  border-radius: 100%;
  transform: scale(0);

  .logo-intro & {
    ${'' /* transform: scale(1); */}
    ${'' /* opacity: 1;
    transition: all 3s ${EASE_OUT};
    transition-delay: .6s; */}
  }
`

export const CirclePaul = styled(CircleBill)`
  width: 275px;
  height: 275px;
  background: #8536AE;
  ${'' /* transition-delay: .3s; */}
`

export const CircleSami = styled(CirclePaul)`
  width: 250px;
  height: 250px;
  background: #6324A9;
  ${'' /* transition-delay: 0; */}
`
