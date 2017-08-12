// NavLink

import styled from 'styled-components'
import Colors from '../../global/colors.js'
import {ACTIVE_NAV_LINK_DURATION, EASE_OUT} from '../../global/constants'

const {secondary} = Colors
const activeBorder = `4px solid ${secondary}`
const revealTimerDuration = .5
const elapseTimerDelay = revealTimerDuration - .2
const elapseTimerDuration = (ACTIVE_NAV_LINK_DURATION / 1000) - elapseTimerDelay

export const Root = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
  height: 80px;
  cursor: ${p => p.isSelected? 'default' : 'pointer'};
  overflow: hidden;
  transition: all .3s ${EASE_OUT};

  &:hover {
    background: ${p => p.isSelected? '' : p.isInMenu? 'rgba(87, 5, 76, .6)' : ''};
    div {
      color: ${p => p.isSelected? '' : 'rgba(228, 154, 217, 1)'};
      transform: ${p => p.isSelected? '' : 'scale(1.02, 1.02)'};
    }
  }
  &:active {
    div {
      color: ${p => p.isSelected? '' : 'rgba(207, 115, 193, 1)'};
      transform: scale(.99, .99);
    }
  }

  @media(max-width: 1220px) {
    ${'' /* transform: ${p => p.isSelected? 'none' : 'scaleX(0)'}; */}
    max-width: ${p => p.isSelected? '150px' : '0'};
    opacity: ${p => p.isSelected? 1 : 0};
    &.tickled {
      transform: none;
      max-width: 150px;
      opacity: 1;
    }
  }
  @media(max-width: 856px) {
    height: 60px;
    max-width: 100%;
    text-align: center;
    display: ${p => p.isInMenu? p.isSelected? 'none' : 'block' : p.isSelected? 'inline-block' : 'none'};
  }
`

export const Text = styled.div`
  font-family: rancho;
  font-size: 36px;
  display: inline-block;
  padding: 0 10px;
  user-select: none;
  color: rgba(255, 227, 251, 1);
  width: 100%;
  height: 100%;
  transition: transform .3s, color .1s;
  transition-timing-function: ${EASE_OUT};

  @media(max-width: 1220px) {
    font-size: 28px;
    padding: 0 7px;
  }
  @media(max-width: 856px) {
    vertical-align: top;
    line-height: ${p => p.isInMenu? '58px' : ''};
  }
`

export const Timer = styled.div`
  position: absolute;
  height: inherit;
  width: ${props => props.isSelected? '100%' : 0};
  transform-origin: right 50% 0;
  transform: ${props => props.isSelected? props.isTimed? 'scaleX(0)' : 'none' : 'none'};
  border-bottom: ${activeBorder};
  transition: ${props => props.isSelected? `
    transform ${elapseTimerDuration}s linear ${elapseTimerDelay}s,
    width ${revealTimerDuration}s cubic-bezier(0.25, 0.1, 0.25, 1)`
    : 'none'};

  @media(max-width: 856px) {
    border: none;
  }
`
//${props => props.isActive? 'width 5s linear' : 'width 2s cubic-bezier(0.5, 0.2, 0.9, 0.4)'};
