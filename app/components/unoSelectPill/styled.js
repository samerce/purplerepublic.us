import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  EASE_SINE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_S_PX,
} from '../../global/constants'

const aColor = '#956C95'

injectGlobal`
  .unoOptSelected {

  }
`

export const Root = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  display: flex;
  padding: 5px;
  border-radius: 50px;
  border: 1px solid white;
  z-index: 40;
  transform: translateX(-50%);
`

export const OptionRoot = styled.div`
  padding: 5px 20px;
  cursor: pointer;
  text-transform: uppercase;
  font-family: annie use your telescope;
  position: relative;
  color: white;
  font-size: 24px;
  transition: all .3s ${EASE_OUT};
  user-select: none;

  &.unoOptSelected {
    color: ${aColor};
  }
`

export const Indicator = styled.div`
  border-radius: 50px;
  background: white;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  transform: scaleX(0);
  transition: all .3s ${EASE_OUT};

  .unoOptSelected & {
    opacity: .9;
    transform: scaleX(1);
    transition: all .5s ${EASE_OUT};
  }
`

export const OptionText = styled.div`
  position: relative;
  z-index: 5;
  padding: 3px;
`
