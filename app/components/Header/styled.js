import styled from 'styled-components'
import Colors from '../../global/colors'
import {EASE_OUT} from '../../global/constants'

const rootHeight = '80px'
const navHeightSmall = '60px'
const {secondary} = Colors

let navColor = 'rgba(255, 227, 251, 1)'

export const Root = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  height: ${rootHeight};
  line-height: ${rootHeight};
  border-bottom: 1px solid ${secondary};
  background: rgba(87, 5, 76, .8);
  padding: 0 16px;

  @media(max-width: 670px) {
    height: 100px;
    line-height: ${'50px'};
    text-align: center;
  }

  .logo {
    height: 100%;
    display: none;
    vertical-align: top;
    align-items: center;
    margin-right: 15px;

    img {
      height: 40px;
    }
  }
`
export const Title = styled.div`
  font-size: 36px;
  padding: 0 10px 0 0;
  color: rgba(219, 166, 212, 0.8);/*rgb(184, 95, 174);*/
  font-family: rancho;
  display: inline-block;

  @media(max-width: 1220px) {
    font-size: 28px;
  }
  @media(max-width: 520px) {
    font-size: 24px;
  }
`
export const Subtitle = styled(Title)`
  font-size: 24px;
  padding: 0 10px 0 5px;
  vertical-align: top;
  font-family: life savers;/*reenie beanie;*/
  line-height: 82px;
  color: rgba(207, 143, 198, 0.8);

  @media(max-width: 1220px) {
    font-size: 20px;
    line-height: 82px;
  }
  @media(max-width: 856px) {
    font-size: 14px;
  }
  @media(max-width: 670px) {
    line-height: 52px;
  }
`

export const NavLinkArea = styled.div`
  display: inline-block;
  vertical-align: top;
`

export const SocialMediaLinks = styled.div`
  display: inline-block;
  float: right;
  transform: translateX(12px);
  a {
    transition: all .1s ${EASE_OUT} .1s;
  }

  @media(max-width: 670px) {
    float: none;
    text-align: center;
    transform: none;
    height: 50px;
    display: block;
  }
  @media(min-width: 670px) and (max-width: 1060px) {
    &.cower a {
      opacity: 0;
      width: 0;
      transition-delay: 0;
    }
  }
`

const Hover = `
  color: rgba(228, 154, 217, 1);
  transform: scale(1.02, 1.02);
`
const Active = `
  color: rgba(207, 115, 193, 1);
  transform: scale(.99, .99);
`
const Transition = `
  transition: transform .3s, color .1s, width .2s, opacity .2s;
  transition-timing-function: ${EASE_OUT};
`

const iconSizeBig = '50px'
const iconSizeSmall = '45px'
export const Icon = styled.a`
  font-size: 28px;
  width: ${iconSizeBig};
  height: ${iconSizeBig};
  color: ${navColor};
  display: inline-block;
  transform-origin: left bottom;
  ${Transition}

  @media(max-width: 1220px) {
    font-size: 22px;
    width: ${iconSizeSmall};
    height: ${iconSizeSmall};
  }
  @media(max-width: 544px) {
    transform: translateY(-10px);
    font-size: 20px;
  }
  &:hover {
    ${Hover}
  }
  &:active {
    ${Active}
  }
`

const expanderSizeBig = '50px'
const expanderSizeSmall = '40px'
export const NavDropdownButton = styled.div`
  font-size: 28px;
  width: ${expanderSizeBig};
  height: ${rootHeight};
  display: none;
  color: ${navColor};
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  line-height: 85px;
  position: relative;
  ${Transition}

  @media(min-width: 670px) and (max-width: 1220px) {
    display: inline-block;
    &.cower {
      width: 0;
      opacity: 0;
    }
  }
  @media(max-width: 670px) {
    display: inline-block;
    height: ${navHeightSmall};
    line-height: 54px;
    font-size: 24px;
    width: ${expanderSizeSmall};
  }
  &:hover {
    ${Hover}
  }
  &:active {
    ${Active}
  }
`
export const NavDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 1px;
  display: none;
  flex-direction: column;
  background: rgba(87, 5, 76, .8);
  border-bottom: 1px solid ${secondary};
  transform-origin: 0px 0px;
  transition: transform .3s, opacity .25s;
  transition-timing-function: ${EASE_OUT};

  & > * {
    flex: 0 0 60px;
  }
  @media(max-width: 670px) {
    display: flex;
    transform: ${p => p.isOpen? 'none' : 'scaleY(0)'};
    opacity: ${p => p.isOpen? 1 : 0};
    width: 100%;
  }
`
