import React from 'react';
import {Header, CatchLine} from '../../global/styled'
import {
  Root, Background, BodyCircle, BodyCircleRight, ByLineRight,
  ByLine, BackgroundArea, ContentArea, Page, Separator,
} from './styled'
import Landing from './Landing'
import Awakening from './Awakening'
import Exploration from './Exploration'
import Transparent from './Transparent'
import Learning from './Learning'
import Defense from './Defense'

export default class Politics extends React.PureComponent {
  render() {
    return (
      <Page>
        <Landing />
        <Separator />
        <Awakening />
        <Separator />
        <Transparent />
        <Separator />
        <Learning/>
        <Separator />
        <Defense/>
      </Page>
    )
  }
}
