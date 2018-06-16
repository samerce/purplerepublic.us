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

injectGlobal`
  @keyframes fromHeaven {
    0% {
      transform: none;
      opacity: 0;
    }
    100% {
      transform: rotate(-5deg);
      opacity: 1;
    }
  }

  @keyframes shrinkIs {
    0% {
      font-size: inherit;
      line-height: inherit;
    }
    100% {
      font-size: 30px;
      line-height: 82px;
    }
  }
  @keyframes shrinkIsSmall {
    0% {
      font-size: inherit;
      line-height: inherit;
    }
    100% {
      font-size: 14px;
      line-height: 42px;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

export const Root = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  .intro-text {
    font-size: 52px;
    font-family: quattrocento;
  }
  .isness {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    .intro-text {
      font-size: 42px;
    }
  }
`

export const BackgroundRoot = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: white;
`

export const TypingRoot = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;

  &.first {
    z-index: 6;
    overflow-y: scroll;
  }
`

export const Disclaimer = styled.div`
  margin: 0 15px;
  max-width: 700px;
  font-family: quattrocento;
  font-size: 20px;
  opacity: 0;
  text-align: center;
  height: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .intro-disclaimer & {
    opacity: 1;
    transition: all 2s ${EASE};
    ${'' /* animation-name: fadeOut;
    animation-duration: 3s;
    animation-fill-mode: both;
    animation-delay: 11s;
    animation-timing-function: ${EASE}; */}
  }
  .intro-exit & {
    transform: scale(0);
    opacity: 0;
    transition: opacity .7s, transform 1s;
    transition-timing-function: ${EASE};
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
    font-size: 24px;
  }

  hr {
    margin: 20px 0;
  }
`

export const YouAre = styled.div`
  opacity: 0;

  .intro-youAre & {
    opacity: 1;
  }

  .intro-enough & {
    transform: translateX(-800px);
    opacity: 0;
    transition-timing-function: ${EASE_OUT};
    transition: opacity 3s, transform 5s;
  }
`

export const Enough = styled.div`
  opacity: 0;

  .intro-enough & {
    opacity: 1;
    transition: all .01s linear .5s;
  }
  .intro-now & {
    opacity: 0;
    transform: translateX(800px);
    transition-timing-function: ${EASE};
    transition: opacity 2s, transform 2s;
  }
`

export const Now = styled.div`
  position: relative;
  opacity: 0;

  .intro-now & {
    opacity: 1;
    transition: all .01s linear .5s;
  }
`

export const Sneaky = styled.div`
  font-size: 32px;
  opacity: 0;
  font-family: quattrocento;

  .intro-now & {
    position: absolute;
    width: 300px;
    top: -50%;
    left: -60px;
    animation-name: fromHeaven;
    animation-duration: 2s;
    animation-direction: alternate;
    animation-delay: 2s;
    animation-iteration-count: 2;
    animation-fill-mode: both;
  }

  @media (max-width: ${SCREEN_WIDTH_S_PX}) {
    font-size: 22px;
  }
`

export const What = styled.div`
  opacity: 0;

  .intro-what & {
    opacity: 1;
  }

  .intro-exit & {
    opacity: 0;
    transform: scale(0);
    transition: all .5s ${EASE};
  }
`

export const DualityRoot = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  opacity: 0;

  .intro-ganja & {
    opacity: 1;
  }

  img {
    width: 100%;

    @media (max-width: ${SCREEN_WIDTH_S_PX}) {
      width: initial;
      height: 100%;
      transform: translateX(-100px);
    }
  }
`

export const Duality = styled.div`

`

export const Life = styled.div`
  opacity: 0;

  .intro-lifeEverything &, .intro-lifeNothing &, .intro-youNothing &, .intro-youEverything &, .intro-duality &, .intro-welcome & {
    opacity: 1;
  }
  @media (max-width: ${SCREEN_WIDTH_S_PX}) {
    .intro-text {
      font-size: 28px;
    }
  }
`

const DURATION_IS = 3

export const Is = styled.div`
  opacity: 0;

  .intro-lifeEverything & {
    opacity: 1;
    transform: translateX(-150px);
    transition: opacity 3s ${EASE},
      transform 1s ${EASE} ${DURATION_IS}s;

    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
      transform: translateX(-60px);
    }
  }
  .intro-lifeNothing & {
    opacity: 1;
    transform: translateX(-120px);
    transition: transform .5s ${EASE} .5s;

    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
      transform: translateX(-45px);
    }
  }
  .intro-youNothing & {
    opacity: 1;
    transform: translateX(-1000px);
    transition: all 1s ${EASE};
  }
`

export const Everything = styled.div`
  opacity: 0;

  .intro-text {
    padding-left: 100px;
  }
  .inb {
    display: inline;
  }
  span {
    opacity: 0;
    transform: translateX(-5px);
  }

  .intro-lifeEverything & {
    opacity: 1;
    transition: all 1.5s ${EASE} ${DURATION_IS + .5}s;
  }
  .intro-lifeNothing & {
    opacity: 0;
    transform: translateY(-2000px);
    transition: all 1s ${EASE};
  }
  .intro-youNothing & {
    transform: translateX(2000px);
  }
  .intro-youEverything & {
    opacity: 1;
    transform: translateX(34px);
    transition: all 1s ${EASE};

    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
      transform: translateX(20px);
    }
  }
  .intro-duality &, .intro-welcome & {
    opacity: 1;
    transform: translateX(-260px);
    transition: all .5s ${EASE};

    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
      transform: translateX(-110px);
    }

    span {
      opacity: 1;
      transform: none;
      transition: all .5s ${EASE} .5s;

      animation-name: shrinkIs;
      animation-duration: .5s;
      animation-delay: .5s;
      animation-fill-mode: both;
      animation-timing-function: ${EASE};

      @media(max-width: ${SCREEN_WIDTH_S_PX}) {
        animation-name: shrinkIsSmall;
      }
    }
  }
`

export const Nothing = styled.div`
  opacity: 0;
  transform: translateY(2000px);

  div {
    padding-left: 100px;
  }

  .intro-lifeNothing & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE};
  }
  .intro-youNothing & {
    opacity: 1;
    transform: none;
  }
  .intro-youEverything & {
    opacity: 0;
    transform: translateX(2000px);
    transition: all 1s ${EASE};
  }
`

export const YouAreToo = styled.div`
  opacity: 0;
  transform: translateX(-1000px);

  .intro-youNothing & {
    opacity: 1;
    transform: translateX(-145px);
    transition: all 1s ${EASE} .5s;

    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
      transform: translateX(-55px);
    }
  }
  .intro-youEverything & {
    opacity: 1;
    transform: translateX(-145px);

    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
      transform: translateX(-55px);
    }
  }
  .intro-duality &, .intro-welcome & {
    opacity: 0;
    transform: translateX(-145px);
    transition: all .5s ${EASE};
  }
`

export const DualityText = styled.div`
  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    .intro-text {
      font-size: 28px;
    }
  }

  &.duality-half {
    opacity: 0;

    &.ying, &.yang, &.stacked {
      opacity: 1;
      transition: all .3s ${EASE};
    }

    .intro-text {
      display: flex;
    }

    &.ying span, &.stacked span {
      opacity: 1
      transform: none;
      transition: all .3s ${EASE};
    }

    &.stacked span {
      font-size: 30px;
      line-height: 82px;

      @media(max-width: ${SCREEN_WIDTH_S_PX}) {
        font-size: 14px;
        line-height: 42px;
      }
    }

    span {
      opacity: 0;
      transform: translateX(-10px);
    }

    .intro-exit & {
      opacity: 0;
      transition: all .3s ${EASE_OUT};
    }
  }
`

export const DualityImages = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${p => p.show? 1 : 0};
`

export const WelcomeRoot = styled.div`
  position: absolute;
  height: ${window.innerHeight + 1000}px;
  width: 100%;
  z-index: 5;
  transform: translateY(100%);

  .intro-welcome & {
    transform: translateY(-400px);
    transition: all 4s ${EASE_OUT};
  }
  .intro-exit & {
    opacity: 0;
    transform: translateY(-400px);
    transition: all .5s ${EASE} .2s;
  }
`

export const WelcomeBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, white 0%, white 70%, transparent 100%);
  ${'' /* background: linear-gradient(to top, #956C95 0%, #956C95 70%, transparent 100%); */}
`

export const Brand = styled.div`
  margin: 600px auto 0;
  text-align: center;
  font-size: 80px;
  font-family: life savers;
  opacity: 0;
  color: #956C95;
  position: relative;
  z-index: 5;

  .intro-welcome &, .intro-exit & {
    opacity: 1;
    letter-spacing: 2px;
    transition: all 3s ${EASE} 3.5s;
  }

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    font-size: 32px;
    margin-top: 550px;
  }
`

export const Tagline = styled.div`
  font-size: 48px;
  font-family: rancho;
  text-align: center;
  color: #956C95;
  margin: 50px auto 0;
  transform: translateY(30px);
  opacity: 0;
  position: relative;
  z-index: 5;

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    font-size: 22px;
  }

  &.extra-tag {
    margin-top: 10px;
  }
  .intro-welcome &, .intro-exit & {
    opacity: 1;
    transform: none;
    transition: all 3s ${EASE} 6s;

    &.extra-tag {
      transition-delay: 6.5s;
    }
  }
`
export const SkipButtonRoot = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  position: absolute;
  z-index: 6;

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    top: 10px;
    right: 10px;
  }
`

const purple = '#956C95'
export const SkipButton = styled.div`
  padding: 5px 20px;
  font-family: annie use your telescope;
  font-size: 26px;
  color: ${purple};
  border-radius: 3px;
  border: 1px solid transparent;
  opacity: 0;
  transform: scale(0);
  transition: all .3s ${EASE_OUT} .2s;
  cursor: pointer;
  user-select: none;

  .intro-enough &, .intro-now &, .intro-what &, .intro-lifeEverything &, .intro-lifeNothing &, .intro-youNothing &, .intro-youEverything & {
    opacity: 1;
    transform: none;
    transition: all .3s ${EASE_OUT};
  }
  &:hover {
    border-color: ${purple};
    transition: all .3s ${EASE};
  }
  &:active {
    background: ${purple};
    color: white;
    transition: all .2s ${EASE_OUT};
  }

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    font-size: 18px;
  }
`

export const QuestionRoot = styled.div`
  display: flex;
  flex-direction: column;
`

export const Prompt = styled.div`
  font-size: 24px;
  margin-bottom: 20px;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    font-size: 22px;
  }
  @media (max-width: ${SCREEN_WIDTH_S_PX}) {
    font-size: 20px;
  }
`

export const Question = styled.div`
  margin-bottom: 30px;
`

export const QuestionPrompt = styled.div`

`

export const Answer = styled.div`
  width: 300px;
  border-radius: 5px;
  border: 1px solid ${purple};
  text-align: center;
  padding: 10px 0;
  margin: 15px 10px 0 0;
  display: inline-block;
  cursor: pointer;
  color: ${purple};
  user-select: none;
  transition: all .2s ${EASE_OUT};

  &:hover {
    background: ${purple};
    color: white;
    transform: scale(1.1);
    transition: all .5s ${EASE_OUT};
  }

  &:active {
    transform: scale(.9);
    background: ${darken(.1, purple)};
  }

  &.selected {
    background: ${darken(.2, purple)};
    color: white;
  }
  &.next {
    display: block;
    margin: 15px auto 20px;
  }

`

export const Results = styled.div`
  margin-bottom: 20px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);

  &.show {
    opacity: 1;
    pointer-events: all;
    transform: none;
    transition: all .5s ${EASE};
  }
`
