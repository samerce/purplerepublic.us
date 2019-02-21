import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
} from '../../global/constants'
import {screen, Flex} from '../../global/styled'

const DurationHangin = '1s'

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
  left: 50%;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 7;
  cursor: pointer;
  transition: all .5s ${EASE_OUT};
  ${'' /* transition-property: left transform; */}
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;

  ${screen.medium`
    width: 110px;
  `}

  &.logo-chill, &.logo-settle {
    margin-top: 55px;
    top: 0;
    transform: translate(-50%, 0);
    transition: all ${DurationHangin} ${EASE_OUT};

    ${screen.large`
      margin-top: 5px;
    `}
    ${screen.small`
      margin: 0;
    `}
  }

  /* &.logo-chill {
    transition: all 1s ${EASE_OUT};
    transform: translate(
      -${(window.innerWidth / 2) - 127}px,
      -${(window.innerHeight / 2) - 125}px
    );
  }

  ${screen.medium`
    &.logo-chill {
      transform: translate(
        -${(window.innerWidth / 2) - 70}px,
        -${(window.innerHeight / 2) - 70}px
      );
    }
  `} */
`

export const LogoTextRoot = styled.div`
  position: relative;
  z-index: 10;

  .logo-chill &, .logo-settle & {
    transform: scale(.5);
    transition: all ${DurationHangin} ${EASE_OUT};
  }

  ${screen.large`
    .logo-splash &, .logo-birth & {
      transform: scale(.85);
    }
    .logo-chill &&, .logo-settle && {
      transform: scale(.25);
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
  border-radius: 100%;
  transform: scale(0);
  transition: all 2s ${EASE_OUT};
  box-shadow: ${p => p.theme.shadowVeryHeavy};
  background: ${p => p.theme.shelly};
  border: 1px solid rgba(255, 255, 255, .2);

  .logo-splash & {
    transform: scale(1.8);
    ${screen.large`
      transform: scale(1.2);
    `}
  }
  .logo-breatheIn & {
    transform: scale(0);
    transition: all 1s ${EASE_IN};
  }
  .logo-chill &, .logo-settle & {
    transform: scale(.8);
    transition: all ${DurationHangin} ${EASE_OUT};
    transition-delay: 0;
    ${screen.large`
      transform: scale(.39);
    `}
  }
`

export const CirclePaul = CircleBill.extend`
  width: 225px;
  height: 225px;
  background: ${p => p.theme.tweet};
  transition-delay: .3s;
  box-shadow: ${p => p.theme.shadowLight};
  .logo-breatheIn & {
    transition-duration: .9s;
  }
`

export const CircleSami = CirclePaul.extend`
  width: 200px;
  height: 200px;
  background: ${p => p.theme.pram};
  transition-delay: .6s;
  .logo-breatheIn & {
    transition-duration: .8s;
  }
`

export const Name = Flex.extend`
  font-size: 96px;
  font-family: great vibes;
  font-weight: 800;
  color: ${p => p.theme.shelly};
  text-align: center;
  flex-direction: column;
  margin: 0 0 0 -7px;
  text-shadow: 1px 1px white;

  div:first-child {
    height: 135px;

    ${screen.large`
      height: 140px;
    `}
    ${screen.medium`
      height: 125px;
    `}
  }

  ${screen.large`
    line-height: 129px;
    font-size: 72px;
  `}
  ${'' /* div:last-child {
    flex: 0 0 22px;
    font-family: im fell dw pica;
  } */}
`
