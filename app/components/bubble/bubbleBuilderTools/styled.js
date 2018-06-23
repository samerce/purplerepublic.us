import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_M,
} from '../../../global/constants'

const aColor = '#956C95'
const kBorderRadius = '10px'

export const Root = styled.div`
  transition: all .3s ${EASE_OUT};
  display: flex;
  z-index: 8;
  pointer-events: all;
  margin: 10px 0;
`

export const BuilderButton = styled.div`
  border-radius: ${kBorderRadius};
  border: 1px solid white;
  opacity: .8;
  color: white;
  transition: all .3s ${EASE_OUT};
  user-select: none;
  text-align: center;
  cursor: pointer;
  display: flex;
  width: 100%;

  &:hover {
    opacity: 1;
  }

  ${'' /* &:active {
    background: white;
    color: ${aColor};
    transform: scale(.97);
  } */}
`

export const BuilderInput = styled.input`
  text-align: center;
  font-size: 22px;
  font-family: annie use your telescope;
  color: white;
  transition: all .3s ${EASE_OUT};
  flex: 1 0 auto;
  height: 100%;
  border-bottom: 1px solid white;
  opacity: .9;
  padding: 5px;

  &:hover {
    opacity: 1;
  }

  &:focus {
    opacity: 1;
  }
`

injectGlobal`
  .bubbleBuilderInputGrouped {
    transition: all .3s ${EASE_OUT};

    &:not(:first-child) {
      border-left: 1px solid white;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      &:focus {
        border-color: ${aColor};
      }
    }
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .bubbleBuilderGroupedInputHide {
    flex: 0 0 1px;
    overflow: hidden;
  }
`
