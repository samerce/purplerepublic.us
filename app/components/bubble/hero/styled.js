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
  screen, AbsoluteFlex, Flex, Boto, AbsoluteFlexFillParent,
  vyingBuilder,
} from '../../../global/styled'

injectGlobal`
  @keyframes shopArtVying {
    ${vyingBuilder()}
  }
`

export const Root = Flex.extend`
  background: ${p => p.theme.slightlyDark};
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  border: 1px solid ${p => p.theme.veryLight};
  height: 140px;
  width: 440px;
  left: 100px;
  top: 30px;
  box-shadow: inset 1px 1px 20px rgba(0,0,0,.3);
  z-index: 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-left: 50px;

  ${p => p.shop && `
    padding-left: 100px;
  `}
  ${screen.medium`
    left: 45px;
    height: 70px;
    top: 10px;
    padding-left: ${p => p.shop? 45 : 22}px;
    width: 270px;
  `}
  ${screen.small`
    width: 200px;
  `}
`

export const PatreonRoot = Root.extend`
  left: initial;
  right: 100px;
  flex-direction: column;
  padding: 0;
  padding-right: 50px;

  ${screen.medium`
    left: initial;
    right: 45px;
    padding: 0;
    padding-right: 22px;
  `}
`

export const InstagramRoot = Root.extend`
  flex-direction: column;
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
  padding: 0 15px;
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
`

export const ImageButtonText = Flex.extend`
  color: white;
  font-family: annie use your telescope;
  font-size: 22px;
  z-index: 1;
  position: absolute;
  top: 0;
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

export const BeggingButton = Boto.extend`
  width: 100%;
  border-radius: 0;
  font-size: 20px;
  flex: 0 0 auto;
  background: transparent;
  border-top: 1px solid ${p => p.theme.veryLight};
  padding: 5px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  ${screen.medium`
    font-size: 16px;
    padding: 0;
  `}
  ${screen.small`
    font-size: 14px;
  `}
`
