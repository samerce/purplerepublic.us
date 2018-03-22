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

  &.focused, &.expanded {
    opacity: 1;
    transform: none;
    pointer-events: all;
    transition: all .7s ${EASE_OUT} .05s;
  }
`

export const ContentRoot = styled.div`
  border-radius: ${borderRadius}px;
  max-width: 640px;
  background: ${aColor};
  box-shadow: 2px 2px 30px rgba(0,0,0,.3);
  padding-top: 20px;
  width: ${window.innerWidth}px;

  hr {
    width: 150px;
  }
`


export const Title = styled.div`
  font-size: 26px;
  font-family: life savers;
  color: white;
  text-align: center;
  font-weight: bold;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    font-size: 24px;
  }
`

export const Subtitle = styled.div`
  font-family: life savers;
  font-size: 12px;
  opacity: .7;
  color: white;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
   font-size: 10px;
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

  &:hover {
    background: white;
    color: ${darken(.05, aColor)};
    transition: all .2s ${EASE_OUT};
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
