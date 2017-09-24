import styled, {injectGlobal} from 'styled-components'
import {secondary} from '../../global/colors'
import {EASE_OUT, EASE_IN} from '../../global/constants'

const whitePurple = 'rgba(255, 227, 251, 1)'
const dialogueBorderRadius = '30px'
const stripedGradientLight = `repeating-linear-gradient(
  45deg,
  rgba(184, 95, 174, .8),
  rgba(184, 95, 174, .8) 2px,
  rgba(177, 85, 167, 0.8) 2px,
  rgba(177, 85, 167, 0.8) 4px
)`
const stripedGradientDark = `repeating-linear-gradient(
  45deg,
  rgba(71, 37, 67, .8),
  rgba(71, 37, 67, .8) 2px,
  rgba(82, 45, 77, 0.8) 2px,
  rgba(82, 45, 77, 0.8) 4px
  /*rgba(45, 39, 92, .8),
  rgba(45, 39, 92, .8) 2px,
  rgba(53, 47, 102, 0.8) 2px,
  rgba(53, 47, 102, 0.8) 4px*/
)`

const getRand = range => `${Math.ceil(Math.random() * range)}px`

injectGlobal`
  @keyframes circleGrow {
    from {
      border-width: 5px;
    }
    to {
      border-width: 3px;
      width: 100px;
      height: 100px;
      top: 60px;
      left: 0;
    }
  }

  @keyframes jiggle2 {
    0% {
      transform: translate(0, 0);
    }

    25% {
      transform: translate(${getRand(-15)}, ${getRand(-11)});
    }

    50% {
      transform: translate(${getRand(12)}, ${getRand(17)});
    }

    75% {
      transform: translate(${getRand(-19)}, ${getRand(12)});
    }

    100% {
      transform: translate(${getRand(14)}, ${getRand(-17)});
    }
  }
`

export const Page = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`

export const NowButtonMoverRoot = styled.div`
  position: relative;
  z-index: 3;
  height: 100%;
  width: 100%;
`

export const NowButtonRoot = styled.div`
  font-family: annie use your telescope;
  color: black;
  font-size: 62px;
  letter-spacing: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  padding-top: 70px;

  animation: 5s ${EASE_OUT} 5s jiggle2;
  animation-direction: alternate;
  animation-iteration-count: infinite;

  #now {
    opacity: 0;
    transition: opacity 7s ${EASE_OUT};
  }

  &.appeared {
    #now {
      opacity: 1;
      transition-delay: 1s;
    }
  }
`

export const QuoteRoot = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
  text-align: center;
  font-size: 52px;
  font-family: life savers;
  z-index: 2;

  #a, #b, #c {
    opacity: 0;
    transform: translateY(25px);
    transition: opacity 3s ${EASE_IN} .2s, transform 3s ${EASE_OUT};
    margin-right: 15px;
    display: inline-block;
  }

  &.show {
    #a, #b, #c {
      opacity: 1;
      transform: translateY(0);
    }
    #b {
      transition-delay: 1s;
    }
    #c {
      transition-delay: 2s;
    }
  }
`

export const Quote = styled.div`

`

export const NowText = styled.div`
  position: relative;
  flex: 0 0 auto;
  cursor: pointer;

  #now {
    position: relative;
    z-index: 2;
  }

  #se {
    position: absolute;
    top: 12px;
    left: -105px;
    display: inline-block;
    opacity: 0;
    transform: rotate(180deg) translateX(10px);
    transition: all .3s ${EASE_OUT};

    span {
      font-size: 18px;
      margin-left: -19px;
      display: inline-block;
      transform: translateY(10px) rotate(28deg)
    }
  }
  #k, #ledge, #words {
    opacity: 0;
    position: absolute;
    transition: all .3s ${EASE_OUT};
    z-index: 2;
  }
  #k {
    left: -55px;
    transform: translateX(-15px);
  }
  #ledge {
    left: 115px;
    transform: translateX(15px);
  }
  #words {
    display: inline-block;
    margin-left: 10px;
    transform: translateX(10px);
    width: 230px;
  }
  .click1 & {
    #se {
      opacity: 1;
      transform: rotate(180deg);
      transition: all 2s ${EASE_OUT} .7s;
    }
  }
  .click2 & {
    #k, #ledge {
      opacity: 1;
      transform: none;
      transition: all 2s ${EASE_OUT} .7s;
    }
  }
  .click3 & {
    font-size: 26px;
    transition: font-size .5s ${EASE_OUT};
    cursor: default;

    #words {
      transform: none;
      opacity: 1;
      transition: transform 2s ${EASE_OUT} .2s, opacity 2s ${EASE_OUT} .5s;
    }
  }
`

export const NowCircle = styled.div`
  position: absolute;
  top: -30px;
  left: -30px;
  width: 140px;
  height: 140px;
  border-radius: 100%;
  border: 3px solid black;
  margin: 0 auto;
  background: black;
  box-shadow: 0 0 30px rgba(0,0,0,.1);
  z-index: 1;
`

export const QuiltRoot = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;

  &.quilted {
    opacity: 1;
    transition: opacity 4s ${EASE_OUT} 1s;
  }

  iframe {
    position: relative;
    z-index: 1;
  }
`

export const Shade = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.1);
  pointer-events: none;
  z-index: 2;
`

export const EmphasisText = styled.div`
  `
export const StripedBackground = styled.div`
  background: ${stripedGradientLight};
`

export const Image = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`

const byLineMargin = '20%'
const byLineMarginSmall = '10px'
export const ByLine = styled.div`
  background: rgba(40, 33, 82, .85);
  color: white;
  font-family: 'averia sans libre', sans-serif;
  margin-left: ${byLineMargin};
  padding: 10px 25px;
  font-size: 24px;
  line-height: 32px;
  z-index: 1;
  position: relative;
  border-radius: 50px;
  display: inline-block;
  max-width: 50%;

  @media(max-width: 544px) {
    font-size: 18px;
    margin-left: ${byLineMarginSmall};
    width: fit-content;
  }
  @media(max-width: 440px) {
    font-size: 16px;
  }
`

export const ByLineRight = styled(ByLine)`
  background: rgba(162, 0, 86, 0.85);
  margin-right: ${byLineMargin};
  float: right;

  @media(max-width: 544px) {
    margin-right: ${byLineMarginSmall};
  }
`

export const MessageStyle = `
  display: table;
  font-family: averia sans libre;
  font-size: 20px;
  color: white;
  max-width: 85%;
  padding: 15px 30px;
  border-radius: ${dialogueBorderRadius};
  margin: 12px 0 0 10%;
  max-width: 65%;
`
export const MessageStyleRight = `
  margin-right: 15%;
  margin-left: auto;
  background: ${stripedGradientDark};
`

export const BodyCircle = styled(StripedBackground)`
  ${MessageStyle}

  @media(max-width: 544px) {
    font-size: 18px;
    margin-left: 15px;
    max-width: 80%;
  }
  @media(max-width: 440px) {
    font-size: 16px;
  }
`

export const BodyCircleRight = styled(BodyCircle)`
  ${MessageStyleRight}

  @media(max-width: 544px) {
    margin-left: auto;
    margin-right: 15px;
  }
`

export const Separator = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(184, 95, 174, .8);
  position: relative;
  z-index: 2;
`

export const Scribble = styled.div`
  position: absolute;
  z-index: 2;
  font-family: annie use your telescope;
  font-size: 20px;
  color: ${whitePurple};

  @media(max-width: 544px) {
    font-size: 16px;
  }
`

export const Subtitle = styled.div`
  font-size: 24px;
  font-family: annie use your telescope;
  color: ${whitePurple};
  text-align: center;
  margin-bottom: 35px;
  margin-top: -5px;
  padding: 0 10px;

  @media(max-width: 544px) {
    font-size: 20px;
  }
`

export const OurPolitics = styled.div`
  width: 100%;
  padding: 60px 20px 0;
  display: flex;
  color: white;
  font-size: 20px;
  align-items: center;
  justify-content: space-around;

  & > * {
    border-radius: 10px;
    flex-basis: 552px;
  }

  .videoBlock {
    display: flex;
    flex-direction: column;
    background: rgba(40, 33, 82, .85);
    padding: 10px 20px 20px;

    .intro {
      padding: 0 0 10px;
    }
    iframe {
      width: 512px;
      height: 288px;
    }
  }

  .reassureBlock {
    flex-shrink: 1;
    background: rgba(162, 0, 86, 0.85);
    padding: 10px 20px;
    margin: 0 10px 0;
  }

  @media(max-width: 552px) {
    .video iframe {
      width: 256px;
      height: 144px;
    }
  }

  @media(max-width: 900px) {
    flex-direction: column-reverse;

    & > * {
      flex-basis: auto;
    }

    .reassureBlock {
      margin: 20px 0;

    }
    .videoBlock {
      max-width: 552px;
    }
    .video {
      margin: 0 auto;
    }
  }
`
