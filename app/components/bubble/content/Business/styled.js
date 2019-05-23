import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../../../global/constants'
import {
  AbsoluteFlexFillParent, BlurbBubble, BlurbContent, BlurbButton, BlurbText,
  Flex, SectionHeader as aSectionHeader, FlexColumn, Boto, screen,
} from '../../../../global/styled'
import {
  BubbleComponentRoot
} from '../styled'

export const Root = BubbleComponentRoot.extend`
`

export const SectionRoot = Flex.extend`
  width: 100%;
  flex-wrap: wrap;
  margin: 0 10px 40px;
  justify-content: center;

  ${screen.medsmall`
    flex-direction: column;
    align-items: center;
  `}
`

export const SectionHeader = aSectionHeader.extend`
  margin: 0 0 60px;
  flex: 0 0 auto;
`

export const WildOption = Flex.extend`
  max-width: 740px;
  margin: 0 auto 20px;
  flex: 1 0 50%;
  padding: 0 10px;

  ${screen.medsmall`
    flex: 0 0 auto;
  `}
`

export const OptionBubble = BlurbBubble.extend`
  opacity: 1;
  transform: none;
  flex: 0 0 100px;
  height: 100px;
  margin: -20px -20px 0 0;
`

export const OptionContent = BlurbContent.extend`
  opacity: 1;
  transform: none;
  flex: 1;
`

export const OptionButton = BlurbButton.extend`
  opacity: 1;
  transform: none;
  font-size: 24px;
  flex: 0 0 60px;
`

export const OptionText = BlurbText.extend`
  opacity: 1;
  transform: none;
`

export const BuildingOptionsGroup = Flex.extend`
  width: 100%;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
`

export const BuildingOption = FlexColumn.extend`
  border-radius: 10px;
  border: 1px solid ${p => p.theme.daliDark};
  padding: 10px 15px;
  margin: 0 10px;
  background: ${p => p.theme.daliLight};
  flex: 1 0 250px;
  color: ${p => p.theme.daliDark};
  cursor: pointer;
  transition: all .3s ${EASE_OUT};
  max-width: 300px;

  &:hover {
    background: ${p => p.theme.veryLight};
    color: ${p => p.theme.veryDark};
    border-color: ${p => p.theme.veryDark};
  }

  ${screen.medsmall`
    margin: 20px 0;
  `}
`

export const BuildingOptionHeader = Flex.extend`
  align-items: center;
  justify-content: center;
  color: inherit;
  border-bottom: 1px solid ${p => p.theme.shelly};
  font-size: 30px;
  font-family: alice;
  padding: 0 0 10px;
  font-weight: 800;

  ${BuildingOption}:hover & {
    border-color: inherit;
  }
`

export const BuildingOptionList = FlexColumn.extend`
  padding: 10px 0;
`

export const Feature = Flex.extend`
  align-items: center;
  margin: 5px 0;

  i {
    padding: 0 10px;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    transition: all .3s ${EASE_OUT};
    color: ${p => p.theme.shelly};
  }
`

export const FeatureText = Flex.extend`
  color: inherit;
  font-size: 22px;
`

export const PreviousFeatures = FeatureText.extend`
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 24px;
  color: ${p => p.theme.shelly};

  ${BuildingOption}:hover & {
  }

  i {
    width: 100%;
    font-size: 30px;
    padding: 10px 0;
    transition: all .3s ${EASE_OUT};
  }
`

export const ButtonGroup = FlexColumn.extend`
  flex: 0 0 auto;
  align-items: center;
`

export const BuildingButton = Boto.extend`
  margin: 20px 0 0;
  padding: 10px 30px;

  &:last-child {
    margin: 10px 0 0;
  }

  ${screen.medsmall`
  `}
`
