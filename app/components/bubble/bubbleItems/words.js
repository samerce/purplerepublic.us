import React from 'react'
import {Editor} from 'react-draft-wysiwyg'
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
  convertFromHTML,
  CompositeDecorator,
} from 'draft-js'
import Video from './video'
import Gallery from './gallery'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

import {
  Description, BubbleComponentRoot
} from './styled'

import {
  updateBuilderNucleus
} from '../../bubbleverse/actions'
import {cx} from '../../../utils/style'

// HACK: had to remove node_modules/draft-js/node_modules/immutable
// in order to get rid of thousands of warnings in console

const DefaultPlaceholder = 'fill me up with something alluring, dahling.'

@connect(d => ({
  editing: d.get('bubbleverse').get('isBubbleBuilderOpen'),
}))
export default class BubbleWords extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = this.makeState(props.nucleus.detailText)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state
  }

  componentDidUpdate(prevProps) {
    const {nucleus, editing} = this.props
    const {detailText, id} = nucleus
    if (id !== prevProps.nucleus.id || (editing !== prevProps.editing)) {
      this.setState(this.makeState(detailText))
    }
  }

  render() {
    const {editorState, isFocused, decorators} = this.state
    const {placeholder, editing, className, nucleus} = this.props
    const {images, detailText, galleryPosition} = nucleus
    let toolbarClassName = 'words-editor-toolbar'
    if (isFocused) toolbarClassName += ' visible'
    const classes = cx({
      [className]: 1,
      wordsRoot: 1,
      galleryFirst: galleryPosition === 'top',
    })
    return (
      <BubbleComponentRoot className={classes}>
        {detailText &&
          <Description>
            <Editor
              toolbar={ToolbarConfig}
              toolbarClassName={toolbarClassName}
              editorClassName='words-editor-textarea'
              editorState={editorState}
              customDecorators={decorators}
              placeholder={placeholder || DefaultPlaceholder}
              onEditorStateChange={this.onEditorChange}
              onFocus={() => this.setState({isFocused: true})}
              onBlur={() => this.setState({isFocused: false})}
              readOnly={!editing}
            />
          </Description>
        }
        {images && <Gallery nucleus={this.props.nucleus} />}
      </BubbleComponentRoot>
    )
  }

  @autobind
  onEditorChange(editorState) {
    this.setState({
      editorState,
    })
    this.props.dispatch(updateBuilderNucleus({
      detailText: convertToRaw(editorState.getCurrentContent()),
    }))
  }

  @autobind
  getDecorators() {
    const props = {
      remove: this.removeDecoratorComponent,
      editing: this.props.editing,
      nucleus: this.props.nucleus,
    }
    return [
      {
        strategy: Video.matchingStrategy,
        component: Video,
        props,
      },
      // {
      //   strategy: audioDetectionStrategy,
      //   component: Audio,
      //   props,
      // },
    ]
  }

  @autobind
  makeState(detailText) {
    return {
      editorState: createEditorState(detailText),
      decorators: this.getDecorators(),
    }
  }

  @autobind
  removeDecoratorComponent(text) {
    const contentState = this.state.editorState.getCurrentContent()
    let blockMap = contentState.getBlockMap()
    const blockMapJS = blockMap.toJS()
    for (let key in blockMapJS) {
      const block = blockMapJS[key]
      if (block.text === text) {
        blockMap = blockMap.filter(b => b.key !== key)
      } else if (block.text.includes(text)) {
        blockMap = blockMap.set(block.key, {
          ...block,
          text: block.text.replace(text, ''),
        })
      }
    }

    let editorState
    if (!blockMap.size) {
      editorState = EditorState.createEmpty()
    } else {
      const newContentState = contentState.set('blockMap', blockMap)
      editorState = EditorState.createWithContent(newContentState)
    }
    this.setState({editorState})
  }

}

function createEditorState(content) {
  let editorState
  if (!content) {
    editorState = EditorState.createEmpty()
  } else if (content.entityMap) {
    const contentState = convertFromRaw(content)
    editorState = EditorState.createWithContent(contentState)
  } else { // must be raw html
    const contentBlock = convertFromHTML(content)
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
      contentBlock.entityMap
    )
    editorState = EditorState.createWithContent(contentState)
  }
  return editorState
}

var ToolbarConfig = {
  options: [
    'inline', 'list', 'textAlign', 'blockType', 'fontFamily', 'fontSize',  'colorPicker',
    'embedded', 'emoji', 'link', 'remove', 'history',
  ],
  inline: {
    options: ['bold', 'italic', 'strikethrough'],
  },
  blockType: {
    options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'Code'],
  },
  textAlign: {
    inDropdown: true,
  },
  list: {
    inDropdown: true,
  },
  fontFamily: {
    options: [
      'IM Fell DW Pica', 'Rancho', 'Life Savers', 'Crete Round', 'Quattrocento',
      'Gloria Hallelujha', 'Goudy Bookletter 1911', 'Good Vibes'
    ],
  },
  link: {
    defaultTargetOption: '_blank',
  },
}
