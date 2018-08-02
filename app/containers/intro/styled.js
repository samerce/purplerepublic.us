import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken} from 'polished'
import {
  screen,
} from '../../global/styled'
import {
  EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
} from '../../global/constants'

const getRandInt = range => Math.ceil(Math.random() * range)
const getRand = range => `${getRandInt(range)}px`

export const Root = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const HelloThere = styled.div`
  flex: 0 0 64%;
  width: 100%;
  font-size: 20px;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transform: translateY(-150%);

  .intro-enter & {
    transform: none;
    transition: all 1s ${EASE_OUT};
  }
  .intro-exit & {
    transition: all 1s ${EASE};
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    font-size: 17px;

    div.offering {
      font-size: 22px;
      margin-bottom: 5px;
    }
  }

  @media (max-width: ${SCREEN_WIDTH_S_PX}) {
    div.offering {
      font-size: 18px;
    }
  }

  .offering {
    padding: 20px 0;
    font-size: 28px;
    height: 100%;
    overflow: scroll;
    width: 100%;

    strong {
      color: ${p => p.theme.main};
    }
  }

  hr {
    margin: 20px 0;
  }
`

export const PickYourPath = styled.div`
  flex: 0 0 100%;
  width: 100%;
  display: flex;
  transform: translateY(150%);
  transition: all 1s ${EASE_OUT};
  flex-wrap: wrap;

  & > * {
    flex: 1 0 33.33333%;
  }

  .intro-enter & {
    transform: none;
  }
  .intro-exit & {
    transition: all 1s ${EASE};
  }
`

export const PathOption = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.theme.main};
  color: white;
  cursor: pointer;
  font-size: 32px;
  transition: background, border;
  transition-duration: .3s;
  transition-timing-function: ${EASE_OUT};
  height: 29%;

  &.pathWithBorder {
    border-left: 1px solid ${p => p.theme.veryLight};
  }

  &:hover {
    background: white;
    color: ${p => p.theme.main};
  }

  &.pathMiddle {
    border-top: 1px solid ${p => p.theme.veryLight};
    border-bottom: 1px solid ${p => p.theme.veryLight};
    flex: 0 0 100%;
    height: 42%;
    font-size: 62px;
  }

  ${screen.medium`
    font-size: 26px;
    &.pathMiddle {
      font-size: 34px;
    }
  `}
`

export const PathOptionButton = styled.div`
  font-family: annie use your telescope;
  transition: all .3s ${EASE_OUT};
  flex: 0 0 90%;
  text-align: center;
  user-select: none;

`
