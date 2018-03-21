import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
  SCREEN_WIDTH_M,
} from '../../global/constants'
import {ToolBar, ToolBarItem} from '../../global/styled'

const aColor = '#498359'

const getRandInt = range => Math.ceil(Math.random() * range)
const getRand = range => `${getRandInt(range)}`
const vyingBuilder = () => `
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

injectGlobal`
  @keyframes vying1 {
    ${vyingBuilder()}
  }
  @keyframes vying2 {
    ${vyingBuilder()}
  }
  @keyframes pointingLeft {
    0% {
      transform: none;
    }
    100% {
      transform: rotate(-5deg) translateX(-10px) scale(1.1);
    }
  }
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
  filter: blur(10px);
  transform: scale(1.2);
`

export const HeaderRoot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 3;

  .outro-header {
    flex: 0 0 auto;
    text-shadow: 1px 1px ${darken(.2, aColor)};
    width: 100%;
    height: 30px;
    padding: 15px 0;
    margin: 0;
    background: linear-gradient(to top,
      transparent 0%, ${p => alpha(.3, p.themeColor)} 100%);

    .outro-enter & {
      opacity: 1;
      transform: none;
      transition: all 1s ${EASE} 0s;
    }

    &, .outro-exit & {
      opacity: 0;
      transform: translateY(-200px);
      transition: all 1s ${EASE};
    }
  }
`

export const Product = styled.div`
  width: 100px;
  position: absolute;
  top: 140px;
  z-index: 4;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ${EASE};
  transition: all 1s ${EASE} 1.5s;

  img {
    width: 100%;
  }

  &.product-left {
    left: -250px;
    animation-name: vying1;
    animation-duration: 5s;

    .outro-enter & {
      left: 50px;
    }
  }
  &.product-right {
    right: -250px;
    animation-name: vying2;
    animation-duration: 7s;
    transform: translateX(200px);

    .outro-enter & {
      right: 50px;
    }
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    top: 10px;
    width: 50px;

    &.product-left {
      left: 10px;
    }
    &.product-right {
      right: 10px;
    }
  }
`

export const Callout = styled.div`
  position: absolute;
  z-index: 4;
  width: 150px;
  top: 110px;
  left: 180px;
  font-family: annie use your telescope;
  font-size: 18px;
  color: white;
  animation-name: pointingLeft;
  animation-duration: 1s;
  animation-timing-function: ${EASE};
  animation-iteration-count: infinite;
  animation-direction: alternate;
  text-shadow: 1px 1px rgba(0,0,0,.5);
  opacity: 0;

  .outro-enter & {
    opacity: 1;
    transition: opacity .5s ${EASE} 2s;
  }

  span {
    display: inline-block;
    transform: rotate(200deg);
    padding-left: 5px;
  }

  &.callout-right {
    top: 165px;
    right: 140px;
    left: initial;
    animation-duration: 1.3s;

    span {
      transform: rotate(-10deg);
    }
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    display: none;
  }
`

export const SocialNetworksRoot = styled.div`
  position: absolute;
  top: 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 3;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(20px);

  .i8 {
    height: 60px;
    padding: 0 0 0 15px;
  }

  img {
    height: 50px;
  }

  .outro-enter & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_OUT} 1s;
  }
  a {
    color: white;
    transition: all .3s ${EASE_OUT};

    &:hover, &:active {
      color: ${p => p.themeColor};
    }
    &:active {
      transform: scale(.9);
    }
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    width: 100%;

    .i8, .i11 {
      height: 40px;
      padding: 0 0 0 8px;
      vertical-align: middle;
    }
  }
`

const SocialSectionRoot = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    width: 100%;
    text-align: center;
  }
`

export const ReachUs = styled(SocialSectionRoot)`

`

export const ShopUs = styled(SocialSectionRoot)`
  width: 530px;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    width: 100%;
  }
`

export const SocialIcon = styled.i`
  font-size: 50px;
  padding: 15px;
  color: inherit;

  &.i4 {
    line-height: 50px;
    padding: 10px;
  }
  &.i6 {
    font-size: 46px;
  }
  &.i7 {
    font-size: 46px;
  }
  &.i9 {
    margin-left: 12px;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    font-size: 40px;
    padding: 8px;

    &.i6, &.i7 {
      font-size: 38px;
    }
    &.i4 {
      font-size: 34px;
    }
  }
`

const IconRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  flex: 1 0 auto;

  object {
    pointer-events: none;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    position: absolute;
    transition: all .5s ${EASE_OUT};
    width: 100%;
    ${'' /* pointer-events: ${p => p.visible? 'all' : 'none'};
    opacity: ${p => p.visible? 1 : 0}; */}
    pointer-events: all;
    opacity: 1;
  }
`
const SocialText = styled.div`
  font-size: 28px;
  font-family: life savers;
  background: ${p => alpha(.3, p.themeColor)};
  color: white;
  font-weight: bold;
  flex: 0 0 auto;
  padding: 5px 10px;
  border-radius: 3px;
  pointer-events: none;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    ${'' /* pointer-events: all;
    border-radius: 0;
    font-family: annie use your telescope;

    &.hidden {
      color: ${p => p.themeColor};
    } */}
    color: ${p => alpha(.3, p.themeColor)};
  }
`

export const ShopText = styled(SocialText)`
  margin-left: -12px;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    flex: 1 0 50%;
  }
`

export const ShopIcons = styled(IconRoot)`
  padding-left: 15px;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    width: 50%;
    padding: 0 5px;
  }
`

export const ReachText = styled(SocialText)`
  margin-right: 10px;
  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    flex: 1 0 100%;
  }
`

export const ReachIcons = styled(IconRoot)`
  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    padding: 0 5px;
  }
`

export const FundText = styled(SocialText)`
  margin: 0 24px 0 30px;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    flex: 1 0 50%;
    margin: 0;
  }
`

export const FundIcons = styled(IconRoot)`
  cursor: pointer;

  object {
    width: 50px;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    width: 50%;
    padding: 0 5px;
    margin-left: 50%;
  }
`

export const KeepPlayingToolbar = styled(ToolBar)`
  pointer-events: none;
  opacity: 0;
  transform: translateY(200px);
  z-index: 6;

  .outro-enter & {
    ${p => (p.visible || window.innerWidth > SCREEN_WIDTH_M) && `
      opacity: 1;
      transform: none;
      pointer-events: all;
    `}
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    padding-top: 350px;
  }
`

export const KeepPlayingToolbarItem = styled(ToolBarItem)`
  @media (min-width: ${SCREEN_WIDTH_M_PX}){
    &.never-mind-button {
      display: none;
    }
  }
`

export const KeepPlayingButton = styled(ToolBarItem)`
  background: linear-gradient(to bottom,
transparent 0%, ${p => alpha(.3, p.themeColor)} 100%);
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 80px;
  line-height: 80px;
  padding: 0;
  opacity: 0;
  transform: translateY(100px);
  transition: all .5s ${EASE_OUT};
  position: relative;
  z-index: 6;

  .outro-enter & {
    opacity: 1;
    transform: none;
    transition-delay: 1.5s;

    &.hidden {
      opacity: 0;
      transform: translateY(100px);
      pointer-events: none;
      transition-delay: 0s;
    }
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    padding: 0;
  }

  @media (min-width: ${SCREEN_WIDTH_M_PX}) {
    display: none;
  }
`

const FINAL_WORD_MARGIN_TOP = 290
export const Finality = styled.div`
  position: relative;
  width: 100%;
  z-index: 6;
  margin: ${FINAL_WORD_MARGIN_TOP}px 0 0;
  font-family: quattrocento;
  font-size: 20px;
  opacity: 0;
  transform: translateY(50px);

  .outro-enter & {
    transform: none;
    opacity: 1;
    transition: all .7s ${EASE} 1.3s;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    overflow: scroll;
    height: ${window.innerHeight - FINAL_WORD_MARGIN_TOP - 80}px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const FinalWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 290px;
  position: relative;
  flex-direction: column;

  .final-word-content {
    overflow: scroll;
    height: 100%;
    width: 60%;
    background: ${p => alpha(.3, p.themeColor)};
    border-radius: 3px;
    padding: 15px 20px;
    color: white;

    @media (max-width: ${SCREEN_WIDTH_M_PX}) {
      width: ${window.innerWidth + 20}px;
      height: initial;
      overflow: unset;
      flex: 1 0 auto;
      margin-left: 10px;
      padding-right: 25px;
      font-size: 18px;
    }
  }
  .read-more-indicator {
    position: absolute;
    right: 20%;
    bottom: 10px;
    width: 20px;
    height: 20px;

    i {
      position: absolute;
      font-size: 18px;
      opacity: .6;
      color: white;
    }
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    flex: 0 0 auto;
    height: initial;

    .read-more-indicator {
      display: none;
    }
  }
`

export const FinalFeedback = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  textarea {
    background: ${p => alpha(.5, p.themeColor)};
    outline: none;
    border-radius: 3px;
    border: 1px solid ${alpha(.2, 'white')};
    display: inline-block;
    width: 100%;
    padding: 15px 80px 15px 15px;
    font-family: inherit;
    transition: all .2s ${EASE_OUT};
    color: white;

    &:focus {
      box-shadow: 2px 2px 10px rgba(0,0,0,.3);
      background: ${p => alpha(.1, p.themeColor)} !important;
    }
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    flex: 0 0 auto;

    textarea {
      width: ${window.innerWidth - 20}px;
    }

    textarea:focus {
      position: fixed;
      top: 100px;
      left: 10px;
      height: 200px;
      z-index: 10;
    }
  }
`

export const FeedbackArea = styled.div`
  width: 60%;
  position: relative;

  &:hover textarea {
    box-shadow: 2px 2px 20px rgba(0,0,0,.3);
    background: ${p => alpha(.3, p.themeColor)};
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    width: 100%;
  }
`

export const SendFeedback = styled.div`
  z-index: 4;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-64%);
  padding: 5px 15px;
  font-size: 20px;
  font-family: annie use your telescope;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid transparent;
  transition: all .3s ${EASE_OUT};
  user-select: none;
  font-weight: bold;
  color: white;

  &:hover {
    border-color: white;
  }
  &:active {
    background: white;
    color: black;
  }
`
