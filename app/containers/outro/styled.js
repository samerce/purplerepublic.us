import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE_IN_OUT_SINE} from '../../global/constants'
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

  &.outro-enter {
    .product-link {
      &.left, &.right {
        opacity: 1;
        transform: none;
        transition: all .5s ${EASE_IN_OUT_SINE} 1.5s;
      }
    }
  }

  .product-link {
    opacity: 0;
    transition: all .5s ${EASE_IN_OUT_SINE} 1.5s;

    &.left {
      transform: translateX(-200px);
    }
    &.right {
      transform: translateX(200px);
    }
  }
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
      transition: all 1s ${EASE_IN_OUT_SINE} 0s;
    }

    &, .outro-exit & {
      opacity: 0;
      transform: translateY(-200px);
      transition: all 1s ${EASE_IN_OUT_SINE};
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
  animation-timing-function: ${EASE_IN};

  img {
    width: 100%;
  }

  &.product-left {
    left: 50px;
    animation-name: vying1;
    animation-duration: 5s;
  }
  &.product-right {
    right: 50px;
    animation-name: vying2;
    animation-duration: 7s;
    transform: translateX(200px);
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
  animation-timing-function: ${EASE_IN_OUT_SINE};
  animation-iteration-count: infinite;
  animation-direction: alternate;
  text-shadow: 1px 1px rgba(0,0,0,.5);

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
`

export const ReachUs = styled.div`
  display: flex;
  align-items: center;
`

export const ShopUs = styled.div`
  display: flex;
  align-items: center;
  width: 530px;
`

export const SocialIcon = styled.i`
  font-size: 50px;
  padding: 15px;
  color: inherit;

  &.i1 {
   font-size: 50px;
 }
 &.i5 {
   font-size: 50px;
 }
  &.i4 {
    font-size: 50px;
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
`

const IconRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  flex: 1 0 auto;
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
`

export const ShopText = styled(SocialText)`
  margin-left: -12px;
`

export const ShopIcons = styled(IconRoot)`
  padding-left: 15px;
`

export const ReachText = styled(SocialText)`
  margin-right: 10px;
`

export const ReachIcons = styled(IconRoot)`
`

export const FundText = styled(SocialText)`
  margin: 0 24px 0 30px;
`

export const FundIcons = styled(IconRoot)`
  cursor: pointer;

  object {
    width: 50px;
    pointer-events: none;
  }
`

export const KeepPlayingToolbar = styled(ToolBar)`
  pointer-events: all;
  opacity: 0;
  transform: translateY(200px);

  .outro-enter & {
    opacity: 1;
    transform: none;
  }
`

export const KeepPlayingToolbarItem = styled(ToolBarItem)`

`

export const Finality = styled.div`
  position: relative;
  width: 100%;
  z-index: 3;
  margin: 300px 0 0;
  font-family: quattrocento;
  font-size: 20px;
  opacity: 0;
  transform: translateY(50px);

  .outro-enter & {
    transform: none;
    opacity: 1;
    transition: all .7s ${EASE_IN_OUT_SINE} 1.3s;
  }
`

export const FinalWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 290px;
  position: relative;

  .final-word-content {
    overflow: scroll;
    height: 100%;
    width: 60%;
    background: ${p => alpha(.3, p.themeColor)};
    border-radius: 3px;
    padding: 15px 20px;
    color: white;
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
`

export const FeedbackArea = styled.div`
  width: 60%;
  position: relative;

  &:hover textarea {
    box-shadow: 2px 2px 20px rgba(0,0,0,.3);
    background: ${p => alpha(.3, p.themeColor)};
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