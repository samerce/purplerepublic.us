import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE_IN_OUT_SINE} from '../../global/constants'

const aColor = '#498359'

injectGlobal`

`
export const Page = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: url('https://s3.us-east-2.amazonaws.com/purplerepublic.us/commons/watts.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0;
  transform: scale(1.3);

  &.hello-enter {
    opacity: 1;
    transform: none;
    transition: opacity 1s, transform 1s;
    transition-timing-function: ${EASE_OUT};
  }

  &.hello-exit {
    opacity: 0;
    transform: scale(2);
    transition: opacity 2s, transform 3s;
    transition-timing-function: ${EASE_IN_OUT_SINE}
  }
`

export const HeaderRoot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 3;

  .hello-header {
    flex: 0 0 auto;
    text-shadow: 1px 1px ${darken(.2, aColor)};
    width: 100%;
    padding: 50px 0 20px;
    margin: 0;
    background: linear-gradient(to top, ${alpha(.3, 'black')} 0%, transparent 100%);
    opacity: 0;
    transform: translateY(200px);

    .hello-enter & {
      opacity: 1;
      transform: none;
      transition: all 3s ${EASE_IN_OUT_SINE} 0s;
    }
  }
`
