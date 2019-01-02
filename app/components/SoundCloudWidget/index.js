import React from 'react'

import {
  EmbedRoot, Button,
} from './styled'
import {
  WidgetRoot
} from '../../global/styled'

import {openInNewTab} from '../../utils/nav'
import autobind from 'autobind-decorator'

import {SOUNDCLOUD_URL} from '../../global/constants'

export default class SoundCloudWidget extends React.PureComponent {

  render() {
    return (
      <WidgetRoot>
        <EmbedRoot>
          <i className='fa fa-soundcloud' />
          <iframe width="100%" height="200" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/443130156&color=%23f40aca&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
        </EmbedRoot>

        <Button onClick={this.openSoundCloud}>
          <div>go to soundcloud</div>
        </Button>
      </WidgetRoot>
    )
  }

  @autobind
  openSoundCloud() {
    openInNewTab(SOUNDCLOUD_URL)
  }

}
