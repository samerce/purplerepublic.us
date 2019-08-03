import React from 'react'

import {
  Root,
} from './styled'

require('gifler')
import autobind from 'autobind-decorator'

export default class MaskedGif extends React.PureComponent {

  constructor(props) {
    super(props)
    this.canvasId = 'gif' + Date.now()
    this.state = {
      isLoaded: false,
    }
  }

  componentDidMount() {
    // this.mask = document.createElement('img');
    // this.mask.crossOrigin = 'anonymous'
    // this.mask.src = this.props.mask
    // this.mask.onload = () => {
      // gifler(this.props.gif).frames(`#${this.canvasId}`, this.onDrawFrame)
    // }
  }

  render() {
    return (
      <Root innerRef={r => this.root = r} className={this.props.className}>
        {/* <canvas id={this.canvasId} /> */}
        <img src={this.props.gif} />
      </Root>
    )
  }

  @autobind
  onDrawFrame(ctx, frame) {
    this.setLoaded()

    const {canvas} = ctx
    const {offsetWidth: parentWidth, offsetHeight: parentHeight} = this.root

    canvas.width  = parentWidth
    canvas.height = parentHeight

    ctx.shadowBlur = 50
    ctx.shadowColor = 'black'
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    // if (this.props.isMasked) {
    //   ctx.drawImage(this.mask, 0, 0, parentWidth, parentHeight)
    //   ctx.globalCompositeOperation = 'source-atop'
    // }

    const {width: gifWidth, height: gifHeight} = frame
    const offsetX = (parentWidth - gifWidth) / 2
    const drawWidth = gifWidth - (parentWidth - gifWidth) / 2

    ctx.drawImage(frame.buffer, 0, 0, frame.width, frame.height)
  }

  @autobind
  setLoaded() {
    if (!this.state.isLoaded) {
      this.setState({isLoaded: true})
      this.props.onLoad && this.props.onLoad()
    }
  }

}
