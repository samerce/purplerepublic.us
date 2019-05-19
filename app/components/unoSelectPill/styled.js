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
import {Icon, screen} from '../../global/styled'

export const Root = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 50px;
  border: 1px solid ${p => p.theme.veryLight};
  z-index: 40;
  background: ${p => p.theme.slightlyDark};
  height: 60px;
  box-shadow: ${p => p.theme.shadowMedium};

  ${p => p.collapsed && `
    padding: 0;
    width: 60px;
  `}
`

export const OptionRoot = styled.div`
  padding: 0 20px;
  cursor: pointer;
  font-family: alice;
  position: relative;
  font-size: 24px;
  transition-property: width, opacity;
  transition-duration: .3s;
  transition-timing-function: ${EASE_OUT};
  user-select: none;
  margin-left: ${p => p.breathe? '5px' : '0'};
  color: ${p => p.selected? p.theme.main : 'white'};
  display: flex;
  align-items: center;

  ${p => p.hidden? `
    width: 0;
    opacity: 0;
    pointer-events: none;
  ` : ''}

  ${screen.medium`
    font-size: 20px;
  `}
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

  ${p => p.selected && `
    transition-duration: .5s;
    transform: scaleX(1);
    opacity: .9;
  `}
`

export const OptionText = styled.div`
  position: relative;
  z-index: 5;
  padding: 3px;
`

export const FilterButton = Icon.extend`
  color: white;
  height: 60px;
  line-height: 60px;
  width: 100%;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  top: 0;
  left: 0;
  transition: all .3s ${EASE_OUT};

  &:hover {
    color: ${p => p.theme.main};
    background: white;
  }
  ${p => p.hidden && `
    opacity: 0;
    pointer-events: none;
  `}
`
