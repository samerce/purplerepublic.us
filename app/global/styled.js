import styled, {css} from 'styled-components'
import {
  EASE, EASE_OUT,
  SCREEN_WIDTH_S,
  SCREEN_WIDTH_MMS,
  SCREEN_WIDTH_MS,
  SCREEN_WIDTH_M,
  SCREEN_WIDTH_ML,
  SCREEN_WIDTH_L,
  SCREEN_WIDTH_XL,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
} from './constants'
import {darken, lighten, transparentize as trans} from 'polished'
import theme from './theme'

const sizes = {
  small: SCREEN_WIDTH_S,
  medmedsmall: SCREEN_WIDTH_MMS,
  medsmall: SCREEN_WIDTH_MS,
  medium: SCREEN_WIDTH_M,
  mediumlarge: SCREEN_WIDTH_ML,
  large: SCREEN_WIDTH_L,
  xlarge: SCREEN_WIDTH_XL,
}
export const screen = Object.keys(sizes).reduce((result, key) => {
  result[key] = (...args) => css`
    @media (max-width: ${sizes[key] / 16}em) {
      ${css(...args)}
    }
  `
  return result
}, {})

const getRandInt = range => Math.ceil(Math.random() * range)
const getRand = range => `${getRandInt(range)}`
export const vyingBuilder = () => `
  0% {
    transform: rotate(${getRand(-10)}deg) translate(${getRand(10)}px, ${getRand(5)}px);
  }
  25% {
    transform: rotate(${getRand(7)}deg) translate(${getRand(5)}px, ${getRand(-5)}px) scale(1.1);
  }
  50% {
    transform: rotate(${getRand(-5)}deg) translate(${getRand(-12)}px, ${getRand(8)}px);
  }
  75% {
    transform: rotate(${getRand(10)}deg) translate(${getRand(8)}px, ${getRand(12)}px) scale(.9);
  }
  100% {
    transform: rotate(${getRand(-10)}deg) translate(${getRand(-6)}px, ${getRand(-7)}px);
  }
`

export const Flex = styled.div`
  display: flex;
`

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`

export const AbsoluteFlex = styled(Flex)`
  position: absolute;
`

export const AbsoluteFlexFillParent = styled(AbsoluteFlex)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  align-items: center;
`

export const InlineBlock = styled.div`
  display: inline-block;
`

export const H1 = styled.h1`
  font-size: 48px;
  line-height: 38px;
  color: ${theme.semiWhite};
  font-family: great vibes;
  text-align: center;
  align-self: center;
  padding: 0 20px;
  margin: 15px 0 10px;
  font-weight: normal;
  text-shadow: 1px 1px ${theme.veryDark};

  ${screen.medium`
    font-size: 34px;
  `}
`

export const H2 = styled.h2`
  font-size: 26px;
  color: ${theme.veryLight};
  margin: 0 0 30px;
  text-align: center;
  align-self: center;
  padding: 0 20px;
  text-shadow: 1px 1px ${theme.veryDark};

  ${screen.medium`
    font-size: 21px;
  `}
`

export const Body = styled(FlexColumn)`
  font-size: 20px;
  color: ${p => p.theme.slightlyDark};
  background: ${p => p.theme.veryLight};
  border-radius: 10px;
  border: 1px solid ${p => p.theme.slightlyDark};
  padding: 0 20px;
  max-width: 780px;
  box-shadow: ${p => p.theme.shadowMedium};
  margin: 20px;
`

export const Form = styled(Body)`
  background: ${p => p.theme.veryDark};
  color: ${p => p.theme.veryLight};
  border: 1px solid ${p => p.theme.veryLight};
`

const DefaultIconSize = 24
export const Icon = styled.i`
  font-size: ${DefaultIconSize}px;
  color: white;
  text-align: center;
  transition: all .3s ${EASE_OUT};
`

export const BubbleButton = styled(Flex)`
  position: relative;
  border-radius: 100%;
  border: 1px solid ${p => p.theme.veryLight};
  background: ${p => p.theme.main};
  transition: all .5s ${EASE_OUT};
  align-items: center;
  justify-content: center;
  box-shadow: ${p => p.theme.shadowMedium};
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  color: white;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 1px 1px 15px rgba(0,0,0,.3);
  }
  &:active {
    transform: scale(.85);
  }
`

const buttonColorMain = theme.hopi
const buttonColorLight = theme.hopiLight
const buttonColorDark = theme.hopiDark
const buttonColorWhite = lighten(.2, buttonColorLight)
export const Boto = styled(Flex)`
  font-size: 20px;
  font-family: alice; /*alice, annie use your telescope;*/
  text-align: center;
  cursor: pointer;
  transition: all .3s ${EASE_OUT};
  align-items: center;
  justify-content: center;
  user-select: none;
  color: ${buttonColorMain};/*${lighten(.1, theme.semiWhite)};*/
  background: ${buttonColorWhite};/*${trans(.2, theme.semiWhite)};*/
  border-radius: ${theme.borderRadiusBoto}px;
  padding: 10px 30px;
  border: 2px solid white;
  box-shadow:
    0 0 10px ${buttonColorWhite},
    0 0 20px ${buttonColorWhite},
    0 0 30px ${buttonColorMain},
    0 0 40px ${buttonColorMain};
  ${'' /* text-shadow: 1px 1px ${buttonColorDark}; */}

  &:hover {
    background: ${buttonColorLight};
    color: ${buttonColorMain};
    border-color: ${buttonColorMain};
    box-shadow:
    0 0 10px ${buttonColorLight},
    0 0 20px ${buttonColorLight};
    ${'' /* text-shadow: 1px 1px ${buttonColorLight}; */}
  }
`

export const TextInput = styled.input`
  text-align: center;
  font-size: 22px;
  font-family: alice;
  color: white;
  transition: all .3s ${EASE_OUT};
  flex: 1 0 auto;
  height: 100%;
  border: 2px solid transparent;
  border-bottom-color: ${p => p.theme.veryLight};
  padding: 10px;
  background: ${p => p.theme.veryDark};

  ::placeholder, ::-webkit-input-placeholder {
    color: white;
    opacity: .8;
  }

  &:hover {
    opacity: 1;
  }

  &:focus {
    opacity: 1;
    outline: none;
    border-color: ${p => p.theme.semiWhite};
  }
`

export const Image = styled.img`
  cursor: pointer;
  transition: all .2s ${EASE_OUT};

  &:not(.basic) {
    border-radius: 10px;
    box-shadow: ${p => p.theme.shadowHeavy};
    border: 2px solid ${p => trans(.5, p.theme.veryLight)};

    &:hover {
      transform: scale(1.03);
      box-shadow: ${p => p.theme.shadowVeryHeavy};
      transition: all .5s ${EASE_OUT};
    }
    &:active {
      transform: scale(.99);
      box-shadow: ${p => p.theme.shadowMedium};
      transition: all .5s ${EASE_OUT};
    }
  }
`

export const ArticleText = styled.div`
  font-size: 18px;
  color: white;
  cursor: text;
`

export const HiddenFileInput = styled.input.attrs({
  type: 'file',
})`
  visibility: hidden;
  position: absolute;
`

export const MaskAbsoluteFillParent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${p => trans(.3, p.theme.veryDark)};
  z-index: 60;
  pointer-events: ${p => p.show? 'all' : 'none'};
  opacity: ${p => p.show? 1 : 0};
  transition: all .3s ${EASE_OUT};

  &.show {
    opacity: 1;
    pointer-events: all;
  }

  i {
    font-size: 100px;
  }
`

export const CloseButton = styled(Boto)`
  position: fixed;
  top: 15px;
  right: 15px;
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
  z-index: 5;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  box-shadow: ${p => p.theme.shadowMedium};
  transition: all .5s ${EASE_OUT};

  i {
    font-size: 30px;
  }
`

export const CloseButtonActiveStyles = css`
  transform: none;
  opacity: 1;
  pointer-events: all;
`

export const SectionHeader = styled(Flex)`
  flex: 1 0 100%;
  position: relative;
  justify-content: center;
  align-self: center;
  margin: 0 0 20px;
  width: 100%;

  div {
    background: ${p => p.theme.flikDark};
    border: 1px solid ${p => p.theme.flikSemiLight};
    border-radius: 10px;
    padding: 5px 20px;
    font-family: playfair display;
    font-size: 22px;
    color: ${p => p.theme.flikSemiLight};
    text-transform: uppercase;
    z-index: 1;
    box-shadow: ${p => p.theme.shadowHeavy};
    user-select: none;
  }

  hr {
    position: absolute;
    top: 50%;
    border-color: ${p => p.theme.flikSemiLight};
    width: 100%;
    margin: -1px 0 0;
    box-shadow: ${p => p.theme.shadowHeavy};
  }
`

export const ExpandingBackgroundSize = Math.max(window.innerWidth, window.innerHeight)
export const ExpandingBackground = styled(Flex)`
  background: ${p => p.theme.gradientVeryDark};
  box-shadow: ${p => p.theme.shadowMedium};
  position: fixed;
  height: ${ExpandingBackgroundSize}px;
  width: ${ExpandingBackgroundSize}px;
  z-index: 2;
  border: 2px solid ${p => p.theme.veryLight};
  border-radius: 100%;
  transform: scale(0);
  transition: all .5s ${EASE_OUT};
  pointer-events: none;

  ${p => p.rightCorner && css`
    top: 0;
    right: 0;
    transform: translate(50%, -50%) scale(0);
  `}
  ${p => p.leftCorner && css`
    top: 0;
    left: 0;
    transform: translate(-50%, -50%) scale(0);
  `}
`
export const ExpandingBackgroundRightActiveStyles = css`
  transform: translate(50%, -50%) scale(3);
  transition: all 1s ${EASE_OUT};
`
export const ExpandingBackgroundLeftActiveStyles = css`
  transform: translate(-50%, -50%) scale(3);
  transition: all 1s ${EASE_OUT};
`

export const BlurbBubble = styled(Flex)`
  position: relative;
  flex: 0 0 200px;
  height: 200px;
  border-radius: 100%;
  border: 1px solid ${p => p.theme.veryLight};
  background: ${p => p.theme.veryDark};
  box-shadow: ${p => p.theme.shadowVeryHeavy};
  z-index: 2;
  justify-content: center;
  align-items: center;
  ${p => p.src? `
    background: url('${p.src}');
  ` : ''}

  i {
    font-size: 40px;
    color: ${p => p.theme.veryLight};
  }

  opacity: 0;
  transform: scale(0);
  transition: all .5s ${EASE_OUT};
`

export const BlurbContent = styled(Flex)`
  flex-direction: column;
  align-items: center;
`

export const BlurbButton = styled(Boto)`
  flex: 0 0 80px;
  width: 100%;
  box-shadow: ${p => p.theme.shadowMedium};
  z-index: 1;

  transform: scaleX(0);
  transform-origin: left center;
  opacity: 0;
  transition: all .5s ${EASE_OUT};
`

export const BlurbText = styled(Flex)`
  border-radius: 10px;
  border: 1px solid ${p => p.theme.veryLight};
  box-shadow: ${p => p.theme.shadowMedium};
  background: ${p => p.theme.veryDark};
  color: ${p => p.theme.veryLight};
  text-align: center;
  width: 85%;
  margin-top: -10px;
  font-size: 20px;
  font-family: im fell dw pica;
  padding: 20px;

  transform: scaleY(0);
  transform-origin: center top;
  opacity: 0;
  transition: all .5s ${EASE_OUT};
`

export const WidgetRoot = styled(FlexColumn)`
  z-index: 0;
  align-items: center;
  justify-content: center;
  flex: 1 0 50%;
  padding: 0 10px 80px;
  position: relative;
`

export const BeggingButton = styled(Boto)`
  flex: 0 0 50px;
  width: 200px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  transform: rotate(-4deg);
  margin: 15px 0 0;
  box-shadow: ${p => p.theme.shadowHeavy};
`

export const CornerWorldRoot = styled(AbsoluteFlexFillParent)`
  z-index: 6;
  pointer-events: none;
  justify-content: center;
  overflow: hidden;
`
export const CornerWorldRootActiveStyles = css`
  overflow: initial;
  pointer-events: all;
`

export const CornerWorldContentRoot = styled(Flex)`
  position: relative;
  max-width: 740px;
  flex: 0 1 100%;
  flex-direction: column;
  z-index: 4;
  justify-content: flex-start;
  padding: 190px 10px 50px;
  align-self: flex-start;
`

export const CornerEntryButton = styled(Boto)`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 100%;
  width: 250px;
  height: 250px;
  flex-direction: column;
  font-size: 24px;
  transition-duration: .5s;
  pointer-events: all;
  box-shadow: ${p => p.theme.shadowHeavy};
  z-index: 3;

  ${p => p.right?
  css`
    padding: 80px 90px 0 0;
    right: 0;
    transform: translate(50%, -50%);

    ${screen.medium`
      transform: translate(50%, -50%) scale(.7);
    `}
    ${screen.medsmall`
      transform: translate(50%, -50%) scale(.6);
    `}
  ` :
  css`
    padding: 80px 0 0 90px;
    left: 0;
    transform: translate(-50%, -50%);

    ${screen.medium`
      transform: translate(-50%, -50%) scale(.7);
    `}
    ${screen.medsmall`
      transform: translate(-50%, -50%) scale(.6);
    `}
  `}

  i {
    height: 50px;
    position: relative;
    top: 25px;
    transition: top, height;
    transition-duration: .5s;
  }
`

export const CornerEntryButtonActiveStyles = css`
  top: 15px;
  padding: 0;
  width: 150px;
  height: 150px;
  pointer-events: none;
  background: ${p => p.theme.veryLight};
  border-color: ${p => p.theme.slightlyDark};
  color: ${p => p.theme.slightlyDark};

  ${p => p.right?
  css`
    right: 50%;
    transform: translate(50%, 0) rotate(360deg);
  ` :
  css`
    left: 50%;
    transform: translate(-50%, 0) rotate(360deg);
  `}

  i {
    top: 0;
    height: 35px;
    transition: top, height;
  }
`

// ------------------------------------- old styles below

export const Header = styled.div`
  position: relative;
  z-index: 1;
  font-family: life savers;/*love ya like a sister;*/
  font-size: 60px;
  text-align: center;
  color: white;
  text-shadow: 2px 1px rgba(130,39,90,1);
  margin: 0 auto 30px;
  display: table;
  padding: 0 10px;

  @media(max-width: ${SCREEN_WIDTH_M_PX}) {
    font-size: 32px;
    padding-top: 15px;
  }
`

export const CatchLine = styled(Header)`
  font-size: 54px;
  display: table;
  margin-bottom: 0px;
`

export const SweetTalk = styled.div`
  font-size: 24px;
  font-family: annie use your telescope;
  text-align: center;
  margin-bottom: 35px;
  margin-top: -5px;
  position: relative;
  padding: 0 10px;

  @media(max-width: 544px) {
    font-size: 20px;
  }
`

export const Root = styled.div`
  position: relative;
  background-size: cover;
  background-attachment: fixed;
`

export const ContentArea = styled.div`
  width: 100%;
  padding: 20px 0;

  @media(max-width: 544px) {
    position: relative;
    padding: 15px 0;
  }
`

export const ToolBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 3;
  width: 100%;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  background: linear-gradient(to bottom, transparent 0%, ${p => p.themeColor} 100%);
  pointer-events: none;
  transition: all 1s ${EASE};
  font-family: annie use your telescope;

  & > * {
    flex: 1 0 0;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    flex-direction: column-reverse;
  }
`

export const ToolBarItem = styled.div`
  position: relative;
  color: white;
  padding: 20px 10px;
  cursor: pointer;
  font-size: 32px;
  transition: all .4s ${EASE_OUT};
  font-family: annie use your telescope;
  text-align: center;

  div {
    position: relative;
    z-index: 3;
    transition: all .4s ${EASE_OUT};
    text-shadow: 1px 1px ${p => darken(.2, p.themeColor)};
    user-select: none;
  }

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent 0%, ${p => trans(.3, p.themeColor)} 50%, transparent 100%);
    transition: all .2s ${EASE_OUT};
    content: ' ';
    transform: translateY(10px);
    z-index: 1;
    opacity: 0;
    border-top: 1px solid ${p => trans(.2, p.themeColor)};
  }

  &:hover {
    &:after {
      transform: none;
      opacity: 1;
      transition-duration: .4s;
    }
    div {
      transform: scale(1.05);
      letter-spacing: 1px;
      transition: all 5s cubic-bezier(0.39, 0.575, 0.565, 1);
    }
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    font-size: 24px;
    padding: 10px;
  }
`
