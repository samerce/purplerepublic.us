import React from 'react'

import {
  BubbleBuilderButton, Icon,
} from './styled'

export function BubbleAddButton({onClick}) {
  return (
    <BubbleBuilderButton onClick={onClick}>
      <Icon className='fa fa-plus' />
    </BubbleBuilderButton>
  )
}

export function BubbleArrangeButton({onClick, isArranging}) {
  const data = {
    classes: isArranging? 'bubbleArrangeActive' : '',
    icon: isArranging? 'close' : 'random',
  }
  return (
    <BubbleBuilderButton
      onClick={onClick}
      className={data.classes}>
      <Icon className={'fa fa-' + data.icon} />
    </BubbleBuilderButton>
  )
}
