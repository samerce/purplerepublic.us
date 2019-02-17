import React from 'react'

import {
  Blurb, Button, Title,
} from './styled'
import {
  WidgetRoot
} from '../../global/styled'

import {openInNewTab} from '../../utils/nav'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

import {MEDIUM_URL} from '../../global/constants'

@connect(d => ({
}))
export default class MediumWidget extends React.PureComponent {

  render() {
    return (
      <WidgetRoot>
        <Blurb>
          <i className='fa fa-medium' />
          <div>...say you started to believe the universe to be a continuous fabric. say you set your mind, your body, your moment in jelly. one that stretches over your skin into your rectum, over your eyelids, onto your mom’s arm hairs and donald trump’s toenails. hugging the deepest-dwelling sea creatures … and the stars that make up orion’s belt, and all in between.</div>
        </Blurb>

        <Button onClick={this.openArticle}>
          <div>continue reading</div>
        </Button>
      </WidgetRoot>
    )
  }

  @autobind
  openArticle() {
    ga('send', 'event', {
      eventCategory: 'corkboard',
      eventAction: 'medium clicked',
    })
    openInNewTab(MEDIUM_URL)
  }

}
