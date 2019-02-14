import React from 'react'
import Video from '../Video'

import {
  VideoRoot, Button,
} from './styled'
import {
  WidgetRoot
} from '../../global/styled'

import {openInNewTab} from '../../utils/nav'
import autobind from 'autobind-decorator'

import {YOUTUBE_URL} from '../../global/constants'

export default class YouTubeWidget extends React.PureComponent {

  render() {
    return (
      <WidgetRoot>
        <VideoRoot>
          <i className='fa fa-youtube' />
          <Video
            id='KVMFDuSPq68'
            width={() => Math.min(400, window.innerWidth * .95)}
          />
        </VideoRoot>

        <Button onClick={this.openChannel}>
          <div>go to youtube</div>
        </Button>
      </WidgetRoot>
    )
  }

  @autobind
  openChannel() {
    openInNewTab(YOUTUBE_URL)
  }

}
