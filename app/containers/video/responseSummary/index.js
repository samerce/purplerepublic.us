import React from 'react'
import Wavesurfer from 'react-wavesurfer'
import Spinner from '../../../components/spinnie'

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

import {
  SCREEN_WIDTH_M,
} from '../../../global/constants'

import autobind from 'autobind-decorator'
import {makeEnum} from '../../../utils/lang'

const MAX_BLOB_SIZE = 1073741824 // ~1GB

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
      submissions: {},
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
      audioBlob,
      videoData,
      scriptText,
      themeColor,
      shouldAudioPlay,
    } = this.props
    const rowBasis = 100 * (1 / (+!!audioBlob + +!!videoData + +!!scriptText)) + '%'

    return (
      <ResponseSummaryRoot className={mode}>
        <HeaderRoot themeColor={themeColor}>
          <Header className='video-header summary'>
            your thoughts
          </Header>
        </HeaderRoot>

        <ContentRoot>
          {videoData &&
            <ContentRow style={{flexBasis: rowBasis}} delay={0}>
              <RichContent className='video-content'>
                <video
                  src={videoData.url}
                  controls
                  autoPlay
                  muted
                  loop />
              </RichContent>

              {this.renderContentTools(videoData.blob, 'video')}
            </ContentRow>
          }
          {audioBlob &&
            <ContentRow style={{flexBasis: rowBasis}} delay={.2}>
              <RichContent className='audio-content'>
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
                  audioFile={audioBlob}
                  playing={shouldAudioPlay} />
              </RichContent>

              {this.renderContentTools(audioBlob, 'audio')}
            </ContentRow>
          }
          {scriptText &&
            <ContentRow style={{flexBasis: rowBasis}} delay={.4}>
              <RichContent>
                <ScriptText
                  readOnly
                  style={{
                    height: (window.innerWidth > SCREEN_WIDTH_M)?
                      window.innerHeight * .6 + 'px' :
                      '100%'
                  }}
                  value={scriptText}
                  themeColor={themeColor} />
              </RichContent>

              {this.renderContentTools(this.makeScriptTextBlob(), 'text')}
            </ContentRow>
          }
        </ContentRoot>

        <ResponseSummaryTools themeColor={themeColor}>
          <ResponseSummaryTool
            onClick={this.goBack}
            themeColor={themeColor}>
            <div>think more thoughts</div>
          </ResponseSummaryTool>
          <ResponseSummaryTool
            onClick={() => window.location = '#outro'}
            themeColor={themeColor}>
            <div>get me out of here</div>
          </ResponseSummaryTool>
        </ResponseSummaryTools>
      </ResponseSummaryRoot>
    )
  }

  @autobind
  renderContentTools(data, type) {
    const {submissions} = this.state
    const pending = submissions[type] === 'pending'
    const submitted = submissions[type] === 'submitted'
    return (
      <ContentTools>
        <ContentTool onClick={this[type + 'Download']}>
          <i className='fa fa-download' />
          <div>download</div>
        </ContentTool>
        <ContentTool onClick={this.uploadBlob.bind(this, data, type)}>
          <i className='fa fa-globe' />
          {pending &&
            <div style={{position: 'relative', margin: '0 10px'}}>
              <Spinner show />
            </div>
          }
          {submitted &&
            <div>submitted!</div>
          }
          {!pending && !submitted &&
            <div>submit</div>
          }
        </ContentTool>
      </ContentTools>
    )
  }

  @autobind
  goBack() {
    this.setState({submissions: {}})
    this.props.goBack()
  }

  @autobind
  videoDownload() {
    const {url, blob} = this.props.videoData
    const a = document.createElement('a')
    a.href = url
    a.download = 'purple republic video response.' + getBlobType(blob)
    a.click()
  }

  @autobind
  audioDownload() {
    const {audioBlob} = this.props
    const a = document.createElement('a')
    a.href = URL.createObjectURL(audioBlob)
    a.download = 'purple republic audio response.' + getBlobType(audioBlob)
    a.click()
  }

  @autobind
  textDownload() {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(this.makeScriptTextBlob())
    a.download = 'purple republic script response.txt'
    a.click()
  }

  makeScriptTextBlob() {
    return new Blob([this.props.scriptText], {type: 'text/plain'})
  }

  uploadBlob(blob, type) {
    if (this.state.submissions[type]) return
    if (blob.size > MAX_BLOB_SIZE) return showTooBigAlert()

    this.setState({
      submissions: {
        ...this.state.submissions,
        [type]: 'pending',
      }
    })

    const body = new FormData()
    body.append('blob', blob)

    fetch('/submissions.upload', {
      method: 'post',
      body,
    }).then(responseRaw => {
      console.log('finished uploading ' + type, responseRaw)
      this.setState({
        submissions: {
          ...this.state.submissions,
          [type]: 'submitted',
        }
      })
    }).catch(e => {
      console.warning('failed uploading ' + type, e)
    })
  }

}

function getBlobType(blob) {
  return blob.type.split('/')[1].split(';')[0]
}

function showTooBigAlert() {
  alert('whoopsie-poopsie! we applaud your work, but the video is too big for us to handle. please go back and record a shorter one. <3')
}
