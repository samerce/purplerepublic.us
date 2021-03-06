import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
} from '../../global/constants'
import {
  ToolBar as ToolBarRaw, ToolBarItem as ToolBarItemRaw,
} from '../../global/styled'

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

    @media (max-width: ${SCREEN_WIDTH_M_PX}) {
      padding-top: 15px;
      font-size: 28px;
    }
  }

  &.bitReview .bit-header, &.bitEdit .bit-header, &.bitDelete .bit-header,
  &.bitKeep .bit-header, &.readBitArticle .bit-article-header {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE} .5s;
  }

  &.readBitArticle .bit-article-header {
    transition-delay: 1.5s;

    @media (max-width: ${SCREEN_WIDTH_M_PX}) {
      font-size: 24px;
    }
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
  transition: all 1s ${EASE};

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

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    width: ${window.innerWidth + 20}px;
    margin: 90px 0 0 -15px;
    padding-bottom: 60px;
  }
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
  transition: all 1s ${EASE};

  .bitEdit &, .bitReview & {
    transition: all 1s ${EASE_OUT};
  }
  .bitDelete & {
    transform: scale(0);
    opacity: 0;
    transition: opacity .5s, transform 1s;
    transition-timing-function: ${EASE};
    transition-delay: .5s;
  }
  .bitKeep &, .readBitArticle &, .bitMorePrompt &, .bitMoreTextEntry & {
    transform: translateY(1000px);
    opacity: 0;
    transition: opacity .9s, transform 1s;
    transition-timing-function: ${EASE};
    transition-delay: .5s;
  }
  .bitExit & {
    opacity: 0;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    padding: 20px 30px 15px;
    max-height: 250px;
    font-size: 18px;
  }
`

export const BitBoxText = styled.textarea`
  resize: none;
  width: 100%;
  padding: 0;
  outline: none;
  pointer-events: none;

  .bitEdit & {
    pointer-events: all;
  }
`

export const ToolBar = styled(ToolBarRaw)`
  background: none;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    flex-direction: row;
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

export const ToolBarItem = styled(ToolBarItemRaw)`
  opacity: 0;
  transform: translateY(-70px);
  z-index: 3;

  div {
    z-index: 6;
  }

  &:after {
    transform: scale(.9);
    z-index: 5;
    border: none;
  }
`

export const ReviewTool = styled(ToolBarItem)`
  .bitReview & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE} .4s;
  }
`

export const EditTool = styled(ToolBarItem)`
  .bitEdit & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE} .4s;
  }
`

export const DoneEditingButton = styled(ToolBarItem)`
  text-align: center;
  bottom: 0;
  position: absolute;
  width: 100%;
  transform: translateY(100px);
  background: linear-gradient(to bottom,
    transparent 0%, ${p => alpha(.3, p.themeColor)} 100%);

  .bitReview &.show {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE} .4s;
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
  font-size: 22px;
  line-height: 30px;
  padding: 25px 30px 70px;
  margin-top: 100px;
  overflow: scroll;
  transition: all 1s ${EASE_OUT};

  .readBitArticle & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_OUT} 1.2s;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    margin: 70px 0 150px -5px;
    padding:  15px 20px;
    flex: 0 0 ${window.innerWidth + 10}px;
    font-size: 16px;
    line-height: 24px;
    max-width: none;
    .bitExit & {
      z-index: 6;
    }
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
  user-select: none;

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
    transition: all 1s ${EASE} 2s;

    &:hover {
      &:after {
        width: 250px;
        transition: all 1s ${EASE};
      }
      i {
        transition: all 1s ${EASE};
      }
    }
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    width: 125px;
    font-size: 20px;
    height: 50px;

    i {
      font-size: 20px;
    }
  }
`

export const ContinueButton = styled(BitArticleButton)`
  z-index: 5;
  transform: translateX(100%);
  right: 0;
  bottom: 100px;

  &:after {
    background: linear-gradient(to left,
      ${p => alpha(.2, p. themeColor)} 0%, transparent 100%);
  }
  &:hover i {
    margin-left: 20px;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    width: 100%;
    bottom: 0;
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

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    top: initial;
    bottom: 80px;
  }
`

export const SubmitButton = styled(BitArticleButton)`
  transform: translateX(100%);
  right: 0;
  bottom: 180px;
  ${p => p.disabled && 'pointer-events: none'};

  &:after {
    background: linear-gradient(to left,
      ${p => alpha(.2, p. themeColor)} 0%, transparent 100%);
  }
  &:hover i {
    margin-left: 20px;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    bottom: 80px;
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
  transition: all .5s ${EASE};

  .bitMorePrompt &, .bitMoreTextEntry & {
    opacity: 1;
    transform: none;
  }
`

const MoreBitsButton = styled(BitArticleButton)`
  position: relative;
  flex: 1 0 auto;
  width: auto;

  .bitMorePrompt &, .bitMoreTextEntry & {
    opacity: 1;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    width: 100%;
  }
`

export const MoreBitsContinue = styled(MoreBitsButton)`
  border-bottom: 1px solid white;
`

export const MoreBitsNewText = styled(MoreBitsButton)`
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
  align-items: center;
  display: none;

  .bitMoreTextEntry & {
    display: initial;
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

    .bitMoreTextEntry & {
      pointer-events: all;
    }

    @media (max-width: ${SCREEN_WIDTH_M_PX}) {
      width: ${window.innerWidth - 20}px;
    }
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
