import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  EASE_SINE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_S_PX,
} from '../../../global/constants'

const aColor = '#956C95'

export const Root = styled.div`
  position: absolute;
  z-index: 20;
  display: flex;
  align-items: center;
  transition: all .7s ${EASE_OUT};
  width: 100%;
  height: 100%;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 90px;
  overflow: scroll;
  pointer-events: all;
`

export const BubbleButtonRoot = styled.div`
  flex: 1 0 auto;
  padding: 250px 0 0;
  justify-content: flex-start;
  display: flex;
  z-index: 50;
`

export const BubbleButtonContent = styled.div`
  cursor: pointer;
  z-index: 40;
  overflow: hidden;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  border: 1px solid white;
  text-align: center;
  position: relative;
  align-self: flex-start;
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 30px;
    color: white;
  }

  .buttonContent {
    height: 100%;
  }
`

export const BubbleBuilderToolsRoot = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-bottom: 90px;
  flex: 1 0 auto;
  position: relative;
  z-index: 50;
`

export const BubbleButtonSizeSlider = styled.input`
  padding: 15px;
  flex: 0 0 auto;
  width: 150px;
  transform: rotate(-90deg);
  align-self: flex-start;
  transform-origin: right bottom;
  margin-left: -90px;
  margin-right: 20px;
  -webkit-appearance: none;
  height: 10px;
  border-radius: 20px;
  background: ${aColor};
  outline: none;
`

export const PublishMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,.5);
  z-index: 200;

  i {
    font-size: 100px;
  }
`
