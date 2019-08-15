import React from 'react'

import {
  Root, Text, Mangina, Queer, AwareRoot, StillHereRoot, Button, HideDuration,
} from './styled'
import {
  FlexColumn
} from '../../global/styled'

import resizable from '../hocs/resizable'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'

import {SRC_URL} from '../../global/constants'

@connect(d => ({
  view: d.get('gaiaverse').get('mode'),
}))
@resizable()
export default class Intro extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      sceneIndex: 0,
    }
  }

  onResize() {
  }

  componentDidMount() {
    const currentScene = Scenes[this.state.sceneIndex]
    setTimeout(this.advanceScene, currentScene.duration)
  }

  @autobind
  advanceScene() {
    const nextSceneIndex = this.state.sceneIndex + 1
    const nextScene = Scenes[nextSceneIndex]

    this.setState({sceneIndex: nextSceneIndex})

    if (nextScene.duration) {
      setTimeout(this.advanceScene, nextScene.duration)
    }
  }

  render() {
    const {sceneIndex, view} = this.state
    return (
      <Root className={view}>
        {Scenes[sceneIndex].render(this)}
      </Root>
    )
  }

  @autobind
  close() {
    this.setState({view: 'hiding'})
    setTimeout(() => this.setState({view: 'hidden'}), HideDuration)
  }

}

var Scenes = [
  {
    render: () => <Text>fuck</Text>,
    duration: 1000,
  },
  {
    render: () => <Text>patriarchy</Text>,
    duration: 1000,
  },
  {
    render: () => <Mangina><img src={SRC_URL + 'commons/mangina.jpg'} /></Mangina>,
    duration: 2000,
  },
  {
    render: () => <Queer><img src={SRC_URL + 'commons/queerforever.gif'} /></Queer>,
    duration: 2000,
  },
  {
    render: (props) => (
      <FlexColumn>
        <AwareRoot><span>a</span>war<span>e</span></AwareRoot>
        <StillHereRoot>
          <Text>still with us?</Text>
          <Button onClick={props.close}>fuck yeah!</Button>
        </StillHereRoot>
      </FlexColumn>
    ),
  },
]
