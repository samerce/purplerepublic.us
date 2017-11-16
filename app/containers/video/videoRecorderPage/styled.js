import styled, {injectGlobal} from 'styled-components'
import {EASE_IN_OUT_SINE, EASE_OUT} from '../../../global/constants'
import {darken} from 'polished'

injectGlobal`
  @keyframes recordingBlink {
    0% {
      box-shadow: none;
    }
    100% {
      box-shadow: 0 0 90px red;
    }
  }
`

export const Root = styled.div`
  opacity: 0;
  transition: all .5s {EASE_OUT};
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transform: scale(1.1) translateY(-50px);
  pointer-events: none;

  .videoMakeVideoResponse &, {
    pointer-events: all;
    opacity: 1;
    transform: translateY(-50px);
    transition: all 1s ${EASE_IN_OUT_SINE} .3s;

    video {
      opacity: 1;
      transform: none;
      position: absolute;
      transition: all 1s ${EASE_IN_OUT_SINE} .6s;
      border-radius: 5px;

      &.hide {
        pointer-events: none;
        opacity: 0;
        transform: scale(.9);
        transition: all 1s ${EASE_OUT};
      }
      &.recording {
        animation-name: recordingBlink;
        animation-duration: 1s;
        animation-timing-function: ${EASE_IN_OUT_SINE};
        animation-iteration-count: infinite;
        animation-direction: alternate;
      }
      &.paused {
        box-shadow: 0 0 20px ${p => p.themeColor};
      }
    }
  }
  video {
    opacity: 0;
    transform: scale(.9);
    transition: all .5s ${EASE_OUT};
  }

  .recorder {
    opacity: 0;
    pointer-events: none;
    transition: all .5s ${EASE_OUT};
    position: absolute;

    &.show {
      position: relative;
      opacity: 1;
      pointer-events: all;
      transition: all 1s ${EASE_IN_OUT_SINE};
    }
  }
`

export const VideoRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 3;
`
