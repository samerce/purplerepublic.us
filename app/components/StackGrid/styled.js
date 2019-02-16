import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, screen,
} from '../../global/styled'

export const Root = Flex.extend`
  flex: 0 0 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 0 40px;
`

export const StacksRoot = Flex.extend`
  flex: 0 0 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  ${screen.medium`
    justify-content: space-around;
  `}
`

export const StackRoot = Flex.extend`
  flex: 0 1 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  margin: 10px 20px 30px;
  cursor: pointer;

  ${screen.medium`
    flex: 0 0 33%;
    min-width: 140px;
  `}
  ${screen.mediumlarge`
    flex: 0 0 25%;
  `}
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
  border: 1px solid ${p => p.theme.shellyLight};
  background: ${p => p.theme.shelly};
  border-radius: 10px;
  padding: 5px 20px;
  ${'' /* box-shadow: 1px 1px 50px black; */}
  margin: 25px 0 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  letter-spacing: 1px;
  text-align: left;
  text-shadow: 1px 1px black;
  opacity: .9;

  ${StackRoot}:hover & {
    background: white;
    color: ${p => p.theme.veryDark};
    border-color: ${p => p.theme.veryDark};
    text-shadow: none;
    opacity: 1;
  }
`

export const Blurb = styled.div`
  flex: 0 1 500px;
  max-width: 780px;
  background: ${p => p.theme.veryDark};
  color: ${p => p.theme.veryLight};
  font-size: 24px;
  padding: 70px 20px 20px;
  border-radius: 10px;
  border: 1px solid ${p => p.theme.veryLight};
  text-align: center;
  transform: translate(0, -70px);

  span {
    text-decoration: underline;
    cursor: pointer;
  }

  ${screen.medium`
    flex: 0 0 90%;
    font-size: 20px;
  `}
`
