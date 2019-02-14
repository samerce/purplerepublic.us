import React from 'react'
import InstagramWidget from '../InstagramWidget'
import PatreonWidget from '../PatreonWidget'
import YouTubeWidget from '../YoutubeWidget'
import MediumWidget from '../MediumWidget'
import AnnouncementWidget from '../AnnouncementWidget'
import SoundCloudWidget from '../SoundCloudWidget'
import StackGrid from '../StackGrid'

import {
  Root,
} from './styled'
import {
  SectionHeader
} from '../../global/styled'

export default class LatestBoard extends React.Component {

  render() {
    return (
      <Root>
        <SectionHeader>
          <hr />
          <div>corkboard</div>
        </SectionHeader>

        <StackGrid />
        <InstagramWidget />
        <YouTubeWidget />
        <PatreonWidget />
        <MediumWidget />
        <SoundCloudWidget />
      </Root>
    )
  }

}
