import React from 'react'
import BubbleButton from '../bubbleButton'

import {cx} from '../../../utils/style'
import {
  Root, ContentRoot,
} from './styled'

import autobind from 'autobind-decorator'

export function BubbleAddButton({onClick}) {
  return (
    <BubbleButton onClick={onClick} className='bubbleBuilderButton'>
      <div>
        <i className='fa fa-plus' />
      </div>
    </BubbleButton>
  )
}

export function BubbleArrangeButton({onClick, isArranging}) {
  const data = {
    classes: isArranging? 'bubbleArrangeActive' : '',
    icon: isArranging? 'fa-close' : 'fa-leaf',
  }
  return (
    <BubbleButton
      onClick={onClick}
      className={'bubbleBuilderButton ' + data.classes}>
      <div>
        <i className={'fa ' + data.icon} />
      </div>
    </BubbleButton>
  )
}
