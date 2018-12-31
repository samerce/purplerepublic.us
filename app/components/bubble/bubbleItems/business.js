import React from 'react'

import {
  Root, OptionBubble, OptionContent, OptionButton, OptionText,
  BuildingOption, SectionRoot, WildOption, SectionHeader,
  BuildingOptionHeader, BuildingOptionList, Feature, FeatureText,
  PreviousFeatures, BuildingButton,
} from './styled/business'

import autobind from 'autobind-decorator'

export default class MindfulBusiness extends React.Component {

  render() {
    return (
      <Root>
        <SectionRoot>
          <SectionHeader>
            <hr />
            <div>in the wild</div>
          </SectionHeader>

          {WildOptions.map(this.renderWildOption)}
        </SectionRoot>
        
        <SectionRoot>
          <SectionHeader>
            <hr />
            <div>in a building</div>
          </SectionHeader>

          {BuildingOptions.map(this.renderBuildingOption)}

          <BuildingButton>
            <div>open a shop solo</div>
          </BuildingButton>
          <BuildingButton>
            <div>open a shop with our help</div>
          </BuildingButton>
        </SectionRoot>
      </Root>
    )
  }

  renderWildOption(o, i) {
    return (
      <WildOption key={i}>
        <OptionBubble>
          <i className={'fa fa-' + o.icon} />
        </OptionBubble>

        <OptionContent>
          <OptionButton onClick={() => this.onClickWildOption(i)}>
            {o.buttonText}
          </OptionButton>
          <OptionText>
            {o.detailText}
          </OptionText>
        </OptionContent>
      </WildOption>
    )
  }

  renderBuildingOption(o, i) {
    return (
      <BuildingOption key={i}>
        <BuildingOptionHeader>
          <div>{o.title}</div>
        </BuildingOptionHeader>

        <BuildingOptionList>
          {o.includesFeaturesFrom &&
            <PreviousFeatures>
              <div>everything from {o.includesFeaturesFrom}</div>
              <i className='fa fa-plus' />
            </PreviousFeatures>
          }

          {o.features.map(feature => (
            <Feature>
              <i className='fa fa-check' />
              <FeatureText>
                {feature}
              </FeatureText>
            </Feature>
          ))}
        </BuildingOptionList>
      </BuildingOption>
    )
  }

  @autobind
  onClickWildOption(index) {

  }

}

var WildOptions = [
  {
    icon: 'hat',
    buttonText: 'represent the paradigm',
    detailText: 'become a poetcard salesperson. spread the paradigm at schools, universities, and on the streets.'
  },
  {
    buttonText: 'throw a ball',
    detailText: 'host an EYM event and spread the message of non-duality.'
  }
]

var BuildingOptions = [
  {
    icon: 'image',
    title: 'gallery',
    features: [
      'eym art prints',
      'eym poetcards',
      'eym clothing',
      'eym stationary',
      'eco goods',
      'spiritual & wellness goods',
      'raw bar',
      'paradigm art installs',
    ]
  },
  {
    icon: 'theater',
    title: 'venue',
    includesFeaturesFrom: 'gallery',
    features: [
      'performance venue',
      'cafe/bar',
      'art studio',
      'classrooms',
      'restaurant',
    ]
  },
  {
    icon: 'university',
    title: 'university',
    includesFeaturesFrom: 'venue',
    features: [
      'conferences',
      'workshops',
      'nonprofit programs',
      'leadership training',
      'experimental education',
    ]
  }
]
