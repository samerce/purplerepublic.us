import React from 'react'
import styled, {injectGlobal} from 'styled-components'

import {BubbleButtonSVG} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'


module.exports = {
  className: 'bubbleButton-logo',
  title: 'what is this anyway?',
  subtitle: 'you may be asking',
  actions: [{
    text: 'read more',
  }],
  size: 'medium',
  buttonImageUrl: '',
  Component: () => (
    <div>
    </div>
  ),
}
