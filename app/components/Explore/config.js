import React from 'react'

import {openInNewTab} from '../../utils/nav'

import {DimensionTypes} from '../bubbleverse/config'
import {
  SCREEN_WIDTH_M, LAMPSHADE_TUMBLR_URL,
} from '../../global/constants'

export default [
  {
    title: 'art',
    color: 'myrtle',
    dimension: DimensionTypes.Art,
    image: 'unicorn',
    preText: 'the only thing that touches the soul is',
    postText: (window.innerWidth <= SCREEN_WIDTH_M)? '' : '.',
    renderIntro: () => (
      <div>
        <p>we are all perfect. we are all artists.</p>
        <p>when you trust yourself enough to <i>express your mess</i>, your soul blossoms and the world swoons.</p>
        <p><i>art</i> is our direct line to source—and to <i>each other</i>.<br/>
          join us in making art <strong><i>the</i></strong> <i>reason</i> we collect ourselves into this thing called <span>civilization</span>.</p>
      </div>
    ),
    bubbles: [
      {
        title: 'collections',
        status: 'in progress',
        render: () => (
          <div>
            <p>our days are consumed with art: drag, poetry, books, photography, painting, dance, music, performance.</p>
            <p>here you'll find curated collections of our latest favorite works.</p>
          </div>
        ),
        image: 'shop-art',
        actions: [
          {
            text: 'join mailing list',
            onClick: () => {},
          },
          {
            text: 'view collections',
            onClick: () => window.location = '#start/bubble/art',
          },
        ],
      },
      {
        title: 'sacred gutter',
        status: 'in progress',
        render: () => (
          <div>
            <p>your favorite little bird takes to youtube!</p>
            <p>get a bi-weekly dose of the T, hennie. little bird takes you on a 9-minute journey on tuesdays and fridays. from drag to politics to philosophy and everywhere in between.</p>
            <p>coming february 2019.</p>
          </div>
        ),
        image: 'what-is-this',
        actions: [
          {
            text: 'learn more',
            onClick: () => {},
          },
          {
            text: 'subscribe',
            onClick: () => {},
          },
        ],
      },
      {
        title: 'perpetually unfinished',
        status: 'in progress',
        render: () => (
          <div>
            <p>the book that defines an age.</p>
            <p>a queer perspective in an excessively straight-laced, needlessly masculine world. this is the magnum opus. our bible. read it to see how and why we do what we do.</p>
            <p>coming february 2019.</p>
          </div>
        ),
        image: 'shop-art',
        actions: [
          {
            text: 'join mailing list',
            onClick: () => {},
          },
          {
            text: 'learn more',
            onClick: () => {},
          },
        ],
      },
    ],
  },
  {
    title: 'movement',
    color: 'flik',
    dimension: DimensionTypes.Movement,
    image: 'action',
    preText: ((window.innerWidth <= SCREEN_WIDTH_M)? '...' : '') + 'paired with organized',
    postText: 'we\'ll touch millions.',
    renderIntro: () => (
      <div>
        <p>we are given the gift of life, unasked. these waking moments are only process.</p>
        <p>breathe into the inescapable biological fact of movement and create the action that builds your ideal world. perhaps we can build one together?</p>
        <p>join us in creating action to <i>empower women, people of color, queers, and all minorities</i> to land <strong>leadership roles</strong> in our society and direct the course of our <span>collective evolution</span>.</p>
      </div>
    ),
    bubbles: [
      {
        title: 'faerie brigade',
        status: 'needs funding',
        className: 'emphasis',
        render: () => (
          <div>
            <p>bringing joy to the streets!</p>
            <p>faerie brigades are groups all across the nation tasked with donning silly costumes, getting gorgeous and taking to the streets to spread music, love, wackiness and community.</p>
            <p>the brigades' walks are themed: from picking up trash, to serenading strangers, to free hugs, to flash mobs.</p>
          </div>
        ),
        image: 'unicorn',
        actions: [
          {
            text: 'learn more',
            onClick: () => {},
          },
          {
            text: 'donate',
            onClick: () => document.getElementById('payPalLink').click(),
          },
        ],
      },
      {
        title: 'manifesting the minority',
        status: 'needs funding',
        className: 'emphasis',
        render: () => (
          <div>
            <p>it's time to get people of color, women, queers, and all minorities to flood positions of power in every corner of our society. from CEO to government office to university dean and beyond, we're taking over and directing our future with love.</p>
          </div>
        ),
        image: 'streetpoet',
        actions: [
          {
            text: 'learn more',
            onClick: () => {}
          },
          {
            text: 'watch the video',
            onClick: () => {}
          },
        ],
      }
    ],
  },
  {
    title: 'space',
    color: 'tweet',
    dimension: DimensionTypes.Space,
    image: 'lampshade tiny',
    preText: 'create',
    postText: 'for that duo to grow infinitely, and we\'ll change the world.',
    renderIntro: () => (
      <div>
        <p>we are each a plant. and we need space to grow.</p>
        <p>environment is an acutely important part of building new habits that break us out of sticky ruts.</p>
        <p>join us in building <i>expansive, gorgeous, celebration spaces</i> across the globe. places that offer room to breathe into your mess, to express your art, and to find your action—the perfect fusion of <span>community meet commodity</span>.</p>
      </div>
    ),
    bubbles: [
      {
        title: 'lampshade',
        status: 'complete',
        render: () => (
          <div>
            <p>lampshade was a brick & mortar space in ypsilanti, michigan</p>
            <p>the first space we built to fuse community & commodity was a massive success. named best coffee shop in the city only two months after opening, lampshade offered space to anyone and everyone looking for a place to just be and explore what it means to be alive, without the fear of ridicule, without the fear of rejection.</p>
          </div>
        ),
        image: 'unicorn',
        actions: [
          {
            text: 'see the blog',
            onClick: () => openInNewTab(LAMPSHADE_TUMBLR_URL),
          },
          {
            text: 'watch the video',
            onClick: () => window.location = '#start/bubble/lampshade',
          },
        ],
      },
      {
        title: 'express your mess art install',
        status: 'complete',
        render: () => (
          <div>
            <p>the first express your mess art installation was hosted by the old wilmington city market in wilmington north carolina.</p>
            <p>thousands of hearts touched, thousands of pieces of art sold, thousands of unforgettable experiences.</p>
          </div>
        ),
        image: 'unicorngirl',
        actions: [
          {
            text: 'learn more',
            onClick: () => {}
          },
          {
            text: 'watch the video',
            onClick: () => {},
          },
        ],
      },
    ],
  },
]
