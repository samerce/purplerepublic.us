import styled, {injectGlobal} from 'styled-components'
import {EASE, EASE_OUT} from '../../../global/constants'
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

  .videoMakeAudioResponse & {
    pointer-events: all;
    opacity: 1;
    transform: translateY(-50px);
    transition: all 1s ${EASE} .3s;

    &.recording {
      animation-name: recordingBlink;
      animation-duration: 1s;
      animation-timing-function: ${EASE};
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
  }

  .recorder {
    opacity: 0;
    pointer-events: none;
    transition: all .5s ${EASE_OUT};
    position: absolute;
    width: 100%;

    &.show {
      position: relative;
      opacity: 1;
      pointer-events: all;
      transition: all 1s ${EASE};
    }
  }

  .wavesurfer {
    opacity: 0;
    pointer-events: none;
    transform: scale(.9);
    transition: all .5s ${EASE_OUT};
    position: absolute;
    flex: 1 0 100%;

    &.show {
      position: relative;
      opacity: 1;
      transform: none;
      transition: all 1s ${EASE};
    }
  }
`
