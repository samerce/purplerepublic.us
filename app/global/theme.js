import {darken, lighten, transparentize as alpha} from 'polished'

// #512287 #334ac7 #238386 #1b316b
const main = '#1b316b'
const purpleVeryDark = darken(.2, main)
const purpleSlightlyDark = darken(.05, main)
const purpleVeryLight = lighten(.35, main)
const purpleSlightlyLight = lighten(.05, main)

const flik = '#053629'//'#204017'
const dali = '#542263'
const myrtle = '#71201b'
const shelly = '#721e77'
const tweet = '#c34d30'//'#cfb405'

export const getRandomColor = () => {
  const rand = Math.random()
  if (rand < .3) {
    return flik
  } else if (rand >= .3 && rand <= .6) {
    return dali
  } else return myrtle
}

export default {
  main,
  slightlyDark: purpleSlightlyDark,
  slightlyLight: purpleSlightlyLight,
  veryDark: purpleVeryDark,
  veryLight: purpleVeryLight,
  shadowVeryHeavy: '3px 20px 40px ' + alpha(.7, purpleVeryDark),
  shadowHeavy: '3px 10px 20px ' + alpha(.7, purpleVeryDark),
  shadowMedium: '2px 5px 10px ' + alpha(.8, purpleVeryDark),
  shadowLight: '2px 2px 8px ' + alpha(.9, purpleVeryDark),
  borderRadiusBoto: 15,
  emphasis: '#d64f31',
  shelly,
  shellyLight: lighten(.3, shelly),
  shellyDark: darken(.2, shelly),
  flik,
  flikLight: lighten(.3, flik),
  flikSemiLight: lighten(.2, flik),
  flikDark: darken(.2, flik),
  dali,
  daliLight: lighten(.3, dali),
  daliDark: darken(.2, dali),
  myrtle,
  myrtleLight: lighten(.3, myrtle),
  myrtleDark: darken(.2, myrtle),
  tweet,
  tweetLight: lighten(.3, tweet),
  tweetDark: darken(.2, tweet),
  pram: '#eee508',
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
  veryDarkTransparent: alpha(.5, purpleVeryDark),
}
