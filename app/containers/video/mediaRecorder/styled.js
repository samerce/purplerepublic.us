import styled, {injectGlobal} from 'styled-components'
import {EASE_IN_OUT_SINE, EASE_OUT} from '../../../global/constants'

injectGlobal`
  @keyframes hideShow {
    0% {
      transform: none;
    }

    50% {
      transform: scale(.9);
      opacity: 0;
    }

    100% {
      transform: none;
      opacity: 1;
    }
  }
`

export const Root = styled.div`
  opacity: 0;
  transition: all .5s {EASE_OUT};

  .videoMakeVideoResponse & {
    opacity: 1;
    transition: all 1s ${EASE_IN_OUT_SINE};
  }
  video {
    position: absolute;
    transition: all 1s ${EASE_IN_OUT_SINE} .6s;

    &.hide {
      opacity: 0;
      transform: scale(.9);
      transition: all 1s ${EASE_OUT};
    }
  }
`

export const VideoRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
