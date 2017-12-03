import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE_IN_OUT_SINE} from '../../global/constants'

const easeInOutSine = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';
const aColor = '#498359'

injectGlobal`
  @keyframes spinning {
    0% {
      transform: rotate(180deg) scale(1.1);
    }
    50% {
      transform: rotate(270deg) scale(.9);
    }
    100% {
      transform: rotate(360deg) scale(1.1);
    }
  }

  @keyframes blinking {
    from {
      opacity: 1;
    }

    to {
      opacity: .3;
    }
  }

  @keyframes pointPulsing {
    from {
      transform: scale(1.3);
      background-color: black;
    }
    to {
      transform: scale(1.6);
      background-color: white;
    }
  }

`
export const Page = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  .bit-header, .bit-article-header {
    position: absolute;
    top: 0;
    left: 0;
    text-shadow: 1px 1px ${p => darken(.2, p.themeColor)};
    margin: 0;
    padding: 0 0 30px;
    width: 100%;
    background: linear-gradient(to top,
      transparent 0%, ${p => alpha(.3, p.themeColor)} 100%);
    pointer-events: none;
    z-index: 4;
    opacity: 0;
    transform: translateY(-250px);
    transition: all 1s ${easeInOutSine};
  }

  &.bitReview .bit-header, &.bitEdit .bit-header, &.bitDelete .bit-header,
  &.bitKeep .bit-header, &.readBitArticle .bit-article-header {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_IN_OUT_SINE} .5s;
  }

  &.readBitArticle .bit-article-header {
    transition-delay: 1.5s;
  }
`

export const Background = styled.div`
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('${p => p.src}');
  background-attachment: fixed;
  background-size: cover;
  transition: all 1s ${EASE_IN_OUT_SINE};

  .bitEnter &, .bitReview &, .bitEdit &, .bitDelete &, .bitKeep &, .readBitArticle &, .bitExit &, .bitMorePrompt &, .bitMoreTextEntry & {
    filter: blur(50px);
    transform: scale(1.2);
    transition: all 4s linear;
  }
`

export const BitBoxRoot = styled.div`
  z-index: 3;
  position: relative;
  margin: 200px auto 0;
  width: 90%;
  max-width: 800px;
  overflow: visible;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
`

export const BitBoxTextRoot = styled.div`
  position: relative;
  z-index: 4;
  width: 100%;
  max-height: 300px;
  border-radius: 5px;
  color: white;
  padding: 20px 20px 15px;
  font-size: 24px;
  overflow: scroll;
  pointer-events: none;
  transition: all 1s ${EASE_IN_OUT_SINE};

  .bitEdit &, .bitReview & {
    transition: all 1s ${EASE_IN_OUT_SINE};
  }
  .bitDelete & {
    transform: scale(0);
    opacity: 0;
    transition: opacity .5s, transform 1s;
    transition-timing-function: ${EASE_IN_OUT_SINE};
    transition-delay: .5s;
  }
  .bitKeep &, .readBitArticle &, .bitMorePrompt &, .bitMoreTextEntry & {
    transform: translateY(1000px);
    opacity: 0;
    transition: opacity .9s, transform 1s;
    transition-timing-function: ${EASE_IN_OUT_SINE};
    transition-delay: .5s;
  }
  .bitExit & {
    opacity: 0;
  }
`

export const BitBoxText = styled.textarea`
  resize: none;
  width: 100%;
  font-family: quattrocento;
  padding: 0;
  outline: none;

  .bitEdit & {
    pointer-events: all;
  }
`

const ToolBar = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 3;
  width: 100%;
  margin: 0 auto;
  display: flex;
  text-align: center;
  font-family: annie use your telescope;
  overflow: hidden;
  opacity: 1;
  pointer-events: none;
  padding-top: 10px;

  & > * {
    flex: 1 0 0;
  }
`

export const ReviewTools = styled(ToolBar)`
  .bitReview & {
    pointer-events: all;
  }
`

export const EditTools = styled(ToolBar)`
  .bitEdit & {
    pointer-events: all;
  }
`

export const ToolBarItem = styled.div`
  position: relative;
  color: white;
  padding: 20px 10px;
  cursor: pointer;
  font-size: 32px;
  transition: all .4s ${EASE_OUT};
  opacity: 0;
  transform: translateY(-70px);
  z-index: 3;

  div {
    position: relative;
    z-index: 6;
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
    background: linear-gradient(to right, transparent 0%, ${p => alpha(.3, p.themeColor)} 50%, transparent 100%);
    transition: all .2s ${EASE_OUT};
    content: ' ';
    transform: scale(.9);
    z-index: 5;
    opacity: 0;
    border-radius: 20px;
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
`

export const ReviewTool = styled(ToolBarItem)`
  .bitReview & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_IN_OUT_SINE} .4s;
  }
`

export const EditTool = styled(ToolBarItem)`
  .bitEdit & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_IN_OUT_SINE} .4s;
  }
`

export const DoneEditingButton = styled(ToolBarItem)`
  text-align: center;
  font-family: annie use your telescope;
  bottom: 0;
  position: absolute;
  width: 100%;
  transform: translateY(100px);
  background: linear-gradient(to bottom,
    transparent 0%, ${p => alpha(.3, p.themeColor)} 100%);

  .bitReview &.show {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_IN_OUT_SINE} .4s;
  }
  &:after {
    background: linear-gradient(to right, transparent 0%, ${p => alpha(.1, p.themeColor)} 50%, transparent 100%);
  }
`

export const BitArticleRoot = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  justify-content: center;
  pointer-events: none;

  .readBitArticle & {
    pointer-events: all;
  }
`

export const BitArticle = styled.div`
  flex: 0 0 90%;
  max-width: 850px;
  transform: translateY(150%);
  border: 1px solid ${p => lighten(.2, p.themeColor)};
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: none;
  background: ${p => p.themeColor};
  opacity: 0;
  color: white;
  font-family: quattrocento;
  font-size: 22px;
  line-height: 30px;
  padding: 25px 30px 20px;
  margin-top: 100px;
  overflow: scroll;
  transition: all 1s ${EASE_OUT};

  .readBitArticle & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_OUT} 1.2s;
  }
`

const BitArticleButton = styled.div`
  position: absolute;
  z-index: 5;
  font-family: annie use your telescope;
  font-size: 32px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  transition: all .5s ${EASE_OUT};
  width: 190px;
  cursor: pointer;
  opacity: 0;

  i {
    margin: 0 15px;
    font-size: 26px;
    transition: all .5s ${EASE_OUT};
  }

  &:after {
    width: 190px;
    height: 100%;
    content: ' ';
    position: absolute;
    top: 0;
    z-index: 3;
    transition: all .5s ${EASE_OUT};
  }
  div, i {
    position: relative;
    z-index: 4;
  }

  .readBitArticle & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_IN_OUT_SINE} 2s;

    &:hover {
      &:after {
        width: 250px;
        transition: all 1s ${EASE_IN_OUT_SINE};
      }
      i {
        transition: all 1s ${EASE_IN_OUT_SINE};
      }
    }
  }
`

export const MoreEditingButton = styled(BitArticleButton)`
  transform: translateX(-100%);
  left: 0;
  top: 180px;

  &:after {
    background: linear-gradient(to right,
      ${p => alpha(.2, p. themeColor)} 0%, transparent 100%);
  }
  &:hover i {
    margin-right: 20px;
  }
`

export const ContinueButton = styled(BitArticleButton)`
  transform: translateX(100%);
  right: 0;
  bottom: 180px;

  &:after {
    background: linear-gradient(to left,
      ${p => alpha(.2, p. themeColor)} 0%, transparent 100%);
  }
  &:hover i {
    margin-left: 20px;
  }
`

export const MoreBitsDialogue = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 8;

  .bitMorePrompt &, .bitMoreTextEntry & {
    pointer-events: all;
  }
`

export const MoreBitsContent = styled.div`
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid ${p => lighten(.1, p.themeColor)};
  background: ${p => p.themeColor};
  opacity: 0;
  transform: scale(0);
  transition: all .5s ${EASE_IN_OUT_SINE};

  .bitMorePrompt &, .bitMoreTextEntry & {
    opacity: 1;
    transform: none;
  }
`

const MoreBitsButton = styled(BitArticleButton)`
  position: relative;
  .bitMorePrompt &, .bitMoreTextEntry & {
    opacity: 1;
  }
`

export const MoreBitsContinue = styled(MoreBitsButton)`
  flex: 1 0 auto;
  width: auto;
  border-bottom: 1px solid white;
`

export const MoreBitsNewText = styled(MoreBitsButton)`
  flex: 1 0 auto;
  width: auto;

  .bitMoreTextEntry & {
    display: none;
  }
`

export const MoreBitsTextEntry = styled.div`
  flex: 1 0 auto;
  width: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;

  .bitMorePrompt & {
    display: none;
  }

  .newBitsInput {
    background: ${p => lighten(.1, p.themeColor)};
    font-size: 16px;
    margin: 10px;
    width: auto;
    padding: 5px;
    height: 40px;
    border-radius: 5px;
    color: white;
    font-family: quattrocento;
  }
`

export const BitBoxSubmit = styled(MoreBitsButton)`
  width: auto;
`

export const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  transition: all 1.9s ${easeInOutSine};

  &.show {
    opacity: .7;
    transition: all 1s ${easeInOutSine};
  }
`

export const Spinner = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    z-index: 8;
    color: white;
    font-size: 20px;
    opacity: 0;
    transform: scale(2);
    transition: all 1s ${EASE_OUT};
    pointer-events: none;

    &.big {
      font-size: 52px;
    }
    &.opaque {
      background: ${p => p.themeColor};
    }
    &.show {
      opacity: 1;
      transform: none;
      transition: all 1s ${easeInOutSine};
      pointer-events: all;
    }

    i {
      animation-duration: 1s;
      animation-name: spinning;
      animation-iteration-count: infinite;
      animation-timing-function: ${easeInOutSine};
      flex: 0 0 auto;
      color: inherit;
      font-size: inherit;
    }
    span {
      animation-duration: 1s;
      animation-name: blinking;
      animation-iteration-count: infinite;
      animation-timing-function: ${easeInOutSine};
      animation-direction: alternate;
    }
`
