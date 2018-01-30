import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE_IN_OUT_SINE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
} from '../../../global/constants'
import {ToolBar, ToolBarItem} from '../../../global/styled'
import {ScriptTextInput} from '../styled'

export const ResponseSummaryRoot = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 1;
  pointer-events: none;

  .videoResponseSummary & {
    pointer-events: all;
  }
`

export const ContentRoot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  z-index: 5;
  padding: 120px 30px 100px;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    overflow: scroll;
    height: ${window.innerHeight - 200}px;
    padding: 20px 10px;
    margin: 80px 0 120px;
  }
`

export const ContentRow = styled.div`
  flex: 0 0 auto;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 10px 0;
  transform: translateY(-20px);
  opacity: 0;
  transition: all .5s ${EASE_OUT};

  .videoResponseSummary & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_IN_OUT_SINE};
    transition-delay: ${p => .8 + p.delay + 's'};
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    margin-bottom: 15px;
    flex-direction: column;
  }
`

export const RichContent = styled.div`
  flex: 0 0 60%;

  &.video-content {
    height: 100%;

    video {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    &.audio-content {
      width: 100%;
    }
  }
`

export const ContentTools = styled.div`
  flex: 0 0 auto;
  display: flex;
`

export const ContentTool = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 26px;
  margin: 0 10px;
  cursor: pointer;
  font-family: annie use your telescope;

  i {
    margin: 0 10px;
  }
`

export const ResponseSummaryTools = styled(ToolBar)`
  z-index: 6;
  pointer-events: all;
  transform: translateY(150px);
  opacity: 0;
  transition: all .5s ${EASE_OUT};

  .videoResponseSummary & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_IN_OUT_SINE};
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    flex-direction: column;
  }
`

export const ResponseSummaryTool = styled(ToolBarItem)`

`

export const ScriptText = styled(ScriptTextInput)`
  transform: scale(.3);
  width: 100%;
  transition: all .5s ${EASE_OUT};

  &:hover {
    transform: translate(100px, -200px);
    transition: all .5s ${EASE_IN_OUT_SINE};
  }
  &:focus {
    background: ${p => p.themeColor};
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    &:hover {
      transform: none;
      position: fixed;
      top: 100px;
      bottom: 120px;
      height: ${window.innerHeight - 300}px !important;
      left: 10px;
    }
  }
`
