import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE_IN_OUT_SINE} from '../../../global/constants'
import {ToolBar, ToolBarItem} from '../../../global/styled'
import {ScriptTextInput} from '../styled'

export const ResponseSummaryRoot = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  pointer-events: none;

  .videoResponseSummary & {
    opacity: 1;
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
`

export const ContentRow = styled.div`
  flex: 0 0 auto;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 10px 0;
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
`
