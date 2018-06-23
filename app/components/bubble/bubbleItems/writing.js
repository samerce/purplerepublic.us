import React from 'react'

import {
  Description,
} from './styled'

export default function BubbleWriting({
  editing,
  detailText = 'fill me up with something alluring, dahling',
  onEditingChange,
}) {
  const onChange = ({target}) => onEditingChange({detailText: target.innerHTML})
  return (
    <Description>
      <span
        contentEditable={editing}
        onBlur={onChange}
        dangerouslySetInnerHTML={{__html: detailText}}>
      </span>. . .
    </Description>
  )
}
