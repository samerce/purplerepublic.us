import React from 'react'

import {
  Root, Mangina, Queer, AwareRoot, StillHereRoot, Button, HideDuration,
  Loading, Fuck, Patriarchy, ContinueRoot
} from './styled'

import autobind from 'autobind-decorator'

import {SRC_URL} from '../../global/constants'

export default class Intro extends React.PureComponent {

  constructor() {
    super()
    this.loadedImages = 0
    this.state = {
      sceneIndex: 0,
      imagesLoaded: false,
      loaderDone: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loaderDone: true})
      if (this.state.imagesLoaded) {
        this.advanceScene()
      }
    }, 1500)
  }

  @autobind
  advanceScene() {
    const nextSceneIndex = this.state.sceneIndex + 1
    const nextSceneDuration = SceneDurations[nextSceneIndex]

    this.setState({sceneIndex: nextSceneIndex})

    if (nextSceneDuration) {
      setTimeout(this.advanceScene, nextSceneDuration)
    }
  }

  render() {
    const {sceneIndex, view} = this.state
    return (
      <Root className={view + ' scene-' + sceneIndex}>
        <Loading><i className='fa fa-superpowers' /></Loading>
        <Fuck>fuck</Fuck>
        <Patriarchy>patriarchy</Patriarchy>
        <Mangina>
          <img src={SRC_URL + 'commons/mangina.jpg'}
            onLoad={this.onImageLoad} />
        </Mangina>
        <Queer>
          <img src={SRC_URL + 'commons/queerforever.gif'}
            onLoad={this.onImageLoad} />
        </Queer>
        <ContinueRoot>
          <AwareRoot><span>a</span>war<span>e</span></AwareRoot>
          <StillHereRoot>
            <div>still with us?</div>
            <Button onClick={this.close}>fuck yeah!</Button>
          </StillHereRoot>
        </ContinueRoot>
      </Root>
    )
  }

  @autobind
  onImageLoad(image) {
    this.loadedImages++
    if (this.loadedImages == 2) {
      this.setState({imagesLoaded: true})
      if (this.state.loaderDone) {
        this.advanceScene()
      }
    }
  }

  @autobind
  close() {
    this.setState({view: 'hiding'})
    setTimeout(() => this.setState({view: 'hidden'}), HideDuration)
  }

}

var SceneDurations = [
  null,
  1000,
  1000,
  2000,
  2000,
]
