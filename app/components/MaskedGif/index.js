import React from 'react'

import {
  Root,
} from './styled'

// require('gifler')
import autobind from 'autobind-decorator'

const MaskWidth = 1172
const MaskHeight = 659

export default class MaskedGif extends React.PureComponent {

  // constructor(props) {
  //   super(props)
  //   this.canvasId = 'gif' + Date.now()
  //   this.state = {
  //     isLoaded: false,
  //   }
  // }

  // componentDidMount() {
  //   if (this.props.isMasked) {
  //     this.mask = document.createElement('img');
  //     this.mask.crossOrigin = 'anonymous'
  //     this.mask.src = this.props.mask
  //     this.mask.onload = () => this.loadGif(this.props.gif)
  //   }
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.isMasked && nextProps.gif !== this.props.gif) {
  //     this.root.removeChild(document.getElementById(this.canvasId))
  //     const canvas = document.createElement('canvas')
  //     canvas.id = this.canvasId
  //     this.root.appendChild(canvas)
  //     this.loadGif(nextProps.gif)
  //   }
  // }

  render() {
    const {className, isMasked, gif, mask} = this.props
    return (
      <Root innerRef={r => this.root = r} className={className}>
        {isMasked &&
          <img src={mask} className='mask' />
        }
        <img src={gif} />
      </Root>
    )
  }

  // @autobind
  // loadGif(gif) {
  //   gifler(gif).frames(`#${this.canvasId}`, this.onDrawFrame)
  // }
  //
  // @autobind
  // onDrawFrame(ctx, frame) {
  //   this.setLoaded()
  //
  //   const {canvas} = ctx
  //   const {offsetWidth: parentWidth, offsetHeight: parentHeight} = this.root
  //   let gifStartX = 0
  //   let gifStartY = 0
  //
  //   if (this.props.isMasked) {
  //     canvas.width  = MaskWidth
  //     canvas.height = MaskHeight
  //     ctx.drawImage(this.mask, 0, 0, MaskWidth, MaskHeight)
  //     ctx.globalCompositeOperation = 'source-atop'
  //
  //     gifStartX = (MaskWidth - frame.width) / 2
  //     gifStartY = (MaskHeight - frame.height) / 2
  //   } else {
  //     canvas.width = parentWidth
  //     canvas.height = parentHeight
  //   }
  //
  //   ctx.shadowBlur = 50
  //   ctx.shadowColor = 'black'
  //   ctx.shadowOffsetX = 10;
  //   ctx.shadowOffsetY = 10;
  //   ctx.drawImage(frame.buffer, gifStartX, gifStartY, frame.width, frame.height)
  // }
  //
  // @autobind
  // setLoaded() {
  //   if (!this.state.isLoaded) {
  //     this.setState({isLoaded: true})
  //     this.props.onLoad && this.props.onLoad()
  //   }
  // }

}
