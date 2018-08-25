import {darken, lighten, transparentize as trans} from 'polished'

// const purple = '#512287'
const main = '#334ac7'
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
  shadowHeavy: '2px 2px 30px rgba(0,0,0,.3)',
  shadowMedium: '2px 2px 20px rgba(0,0,0,.3)',
  borderRadiusBoto: 10,
}
