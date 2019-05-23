import React from 'react'
import Spinnie from '../../spinnie'
import UnoSelectPill from '../../unoSelectPill'
import {
  BubbleBuilderNameTool,
  BubbleBuilderButtonTool,
  BubbleBuilderJourneyTool,
} from '../bubbleBuilderTools'
import Gallery from '../bubbleItems/gallery'

import {
  Root, PropertiesSection, PropertiesSectionTitle, PublishingMask, PropertyInput,
} from './styled'
import {
  ToolBar, ToolBarItem,
} from '../../../global/styled'
import theme from '../../../global/theme'

import {cx} from '../../../utils/style'
import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import withTransitions from '../../hocs/withTransitions'
import {
  updateBuilderNucleus, closeBubbleBuilder, didPublishBubble, openBubbleverse,
} from '../../bubbleverse/actions'

import {BubbleType, BubbleComponents} from '../config'
import {SRC_URL} from '../../../global/constants'

const LOCAL_NUCLEUS_KEY = 'purple.republic.editingBubbleNucleus.'

@connect(d => ({
  nucleus: d.get('bubbleverse').get('activeBubble'),
  isBubbleBuilderOpen: d.get('bubbleverse').get('isBubbleBuilderOpen'),
  dimension: d.get('bubbleverse').get('dimension'),
  bubbles: d.get('bubbleverse').get('bubbles'),
}))
@withTransitions({prefix: 'bubbleBuilder'})
export default class BubbleBuilder extends React.PureComponent {

  constructor(props) {
    super(props)

    this.timers = []
    this.state = getDefaultState()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isBubbleBuilderOpen && !this.props.isBubbleBuilderOpen) {
      this.setState(getDefaultState())
      this.props.show()
      window.onbeforeunload = () => true
    } else if (!nextProps.isBubbleBuilderOpen && this.props.isBubbleBuilderOpen) {
      this.props.hide()
      window.onbeforeunload = null
    }
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  render() {
    const {className, isBubbleBuilderOpen, nucleus} = this.props
    if (!isBubbleBuilderOpen) return null

    return (
      <Root className={className}>
        <PublishingMask show={this.state.isPublishing}>
          <Spinnie show={true} />
        </PublishingMask>

        <PropertiesSection>
          <PropertiesSectionTitle>
            <div>properties</div>
          </PropertiesSectionTitle>
          <BubbleBuilderNameTool
            nucleus={nucleus}
            verifyBubbleIdExists={this.verifyBubbleIdExists}
            onChangeNucleus={this.onChangeNucleus}
          />
          {Gallery.renderCustomBuilderTools(
            nucleus,
            this.onChangeNucleus
          )}
        </PropertiesSection>

        <PropertiesSection>
          <PropertiesSectionTitle>
            <div>action</div>
          </PropertiesSectionTitle>
          <BubbleBuilderButtonTool
            nucleus={nucleus}
            onChangeNucleus={this.onChangeNucleus} />
        </PropertiesSection>

        <PropertiesSection className='first'>
          <PropertiesSectionTitle>
            <div>pre-built component</div>
          </PropertiesSectionTitle>
          <PropertyInput
            onKeyPress={this.onKeyPressComponentInput}
            placeholder='component name'
            value={this.state.componentName || nucleus.componentName}
            onChange={this.onChangeComponentName}
            onBlur={this.onBlurComponentInput}
            innerRef={r => this.componentInput = r}
          />
        </PropertiesSection>

        <ToolBar themeColor={theme.main} className='bubbleBuilderToolbar'>
          <ToolBarItem themeColor={theme.main} onClick={this.quit}>
            <div>quit bubble builder</div>
          </ToolBarItem>
          <ToolBarItem themeColor={theme.main} onClick={this.publish}>
            <div>publish bubble!</div>
          </ToolBarItem>
        </ToolBar>
      </Root>
    )
  }

  @autobind
  quit() {
    if (confirm('erase all your work on this bubble?')) {
      this.props.dispatch(closeBubbleBuilder())
      this.props.dispatch(openBubbleverse(this.props.dimension))
    }
  }

  @autobind
  onChangeNucleus(nucleus) {
    this.props.dispatch(updateBuilderNucleus(nucleus))
  }

  @autobind
  onBlurComponentInput() {
    this.onChangeNucleus({componentName: this.componentInput.value})
  }

  @autobind
  onKeyPressComponentInput(e) {
    if (e.key === 'Enter') {
      e.target.blur()
    }
  }

  @autobind
  onChangeComponentName(e) {
    this.setState({componentName: e.target.value.trim()})
  }

  @autobind
  verifyBubbleIdExists(id) {
    return this.props.bubbles.find(b => b.id === id)
  }

  @autobind
  publish() {
    const {nucleus, dimension} = this.props
    const {id, imageUrl, existingIndex} = nucleus

    if (!id) {
      alert('your new bubble gotsta have a name!')
      return document.getElementById('bubbleBuilderNameToolInput').focus()
    }

    const newBubble = {
      ...nucleus,
      dimension,
      imageUrl: undefined,
      existingIndex: undefined,
      Component: undefined,
    }
    const bubbleProps = JSON.stringify(newBubble)

    let body = `bubbleProps=${encodeURIComponent(bubbleProps)}`
    if (imageUrl && imageUrl.includes('base64')) {
      body += '&imageData=' + encodeURIComponent(imageUrl)
    }
    if (existingIndex >= 0) {
      body += '&existingBubbleIndex=' + existingIndex
    }

    this.setState({isPublishing: true,})
    fetch('/bubbles.upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body,
    }).then(() => {
      this.setState({isPublishing: false})
      this.props.dispatch(didPublishBubble(newBubble))
      this.props.dispatch(closeBubbleBuilder())
      setTimeout(() => window.location = '/#start/bubble/' + newBubble.id, 500)
    })
  }

}

function getDefaultState() {
  return {
    isUploadingImage: false,
    isPublishing: false,
  }
}

function getStoredNucleus(type) {
  const rawNucleus = window.localStorage.getItem(LOCAL_NUCLEUS_KEY + type)
  return JSON.parse(rawNucleus)
}

function storeNucleus(nucleus) {
  window.localStorage.setItem(
    LOCAL_NUCLEUS_KEY + nucleus.type,
    JSON.stringify({
      ...nucleus,
      Component: undefined,
    })
  )
}
