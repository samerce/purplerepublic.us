import React from 'react'
import {BubbleButtonSVG} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'


module.exports = {
  className: 'bubbleButton-logo',
  title: 'what is this anyway?',
  subtitle: 'you may be asking',
  renderButtonContent,
  renderDescription,
  actions: [{
    text: 'read more',
    onClick: () => {
      const a = document.createElement('a')
      a.href = 'https://medium.com/the-purple-republic/what-the-hell-is-this-anyhow-65700351727c'
      a.target = '_blank'
      a.click()
    },
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
      i’m not waking at 70 full of regret. i’m alive. and im the most sane person i know. after years of feeling insane, i’ve come to see it straight.<br /><br />

      who cares if we win? we’re running a campaign for the marginalized and voiceless, elliott. for those who never get a seat at the table. for the next generation who we hope will grow up on a more peaceful planet. a planet with a celebratory climate and culture of embrace. we’re running a campaign so future generations will know bigotry and hunger as a dirty thing of the past, now only recounted in the history books. history has its eye on you. on all of us.<br /><br />

      a groundswell of playful, energetic, empathetic, exciting people to run. 2018 can welcome in the sexiest fleet of politicians history has ever known. laws and legislation doesn’t have to be a stuffy, suited affair. democracy can be alive again. we can kick the dried-out corpse to the curb and throw the biggest love celebration this planet has ever known.<br /><br />

      a movement rooted in rationality. if you refuse to think, get out of our way. if you’re settled into your dogma and stuck in your ways, then this isn’t your jam. and we’re sorry for your loss.<br /><br />

      our target constituency are 1. the queers, our LGBT family are the heart of this movement. 2. millennials. they are the largest potential voter group in this coming election. we’ve got to get them inspired and registered. 3. minorities of every stripe. (who aren’t crazy about jesus)  4. women (especially ones who wish they had a more exciting life / hate their husbands / resent their kids, etc.) 5. hippies 6. artists, philosophers, scientists
<br /><br />
      fuck the uber conservative christians. i never liked them anyhow. we’ve got our eyes set elsewhere.<br /><br />

      if any one of us do it alone, we’ll be killed. if the neo-nazis don’t get us, the secret service will. our power must be in numbers.<br /><br />

      if we do this right, they’ll be swept up in glittery oratory.
    </div>
  )

}
