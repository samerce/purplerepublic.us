import React from 'react'
import {Editor} from 'react-draft-wysiwyg'
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
  convertFromHTML,
} from 'draft-js'

import draftToHtml from 'draftjs-to-html'
import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

import {
  Description, BubbleComponentRoot
} from './styled'

import {
  updateBuilderNucleus
} from '../../bubbleverse/actions'

// HACK: had to remove node_modules/draft-js/node_modules/immutable
// in order to get rid of thousands of warnings in console

const DefaultPlaceholder = 'fill me up with something alluring, dahling.'

@connect(d => ({
  editing: d.get('bubbleverse').get('isBubbleBuilderOpen'),
}))
export default class BubbleWords extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      editorState: createEditorState(props.nucleus.detailText),
      html: getHTML(props.nucleus.detailText),
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state
  }

  componentDidUpdate(prevProps) {
    const {nucleus, editing} = this.props
    const {detailText, id} = nucleus
    if (id !== prevProps.nucleus.id || (editing !== prevProps.editing)) {
      this.setState({
        editorState: createEditorState(detailText),
        html: getHTML(detailText),
      })
    }
  }

  render() {
    const {editorState, html, isFocused} = this.state
    const {placeholder, editing, className} = this.props
    let toolbarClassName = 'words-editor-toolbar'
    if (isFocused) toolbarClassName += ' visible'
    return (
      <BubbleComponentRoot className={className + ' wordsRoot'}>
        <Description>
          {editing &&
            <Editor
              toolbar={ToolbarConfig}
              toolbarClassName={toolbarClassName}
              editorClassName='words-editor-textarea'
              editorState={editorState}
              placeholder={placeholder || DefaultPlaceholder}
              onEditorStateChange={this.onEditorChange}
              onFocus={() => this.setState({isFocused: true})}
              onBlur={() => this.setState({isFocused: false})}
            />
          }
          {!editing && html &&
            <div dangerouslySetInnerHTML={{__html: html}} />
          }
        </Description>
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

function getHTML(content) {
  if (content && content.entityMap) {
    return draftToHtml(content)
  }
  return content
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
      'Gloria Hallelujha', 'Goudy Bookletter 1911'
    ],
  },
  link: {
    defaultTargetOption: '_blank',
  },
}
