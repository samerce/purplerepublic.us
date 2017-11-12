import styled, {injectGlobal} from 'styled-components'
import {EASE_IN_OUT_SINE, EASE_OUT} from '../../../global/constants'

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

  .videoMakeVideoResponse &, .videoMakeAudioResponse & {
    pointer-events: all;
    opacity: 1;
    transform: translateY(-50px);
    transition: all 1s ${EASE_IN_OUT_SINE} .3s;

    video {
      opacity: 1;
      transform: none;
      position: absolute;
      transition: all 1s ${EASE_IN_OUT_SINE} .6s;

      &.hide {
        pointer-events: none;
        opacity: 0;
        transform: scale(.9);
        transition: all 1s ${EASE_OUT};
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

    &.audio {
      width: 100%;
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

export const MediaRecorderTools = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 60px;
  transition: all .5s ${EASE_OUT};

  .videoMakeVideoResponse &, .videoMakeAudioResponse & {
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

  .videoMakeVideoResponse &, .videoMakeAudioResponse & {
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
`
