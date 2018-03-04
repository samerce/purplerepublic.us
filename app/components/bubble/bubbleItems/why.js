import React from 'react'
import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'


module.exports = {
  className: 'bubbleButton-why',
  title: 'what am i doing?',
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
  }],
  size: 'small',
}

function renderButtonContent() {
  return (
    <div>
      <BubbleButtonImage src={SRC_URL + 'bubbles/why.jpg'} />
    </div>
  )
}

function renderDescription() {
  return (
    <div>
      i’m not waking at 70 full of regret. i’m alive. and im the most sane person i know. after years of feeling insane, i’ve come to see it straight.<br /><br />

      who cares if we win? we’re running a campaign for the marginalized and voiceless. for those who never get a seat at the table. for the next generation who we hope will grow up on a more peaceful planet. a planet with a celebratory climate and culture of embrace. we’re running a campaign so future generations will know bigotry and hunger as a dirty thing of the past, now only recounted in the history books. history has its eye on you. on all of us.<br /><br />

      a groundswell of playful, energetic, empathetic, exciting people to run. 2018 can welcome in the sexiest fleet of politicians history has ever known. laws and legislation doesn’t have to be a stuffy, suited affair. democracy can be alive again. we can kick the dried-out corpse to the curb and throw the biggest love celebration this planet has ever known.<br /><br />

      a movement rooted in rationality. if you refuse to think, get out of our way. if you’re settled into your dogma and stuck in your ways, then this isn’t your jam.<br /><br />

      our target constituency:
      <ol>
        <li>the queers. our LGBT family are one of the many beating hearts of this movement.<br /></li>
        <li>millennials. they are the largest potential voter group in this coming election. we’ve got to get them inspired and registered.<br /></li>
        <li>minorities of every stripe. (who are crazy about more than just jesus)<br /></li>
        <li>women (especially ones who wish they had a more exciting life / hate their husbands / resent their kids, etc.)<br /></li>
        <li>hippies<br /></li>
        <li>artists, philosophers, scientists</li>
        <br />
      </ol>

      if any one of us do it alone, we’ll be killed. if the neo-nazis don’t get us, the secret service will. our power must be in numbers.<br /><br />

      if we do this right, we'll all be swept up in glittery oratory!
    </div>
  )

}
