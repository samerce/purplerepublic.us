import {darken, lighten, transparentize as trans} from 'polished'

const purple = '#3e1b66'
const purpleVeryDark = darken(.2, purple)
const purpleSlightlyDark = darken(.05, purple)
const purpleVeryLight = lighten(.3, purple)

export default {
  main: purple,
  slightlyDark: purpleSlightlyDark,
  veryDark: purpleVeryDark,
  veryLight: purpleVeryLight,
  shadowHeavy: '2px 2px 30px rgba(0,0,0,.3)',
  shadowMedium: '2px 2px 20px rgba(0,0,0,.3)',
  borderRadiusBoto: 10,
}
