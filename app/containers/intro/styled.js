import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken} from 'polished'
import {
  CatchLine as aCatchLine,
  SweetTalk as aSweetTalk,
} from '../../global/styled'
import {
  EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
} from '../../global/constants'

const getRandInt = range => Math.ceil(Math.random() * range)
const getRand = range => `${getRandInt(range)}px`

const aColor = '#956C95'

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
  font-family: quattrocento;
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
    margin-bottom: 20px;
    font-size: 28px;

    strong {
      color: ${aColor};
    }
  }

  hr {
    margin: 20px 0;
  }
  @media (max-width: 647px) {
    flex: 0 0 50%;
  }
`

export const PickYourPath = styled.div`
  flex: 0 0 36%;
  width: 100%;
  display: flex;
  transform: translateY(150%);
  transition: all 1s ${EASE_OUT};

  @media (max-width: 647px) {
    flex-direction: column-reverse;
  }

  & > * {
    flex: 0 0 33.33333%;
  }

  .intro-enter & {
    transform: none;
  }
  .intro-exit & {
    transition: all 1s ${EASE};
  }
  @media (max-width: 647px) {
    flex: 0 0 50%;
  }
`

export const PathOption = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${aColor};
  color: white;
  cursor: pointer;
  border-top: 1px solid transparent;
  font-size: 32px;

  &:hover {
    background: white;
    color: ${aColor};
    border-top-color: ${aColor};
  }

  &:not(:first-child) {
    border-left: 1px solid white;

    @media (max-width: 647px) {
      border-left: none;
    }
  }

  @media (max-width: 647px) {
    font-size: 26px;
    border-top: 1px solid white;
  }

`

export const PathOptionButton = styled.div`
  font-family: annie use your telescope;
  transition: all .3s ${EASE_OUT};
  flex: 0 0 90%;
  text-align: center;
  user-select: none;

`
