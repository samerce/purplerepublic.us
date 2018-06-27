import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
} from '../../../global/constants'

const aColor = '#956C95'
const borderRadius = 10
const kBoxShadow = '2px 2px 30px rgba(0,0,0,.3)'

injectGlobal`
  .event-brite-checkout {
  }
`

export const Root = styled.div`
  opacity: 0;
  pointer-events: none;
  transform: scale(0);
  transform-origin: center top;
  transition: opacity .4s, transform .5s;
  transition-timing-function: ${EASE_OUT};
  z-index: 7;
  position: relative;

  &.focused, &.expanded, &.editing {
    opacity: 1;
    transform: none;
    pointer-events: all;
    transition: all .7s ${EASE_OUT} .05s;
  }
`

export const ContentRoot = styled.div`
  border-radius: ${borderRadius}px;
  max-width: 700px;
  background: ${aColor};
  box-shadow: ${kBoxShadow};
  padding-top: 20px;
  width: ${window.innerWidth}px;

  hr {
    width: 150px;
  }
`


export const Title = styled.input`
  font-size: 30px;
  font-family: life savers;
  color: white;
  text-align: center;
  font-weight: bold;
  pointer-events: none;
  width: 100%;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    font-size: 28px;
  }

  .editing & {
    pointer-events: all;
  }
`

export const Subtitle = styled.input`
  font-family: life savers;
  font-size: 16px;
  opacity: .7;
  color: white;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  width: 100%;
  pointer-events: none;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
   font-size: 14px;
 }

 .editing & {
   pointer-events: all;
 }
`

export const Description = styled.div`
  font-size: 18px;
  color: white;
  margin: 10px 20px 20px;
  padding-top: 10px;
`

export const ActionsRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  border-top: 1px solid white;
  font-family: annie use your telescope;
  background: ${darken(.05, aColor)};
  border-bottom-left-radius: ${borderRadius}px;
  border-bottom-right-radius: ${borderRadius}px;

  & > * {
    flex: 1 0 30px;
    height: 100%;
  }
`

export const Action = styled.div`
  color: white;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  transition: all .3s ${EASE_OUT};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: white;

  &:first-child {
    border-bottom-left-radius: ${borderRadius}px;
  }
  &:last-child {
    border-bottom-right-radius: ${borderRadius}px;
  }
  &:not(:first-child) {
    border-left: 1px solid white;
  }

  &:hover {
    background: white;
    color: ${darken(.05, aColor)};
    transition: all .2s ${EASE_OUT};
  }

  &.addAction {
    text-align: center;
    border-left: 1px solid white;
    position: relative;
    flex: 0 0 auto;
    padding: 0 20px;

    &:not(:last-child) {
      border-right: 1px solid white;
    }

    i {
      font-size: 20px;
    }
    input {
      width: 100%;
      text-align: center;
      font-family: inherit;
      height: 100%;
    }
    .linkInput {
      position: absolute;
      top: 100%;
      background: ${aColor};
    }
  }
`

export const ExpandedContent = styled.div`
  opacity: 0;
  height: 0;
  overflow: scroll;
  pointer-events: none;
  transition: all .3s ${EASE_OUT};

  .expanded & {
    opacity: 1;
    height: 425px;
    pointer-events: all;
    transition: all .5s ${EASE_OUT};
  }
`

export const JourneyButtonRoot = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 20px;
  z-index: 50;
  background: ${darken(.05, aColor)};
  height: 60px;
  line-height: 60px;
  width: 100%;
  text-align: center;
  transition: all .3s ${EASE_OUT};
  border-radius: ${borderRadius}px;
  color: white;
  font-size: 26px;
  font-family: annie use your telescope;
  cursor: pointer;
  box-shadow: ${kBoxShadow};

  &:hover {
    background: white;
    color: ${aColor};
  }

  i {
    width: 30px;
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
  }
`
const bubbleOptionsBorderRadius = '10px'

export const BubbleOptions = styled.div`
  display: flex;
  position: absolute;
  top: 100%;
  margin-top: 20px;
  width: 100%;
  border-radius: ${bubbleOptionsBorderRadius};
`

export const BubbleName = styled.div`
  background: ${darken(.05, aColor)};
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  padding: 0 10px;
  color: white;
  transition: all .3s ${EASE_OUT};
  cursor: pointer;
  text-align: center;
  flex: 1 0 auto;

  &:hover {
    background: white;
    color: ${aColor};
  }
  &:not(:first-child) {
    border-left: 1px solid white;
  }
  &:first-child {
    border-top-left-radius: ${bubbleOptionsBorderRadius};
    border-bottom-left-radius: ${bubbleOptionsBorderRadius}
  }
  &:last-child {
    border-top-right-radius: ${bubbleOptionsBorderRadius};
    border-bottom-right-radius: ${bubbleOptionsBorderRadius};
  }
  span {
    color: ${lighten(.3, aColor)};
    font-size: 14px;
  }
`

export const BubbleDeleteButton = styled(BubbleName)`
  background: red;
  right: 0;
  position: relative;

  &:hover {
    background: white;
    color: red;
  }
`

export const BubbleEditButton = styled(BubbleName)`
`
