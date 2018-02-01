import styled, {injectGlobal} from 'styled-components'
import {
  EASE_IN_OUT_SINE, EASE_OUT,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
} from './constants'
import {darken, transparentize as trans} from 'polished'

const whitePurple = 'rgba(255, 227, 251, 1)'

export const Header = styled.div`
  position: relative;
  z-index: 1;
  font-family: life savers;/*love ya like a sister;*/
  font-size: 60px;
  text-align: center;
  color: white;
  text-shadow: 2px 1px rgba(130,39,90,1);
  margin: 0 auto 30px;
  display: table;
  padding: 0 10px;

  @media(max-width: ${SCREEN_WIDTH_M_PX}) {
    font-size: 32px;
    padding-top: 15px;
  }
`

export const CatchLine = styled(Header)`
  font-size: 54px;
  display: table;
  margin-bottom: 0px;
`

export const SweetTalk = styled.div`
  font-size: 24px;
  font-family: annie use your telescope;
  color: ${whitePurple};
  text-align: center;
  margin-bottom: 35px;
  margin-top: -5px;
  position: relative;
  padding: 0 10px;

  @media(max-width: 544px) {
    font-size: 20px;
  }
`

export const Root = styled.div`
  position: relative;
  background-size: cover;
  background-attachment: fixed;
`

export const ContentArea = styled.div`
  width: 100%;
  padding: 20px 0;

  @media(max-width: 544px) {
    position: relative;
    padding: 15px 0;
  }
`

export const ToolBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 3;
  width: 100%;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  background: linear-gradient(to bottom, transparent 0%, ${p => p.themeColor} 100%);
  pointer-events: none;
  transition: all 1s ${EASE_IN_OUT_SINE};
  font-family: annie use your telescope;

  & > * {
    flex: 1 0 0;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    flex-direction: column-reverse;
  }
`

export const ToolBarItem = styled.div`
  position: relative;
  color: white;
  padding: 20px 10px;
  cursor: pointer;
  font-size: 32px;
  transition: all .4s ${EASE_OUT};
  font-family: annie use your telescope;
  text-align: center;

  div {
    position: relative;
    z-index: 3;
    transition: all .4s ${EASE_OUT};
    text-shadow: 1px 1px ${p => darken(.2, p.themeColor)};
    user-select: none;
  }

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent 0%, ${p => trans(.3, p.themeColor)} 50%, transparent 100%);
    transition: all .2s ${EASE_OUT};
    content: ' ';
    transform: translateY(10px);
    z-index: 1;
    opacity: 0;
    border-top: 1px solid ${p => trans(.2, p.themeColor)};
  }

  &:hover {
    &:after {
      transform: none;
      opacity: 1;
      transition-duration: .4s;
    }
    div {
      transform: scale(1.05);
      letter-spacing: 1px;
      transition: all 5s cubic-bezier(0.39, 0.575, 0.565, 1);
    }
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    font-size: 24px;
    padding: 10px;
  }
`

injectGlobal`
  .blurb {
    margin: 0 20px;
    background: rgba(87, 5, 76, .5);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 1px 1px 15px rgba(87, 5, 76, .5);
  }
`
