import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_M,
} from '../../../global/constants'
import {
  screen, AbsoluteFlex, Flex,
  vyingBuilder,
} from '../../../global/styled'

injectGlobal`
  @keyframes shopArtVying {
    ${vyingBuilder()}
  }
`

export const Root = AbsoluteFlex.extend`
  background: ${p => p.theme.slightlyDark};
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  border: 1px solid ${p => p.theme.veryLight};
  height: 140px;
  left: 100px;
  top: 30px;
  box-shadow: inset 1px 1px 20px rgba(0,0,0,.3);
  z-index: 0;
  padding-left: 100px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${screen.medium`
    left: 45px;
    height: 70px;
    top: 10px;
    padding-left: 45px;
  `}
`

export const Title = AbsoluteFlex.extend`
  text-transform: uppercase;
  color: white;
  user-select: none;
  font-family: annie use your telescope;
  font-size: 22px;
  right: 0px;
  top: 0px;
  padding: 0 10px;
  transition: all .5s ${EASE_OUT};

  &:hover {
    transform: scale(.95);
  }
`

export const ImageButtonRoot = Flex.extend`
  height: 70%;
  line-height: 150px;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 8px;
  transition: all .5s ${EASE_OUT};
  cursor: pointer;

  img {
    height: 100%;
    ${'' /* animation-name: shopArtVying;
    animation-duration: 7s;
    animation-iteration-count: infinite;
    animation-direction: alternate; */}
  }

  &:hover {
    transform: scale(.95);
  }
  ${screen.medium`
    padding: 0 15px;
  `}
`

export const ImageButtonText = Flex.extend`
  color: white;
  font-family: annie use your telescope;
  font-size: 22px;
  z-index: 1;
  position: absolute;
  top: 0;
  ${'' /* background: ${p => alpha(.5, p.theme.slightlyDark)}; */}
  padding: 0 10px;
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  text-shadow: 1px 1px ${p => alpha(.5, p.theme.veryDark)};
  user-select: none;
  height: 50px;
  text-transform: uppercase;

  ${screen.medium`
    font-size: 16px;
    top: -40px;
  `}
`
