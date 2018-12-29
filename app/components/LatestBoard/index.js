import React from 'react'
import BubbleButton from '../bubble/bubbleButton'
import InstagramWidget from '../InstagramWidget'

import {
  Root,
} from './styled'
import {
  SectionHeader
} from '../../global/styled'

import autobind from 'autobind-decorator'

export default class LatestBoard extends React.Component {

  render() {
    return (
      <Root>
        <SectionHeader>
          <hr />
          <div>latest</div>
        </SectionHeader>

        <InstagramWidget
          className='latest-instagram'
        />
        <BubbleButton
          className='latest-patreon'
          onClick={this.onClickInstagram}
          nucleus={patreon}
        />
      </Root>
    )
  }

  @autobind
  onClickInstagram() {

  }

}

var patreon = {
	"title": "become a patron",
	"subtitle": "join our club",
	"size": 200,
	"type": "words",
	"tags": "getinvolved",
	"detailText": {
		"blocks": [{
			"key": "2p015",
			"text": "signed prints of original art delivered to your door each month for as little as $10.",
			"type": "unstyled",
			"depth": 0,
			"inlineStyleRanges": [{
				"offset": 81,
				"length": 3,
				"style": "fontfamily-Quattrocento"
			}],
			"entityRanges": [],
			"data": {}
		}, {
			"key": "8a436",
			"text": "interested? click become a patron below.",
			"type": "unstyled",
			"depth": 0,
			"inlineStyleRanges": [{
				"offset": 18,
				"length": 15,
				"style": "BOLD"
			}, {
				"offset": 18,
				"length": 15,
				"style": "ITALIC"
			}],
			"entityRanges": [],
			"data": {}
		}],
		"entityMap": {}
	},
	"id": "patreon",
	"nextBubbleId": "instagram",
	"actions": [{
		"type": "OpenLink",
		"text": "become a patron",
		"props": {
			"url": "https://www.patreon.com/expressyourmess"
		}
	}],
	"buttonType": "patreon"
}
