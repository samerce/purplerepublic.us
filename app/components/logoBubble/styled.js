import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
} from '../../global/constants'
import {screen, Flex} from '../../global/styled'

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
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 7;
  cursor: pointer;
  transition: all .5s ${EASE_OUT};
  transition-property: left transform;
  margin-top: 70px;

  ${screen.large`
    width: 110px;
    margin-top: 20px;
  `}

  /* &.logo-hangin {
    transition: all 1s ${EASE_OUT};
    transform: translate(
      -${(window.innerWidth / 2) - 127}px,
      -${(window.innerHeight / 2) - 125}px
    );
  }

  ${screen.medium`
    &.logo-hangin {
      transform: translate(
        -${(window.innerWidth / 2) - 70}px,
        -${(window.innerHeight / 2) - 70}px
      );
    }
  `} */
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
    transform: scale(.5);
    transition: all 1.5s ${EASE_OUT};
  }

  ${screen.large`
    .logo-hangin & {
      transform: scale(.3);
    }
  `}
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
  background: ${p => lighten(.2, p.theme.main)};
  border-radius: 100%;
  transform: scale(0);
  transition: all 2s ${EASE_OUT};
  box-shadow: ${p => p.theme.shadowHeavy};

  .logo-intro & {
    transform: scale(1.8);
    ${screen.large`
      transform: scale(1.2);
    `}
  }
  .logo-breatheIn & {
    transform: scale(0);
    transition: all 1s ${EASE_IN};
  }
  .logo-hangin & {
    transform: scale(.8);
    transition: all 1.5s ${EASE_OUT};
    ${screen.large`
      transform: scale(.39);
    `}
  }
`

export const CirclePaul = styled(CircleBill)`
  width: 225px;
  height: 225px;
  background: ${p => lighten(.1, p.theme.main)};
  transition-delay: .3s;
  box-shadow: 2px 2px 20px rgba(0,0,0,.2);
  .logo-breatheIn & {
    transition-duration: .9s;
  }
`

export const CircleSami = styled(CirclePaul)`
  width: 200px;
  height: 200px;
  background: ${p => p.theme.main};
  transition-delay: .6s;
  .logo-breatheIn & {
    transition-duration: .8s;
  }
`

export const Name = Flex.extend`
  font-size: 80px;
  line-height: 22px;
  font-family: great vibes;
  ${'' /* font-weight: 800; */}
  color: white;
  text-align: center;
  flex-direction: column;

  div:first-child {
    flex: 0 0 42px;
  }
  div:last-child {
    flex: 0 0 22px;
    font-family: im fell dw pica;
  }
`
