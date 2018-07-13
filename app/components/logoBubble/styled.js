import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
} from '../../global/constants'
import {screen} from '../../global/styled'

injectGlobal`
  .bubbleButton-logo-svg {
    fill: white;
    z-index: 10;
    width: 150px;
  }

  ${screen.medium`
    .bubbleButton-logo-svg {
      width: 125px;
    }
  `}
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
    transition: all 1s ${EASE_OUT};
    transform: translate(
      -${(window.innerWidth / 2) - 100}px,
      -${(window.innerHeight / 2) - 100}px
    );
  }

  ${screen.medium`
    &.logo-hangin {
      transform: translate(
        -${(window.innerWidth / 2) - 70}px,
        -${(window.innerHeight / 2) - 70}px
      );
    }
  `}
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
  background: ${p => p.theme.main};
  border-radius: 100%;
  transform: scale(0);
  transition: all 2s ${EASE_OUT};
  box-shadow: 2px 2px 20px rgba(0,0,0,.2);

  .logo-intro & {
    transform: scale(1.8);
    ${screen.medium`
      transform: scale(1.4);
    `}
  }
  .logo-breatheIn & {
    transform: scale(0);
    transition: all 1s ${EASE_IN};
  }
  .logo-hangin & {
    transform: scale(1);
    transition: all 1.5s ${EASE_OUT};
  }
`

export const CirclePaul = styled(CircleBill)`
  width: 225px;
  height: 225px;
  background: ${p => lighten(.1, p.theme.main)};
  transition-delay: .3s;
  .logo-breatheIn & {
    transition-duration: .9s;
  }
`

export const CircleSami = styled(CirclePaul)`
  width: 200px;
  height: 200px;
  background: ${p => lighten(.2, p.theme.main)};
  transition-delay: .6s;
  .logo-breatheIn & {
    transition-duration: .8s;
  }
`
