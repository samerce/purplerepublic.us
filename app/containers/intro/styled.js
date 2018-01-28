import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  CatchLine as aCatchLine,
  SweetTalk as aSweetTalk,
} from '../../global/styled'
import {EASE_OUT, EASE_IN, EASE_IN_OUT_SINE} from '../../global/constants'

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
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
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
    transition-timing-function: ${EASE_IN_OUT_SINE};
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
`

export const What = styled.div`
  opacity: 0;

  .intro-what & {
    opacity: 1;
  }

  .intro-exit & {
    opacity: 0;
    transform: scale(0);
    transition: all .5s ${EASE_IN_OUT_SINE};
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
  }
`

export const Duality = styled.div`

`

export const Life = styled.div`
  opacity: 0;

  .intro-lifeEverything &, .intro-lifeNothing &, .intro-youNothing &, .intro-youEverything &, .intro-duality &, .intro-welcome & {
    opacity: 1;
  }
`

const DURATION_IS = 4

export const Is = styled.div`
  opacity: 0;

  .intro-lifeEverything & {
    opacity: 1;
    transform: translateX(-150px);
    transition: opacity 3s ${EASE_IN_OUT_SINE},
      transform 1s ${EASE_IN_OUT_SINE} ${DURATION_IS}s;
  }
  .intro-lifeNothing & {
    opacity: 1;
    transform: translateX(-120px);
    transition: transform .5s ${EASE_IN_OUT_SINE} .5s;
  }
  .intro-youNothing & {
    opacity: 1;
    transform: translateX(-1000px);
    transition: all 1s ${EASE_IN_OUT_SINE};
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
    transition: all 1.5s ${EASE_IN_OUT_SINE} ${DURATION_IS + .5}s;
  }
  .intro-lifeNothing & {
    opacity: 0;
    transform: translateY(-2000px);
    transition: all 1s ${EASE_IN_OUT_SINE};
  }
  .intro-youNothing & {
    transform: translateX(2000px);
  }
  .intro-youEverything & {
    opacity: 1;
    transform: translateX(34px);
    transition: all 1s ${EASE_IN_OUT_SINE};
  }
  .intro-duality &, .intro-welcome & {
    opacity: 1;
    transform: translateX(-260px);
    transition: all .5s ${EASE_IN_OUT_SINE};

    span {
      opacity: 1;
      transform: none;
      transition: all .5s ${EASE_IN_OUT_SINE} .5s;

      animation-name: shrinkIs;
      animation-duration: .5s;
      animation-delay: .5s;
      animation-fill-mode: both;
      animation-timing-function: ${EASE_IN_OUT_SINE};
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
    transition: all 1s ${EASE_IN_OUT_SINE};
  }
  .intro-youNothing & {
    opacity: 1;
    transform: none;
  }
  .intro-youEverything & {
    opacity: 0;
    transform: translateX(2000px);
    transition: all 1s ${EASE_IN_OUT_SINE};
  }
`

export const YouAreToo = styled.div`
  opacity: 0;
  transform: translateX(-1000px);

  .intro-youNothing & {
    opacity: 1;
    transform: translateX(-145px);
    transition: all 1s ${EASE_IN_OUT_SINE} .5s;
  }
  .intro-youEverything & {
    opacity: 1;
    transform: translateX(-145px);
  }
  .intro-duality &, .intro-welcome & {
    opacity: 0;
    transform: translateX(-145px);
    transition: all .5s ${EASE_IN_OUT_SINE};
  }
`

export const DualityText = styled.div`
  &.duality-half {
    opacity: 0;

    &.ying, &.yang, &.stacked {
      opacity: 1;
      transition: all .3s ${EASE_IN_OUT_SINE};
    }

    .intro-text {
      display: flex;
    }

    &.ying span, &.stacked span {
      opacity: 1
      transform: none;
      transition: all .3s ${EASE_IN_OUT_SINE};
    }

    &.stacked span {
      font-size: 30px;
      line-height: 82px;
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
    transition: all .5s ${EASE_IN_OUT_SINE} .2s;
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
    transition: all 3s ${EASE_IN_OUT_SINE} 3.5s;
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

  &.extra-tag {
    margin-top: 10px;
  }
  .intro-welcome &, .intro-exit & {
    opacity: 1;
    transform: none;
    transition: all 3s ${EASE_IN_OUT_SINE} 6s;

    &.extra-tag {
      transition-delay: 7s;
    }
  }
`
export const SkipButtonRoot = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  position: absolute;
  z-index: 6;
`

const purple = '#956C95'
export const SkipButton = styled.div`
  padding: 10px 15px;
  font-family: annie use your telescope;
  font-size: 26px;
  color: ${purple};
  border-radius: 3px;
  border: 1px solid transparent;
  opacity: 0;
  transform: scale(0);
  transition: all .3s ${EASE_OUT};
  cursor: pointer;
  user-select: none;

  .intro-enough &, .intro-now &, .intro-what &, .intro-lifeEverything &, .intro-lifeNothing &, .intro-youNothing &, .intro-youEverything & {
    opacity: 1;
    transform: none;
    transition: all .3s ${EASE_OUT};
  }
  &:hover {
    border-color: ${purple};
    transition: all .3s ${EASE_IN_OUT_SINE};
  }
  &:active {
    background: ${purple};
    color: white;
    transition: all .2s ${EASE_OUT};
  }
`
