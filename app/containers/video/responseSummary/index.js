import React from 'react'
import Wavesurfer from 'react-wavesurfer'

import {cx} from '../../../utils/style'
import {Header} from '../../../global/styled'
import {
  ResponseSummaryRoot, ResponseSummaryTool, ResponseSummaryTools,  ContentRoot, ContentRow, ScriptText, RichContent, ContentTools,
  ContentTool,
} from './styled'
import {
  HeaderRoot,
} from '../styled'
import {lighten, darken} from 'polished'

import {makeEnum} from '../../../utils/lang'

const Mode = makeEnum([
  'summaryPreEnter',
])

export default class ResponseSummary extends React.Component {

  constructor() {
    super()

    this.timers = []
    this.state = {
      mode: Mode.summaryPreEnter,
      shouldAudioPlay: false,
    }
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  render() {
    const {
      mode
    } = this.state
    const {
      audioUrl,
      videoUrl,
      scriptText,
      themeColor,
      shouldAudioPlay,
    } = this.props
    const rowBasis = 100 * (1 / (+!!audioUrl + +!!videoUrl + +!!scriptText)) + '%'

    return (
      <ResponseSummaryRoot className={mode}>
        <HeaderRoot themeColor={themeColor}>
          <Header className='video-header summary'>
            your thoughts
          </Header>
        </HeaderRoot>

        <ContentRoot>
          {videoUrl &&
            <ContentRow style={{flexBasis: rowBasis}} delay={0}>
              <RichContent className='video-content'>
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  muted
                  loop />
              </RichContent>

              {this.renderContentTools()}
            </ContentRow>
          }
          {audioUrl &&
            <ContentRow style={{flexBasis: rowBasis}} delay={.2}>
              <RichContent>
                <Wavesurfer
                  options={{
                    loopSelection: true,
                    mediaControls: true,
                    height: 200,
                    progressColor: lighten(.2, themeColor),
                    waveColor: lighten(.3, themeColor),
                    cursorColor: darken(.1, themeColor)
                  }}
                  mediaControls={true}
                  audioFile={audioUrl}
                  playing={shouldAudioPlay} />
              </RichContent>

              {this.renderContentTools()}
            </ContentRow>
          }
          {scriptText &&
            <ContentRow style={{flexBasis: rowBasis}} delay={.4}>
              <RichContent>
                <ScriptText
                  readOnly
                  style={{height: window.innerHeight * .6 + 'px'}}
                  value={scriptText}
                  themeColor={themeColor} />
              </RichContent>

              {this.renderContentTools()}
            </ContentRow>
          }
        </ContentRoot>

        <ResponseSummaryTools themeColor={themeColor}>
          <ResponseSummaryTool
            onClick={this.props.goBack}
            themeColor={themeColor}>
            <div>think more thoughts</div>
          </ResponseSummaryTool>
          <ResponseSummaryTool themeColor={themeColor}>
            <div>nosedive</div>
          </ResponseSummaryTool>
        </ResponseSummaryTools>
      </ResponseSummaryRoot>
    )
  }

  renderContentTools() {
    return (
      <ContentTools>
        <ContentTool>
          <i className='fa fa-share' />
          <div>share</div>
        </ContentTool>
        <ContentTool>
          <i className='fa fa-download' />
          <div>download</div>
        </ContentTool>
        <ContentTool>
          <i className='fa fa-globe' />
          <div>submit</div>
        </ContentTool>
      </ContentTools>
    )
  }

}
