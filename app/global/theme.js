import {darken, lighten, transparentize as alpha} from 'polished'

// #512287 #334ac7 #238386 #1b316b
const main = '#1b316b'
const purpleVeryDark = darken(.2, main)
const purpleSlightlyDark = darken(.05, main)
const purpleVeryLight = lighten(.3, main)
const purpleSlightlyLight = lighten(.05, main)

export default {
  main,
  slightlyDark: purpleSlightlyDark,
  slightlyLight: purpleSlightlyLight,
  veryDark: purpleVeryDark,
  veryLight: purpleVeryLight,
  shadowVeryHeavy: '3px 3px 30px ' + alpha(.5, purpleVeryDark),
  shadowHeavy: '2px 2px 30px rgba(0,0,0,.3)',
  shadowMedium: '2px 2px 20px rgba(0,0,0,.3)',
  shadowLight: '2px 2px 10px rgba(0,0,0,.2)',
  borderRadiusBoto: 10,
  gradientVeryDarkButTransparent: `radial-gradient(
    circle at center,
    ${alpha(.17, purpleSlightlyDark)} 0%,
    ${alpha(.17, purpleVeryDark)} 50%,
    ${alpha(.17, purpleVeryDark)} 100%
  )`,
  gradientVeryDark: `radial-gradient(
    circle at center,
    ${purpleSlightlyDark} 0%,
    ${purpleVeryDark} 50%,
    ${purpleVeryDark} 100%
  )`,
}
