import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE_IN_OUT_SINE} from '../../global/constants'
import {ToolBar, ToolBarItem} from '../../global/styled'

const aColor = '#498359'

injectGlobal`

`
export const Page = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${'' /* &.hello-exit {
    opacity: 0;
    transform: scale(2);
    transition: opacity 2s, transform 3s;
    transition-timing-function: ${EASE_OUT};
  } */}
`

export const Background = styled.div`
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('${p => p.src}');
  background-attachment: fixed;
  background-size: cover;
  filter: blur(50px);
  transform: scale(1.2);
  transition: all 1s ${EASE_IN_OUT_SINE};

  &:before {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    content: ' ';
    background: radial-gradient(circle at center, transparent 0%, black 100%);
    opacity: 0;
    transition: all .5s ${EASE_OUT};
  }

  .videoEnter &, .videoFocused &, .videoReview &, .videoMakeScript & {
    &:before {
      opacity: 1;
      transition: all 4s linear;
    }
  }
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

  .video-header {
    flex: 0 0 auto;
    text-shadow: 1px 1px ${p => darken(.2, p.themeColor)};
    width: 100%;
    padding: 10px 0 20px;
    margin: 0;
    background: linear-gradient(to bottom, ${p => alpha(.3, p.themeColor)} 0%, transparent 100%);

    .videoReview &, .videoMakeScript &, {
      opacity: 1;
      transform: none;
      transition: all 1s ${EASE_IN_OUT_SINE};
    }

    &, .videoExit & {
      opacity: 0;
      transform: translateY(-200px);
      transition: all 1s ${EASE_IN_OUT_SINE};
    }
  }
`

export const VideoRoot = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;

  .videoFocused &, .videoReview &, .videoMakeScript & {
    opacity: 1;
    transition: all 3s ${EASE_OUT};
  }
  .videoReview &, .videoMakeScript & {
    transform: scale(.8) translateY(-50px);
    transition: all 1s ${EASE_IN_OUT_SINE};
  }
`

export const ReviewTools = styled(ToolBar)`
  opacity: 0;
  transform: translateY(150px);

  .videoReview & {
    pointer-events: all;
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_IN_OUT_SINE};
  }
`

export const ReviewTool = styled(ToolBarItem)`

`

export const ScriptRoot = styled.div`
  z-index: 6;
  position: absolute;
  bottom: 0;
  height: 210px;
  width: 100%;
  display: flex;
  justify-content: center;
  transform: translateY(400px);
  opacity: 0;
  transition: all 1s ${EASE_OUT};

  .videoMakeScript & {
    opacity: 1;
    transform: translateY(10px);
    transition: all 2s ${EASE_IN_OUT_SINE} .5s;
  }
`

export const ScriptTextInput = styled.textarea`
  z-index: 5;
  position: relative;
  padding: 20px 25px;
  line-height: 34px;
  font-size: 22px;
  color: white;
  font-family: crete round;

  width: 70%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid ${p => lighten(.2, p.themeColor)};
  background: ${p =>  p.themeColor};
  resize: none;
  outline: none;
  transition: all 1s ${EASE_IN_OUT_SINE};

  &:focus {
    background: ${p => darken(.1, p.themeColor)};
  }
`

export const ScriptDoneButton = styled(ToolBarItem)`
  z-index: 4;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 220px;
`
