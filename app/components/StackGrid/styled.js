import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto,
} from '../../global/styled'

export const Root = Flex.extend`
  flex: 0 0 100%;
  margin: 40px 0 0;
  padding: 20px 0 0;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: ${p => p.theme.gradientVeryDark};
  box-shadow: ${p => p.theme.shadowHeavy};
  background-attachment: fixed;
`

export const StackRoot = Flex.extend`
  flex: 1 0 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  margin: 10px 20px 30px;
  cursor: pointer;
`

export const CircleRoot = Flex.extend`
  position: relative;
  width: 100%;
  height: 130px;
  justify-content: center;
  transform: rotate(${p => p.rotate}deg);
`

const Circle = Flex.extend`
  border-radius: 100%;
  width: 100px;
  height: 100px;
  box-shadow: 2px 2px 20px ${p => p.theme.veryDark};
  position: absolute;
  align-self: center;
  background: url('${p => p.src}');
  background-size: cover;
  border: 2px solid ${p => p.theme.veryLight};
`

export const CircleAmy = Circle.extend`
  ${'' /* background: ${p => lighten(.1, p.theme.main)}; */}
  transform: translate(25px, 25px);
`

export const CircleSue = Circle.extend`
  ${'' /* background: ${p => p.theme.slightlyLight}; */}
  transform: translate(-25px, 25px);
`

export const CirclePat = Circle.extend`
  ${'' /* background: ${p => p.theme.main}; */}
  transform: translate(0, -25px);
`

export const Title = Boto.extend`
  color: white;
  font-size: 20px;
  font-family: alice;
  z-index: 2;
  user-select: none;
  border: 2px solid ${p => p.theme.veryLight};
  border-radius: 30px;
  padding: 5px 20px;
  box-shadow: ${p => p.theme.shadowHeavy};
  margin: 25px 0 0;

  ${StackRoot}:hover & {
    background: ${p => p.theme.veryLight};
    color: ${p => p.theme.veryDark};
    border-color: ${p => p.theme.veryDark};
  }
`
