import React from 'react'

import {
  Image, SectionHeader as SectionHeaderRoot,
} from '../../global/styled'

import {openInNewTab} from '../../utils/nav'

export function ClickableImage(props) {
  const onClick = () => openInNewTab(props.src)
  return <Image src={props.src} onClick={onClick} className={props.className} />
}

export function SectionHeader(props) {
  return (
    <SectionHeaderRoot className={props.className}>
      <hr />
      <div>{props.text}</div>
    </SectionHeaderRoot>
  )
}
