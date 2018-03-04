import React from 'react'
import styled, {injectGlobal} from 'styled-components'

import {BubbleButtonSVG} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'


module.exports = {
  className: 'bubbleButton-logo',
  title: 'what is this anyway?',
  subtitle: 'you may be asking',
  renderButtonContent,
  renderDescription,
  renderExpandedContent,
  actions: [{
    text: 'read more',
  }]
}

function renderButtonContent() {
  return (
    <div className='logo-svg-root'>
      <BubbleButtonSVG
        className='bubbleButton-logo-svg'
        data={SRC_URL + 'commons/logo.svg'}
        type='image/svg+xml' />
    </div>
  )
}

function renderDescription() {
  return (
    <div>
      welcome to purple republic.<br /><br />
      we're here to think, make art and celebrate living. to simultaneously radically accept and critically question. to rebel against our static selves and deeply-held systems of belief.<br /><br />

      through the written word, video, visual art, events, theatre, performance, drag and discussion we aim to do our part for the revolution. <br /><br />

      purple — because democracy is a red AND blue thing.
    </div>
  )
}

function renderExpandedContent() {
  return (
    <ExpandedContent>
      <hr />
      from cabaret to congress — we’re here to unify the human race.<br /><br />

      to perpetually empower a collectively-cultivated conversation<br /><br />

      to inspire women, minorities, and queer candidates to run for office and support them on their journey.<br /><br />

      if not us, who? if not now, when?<br /><br />

      clearly wearing stuffy suits and preaching doesn't work. maybe what congress needs is heels, a paintbrush, yoga mat, and some glitter.  <br /><br />

      the burden of freedom is heavy so we're here to lighten the load.<br /><br />

      let's routinely recalibrate our ethical compass. <br />
      let's jolt the system and unify the human race. <br />
      let's spark dialogue. create theatre. & play... drag the world up a bit.<br />
      let's support candidates to run in 2018 and beyond.<br /><br />

      if not us, who? if not now, when?<br /><br />
      <hr />
      to do nothing is to do something quite dramatic indeed.<br /><br />

      purple republic aims at unflinching honesty in conscious life. a commitment to finding your authentic expression in every moment. perpetual empowerment to think for & against self, others, and the very structure that holds society together.<br /><br />

      dialogue over dogma. creation over destruction. <br /><br />

      our campaign will combine politics and play, journalism and art, social commentary, spirituality, and the messy celebration of being a human fully awake in the world today.<br /><br />

      it’s time to perpetually empower the human race. to celebrate living; to fearlessly question; to investigate and witness... and play! to radically express over survive. <br /><br />

      life is theatre. cast yourself well.
    </ExpandedContent>
  )
}

var ExpandedContent = styled.div`
  padding: 0 20px 20px;
  color: white;
  font-size: 18px;
`
