import React from 'react'
import TimedTextBlurb from '../timedTextBlurb'
import {HeroBubbleConfig} from '../bubble/config'

import {
  Blurb, Image, Row, Button,
} from './styled'
import {
  Title
} from '../MediumWidget/styled'
import {
  WidgetRoot,
} from '../../global/styled'

import {setActiveGratitude} from '../bubble/redux/actions'
import {openInNewTab} from '../../utils/nav'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

import {SRC_URL} from '../../global/constants'

@connect(d => ({}))
export default class PatreonWidget extends React.PureComponent {

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <WidgetRoot>
        <Row>
          <Image src={SRC_URL + 'bubbles/patreon/dave-carrot.jpg'} />
          <Blurb>
            <i className='fa fa-heart' />
            patron of the month: jewnicorn dave and his mustachioed carrot!<br />want art for a cause? join the club.
          </Blurb>
        </Row>

        <Button onClick={this.onClickButton}>
          <div>become a patron</div>
        </Button>
      </WidgetRoot>
    )
  }

  @autobind
  onUpdateIndex(newIndex) {
    this.props.dispatch(setActiveGratitude(newIndex))
  }

  @autobind
  onClickButton() {
    openInNewTab('https://www.patreon.com/expressyourmess')
  }

}
