import React from 'react'
import MediumEditor from 'medium-editor'

import autobind from 'autobind-decorator'

import {
  Description,
} from './styled'

const EditorOptions = {
  targetBlank: true,
  buttonLabels: 'fontawesome',
  toolbar: {
    buttons: [
      'bold',
      'italic',
      'strikethrough',
      'anchor',
      'quote',
      'orderedlist',
      'unorderedlist',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ],
  },
}


export default class BubbleWriting extends React.PureComponent {

  constructor(props) {
    super(props)
    this.editorClass = 'a' + Math.round(Math.random() * 183034083483)
  }

  componentDidMount() {
    const detailText = this.props.detailText || 'fill me up with something alluring, dahling'

    this.editor = new MediumEditor('.' + this.editorClass, EditorOptions)
    this.editor.setContent(detailText, 0)
    this.editor.subscribe('editableInput', this.onChange)
  }

  componentDidUpdate(prevProps) {
    if (this.props.editing && !prevProps.editing) {
      this.editor.setContent(this.props.detailText, 0)
    }
  }

  render() {
    const {editing} = this.props
    return (
      <Description>
        <div
          className={this.editorClass + ' editableText'}
          style={{display: editing? 'inherit' : 'none'}}
        />
        <div
          dangerouslySetInnerHTML={{__html: this.props.detailText}}
          style={{display: editing? 'none' : 'inherit'}}
        />
      </Description>
    )
  }

  @autobind
  onChange(event, editable) {
    const {onEditingChange} = this.props
    onEditingChange && onEditingChange({detailText: this.editor.getContent(0)})
  }
}
