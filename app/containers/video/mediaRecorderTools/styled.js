import styled, {injectGlobal} from 'styled-components'
import {EASE_IN_OUT_SINE, EASE_OUT} from '../../../global/constants'
import {darken} from 'polished'

export const Root = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 60px;
  transition: all .5s ${EASE_OUT};
  pointer-events: none;

  &.show {
    pointer-events: all;
    transform: none;
    transition: all 1s ${EASE_IN_OUT_SINE};
  }
`

export const MediaRecorderTool = styled.div`
  background: white;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .5s ${EASE_OUT};
  flex: 0 0 50px;
  margin: 0 10px;
  transform: scale(0);
  opacity: 0;
  position: relative;
  z-index: 3;
  pointer-events: none;
  font-size: 24px;

  .show & {
    pointer-events: all;
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_IN_OUT_SINE};
  }

  &:hover {
    background: red;
    transition: all 1s ${EASE_OUT};

    i {
      color: white;
      transition: all 1s ${EASE_OUT};
    }
  }
  &.hide {
    opacity: 0;
    transform: scale(0);
    transition: all .5s ${EASE_OUT};
    pointer-events: none;
    flex: 0 0 1px;
  }

  i {
    position: absolute;
    color: black;
    transition: all .5s ${EASE_IN_OUT_SINE};

    &.hide {
      transform: rotate(90deg) scale(0);
      opacity: 0;
      transition: all .5s ${EASE_OUT};
    }
  }

  .record-icon {
    color: red;

    &.hide {
      transform: scale(0);
    }
  }
`

export const StartOverTool = styled(MediaRecorderTool)`
  flex: 0 0 40px;
  height: 40px;
  font-size: 22px;

  &:hover {
    background: black;
  }
`

export const EndRecordingTool = styled(StartOverTool)`
  padding-left: 2px;
`
