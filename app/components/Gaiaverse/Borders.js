import React from 'react'

import  {BordersRoot} from './styled'

export default function Borders(props) {
  return (
    <BordersRoot top={props.borderTop} className={props.className}>
      <div className='border borderLeft'>
        {/* <img src='plain.png' /> */}
      </div>
      <div className='border borderRight'>
        {/* <img src='plain.png' /> */}
      </div>
      <div className='border borderBottom'>
        {/* <img src='plain.png' /> */}
      </div>
    </BordersRoot>
  )
}
