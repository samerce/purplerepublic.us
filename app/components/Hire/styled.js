import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, CloseButton as aCloseButton, ExpandingBackground, BlurbBubble, BlurbContent, BlurbButton, BlurbText, screen, CornerEntryButton, CornerEntryButtonActiveStyles, CornerWorldRoot, CornerWorldRootActiveStyles, CloseButtonActiveStyles, CornerWorldContentRoot, ExpandingBackgroundLeftActiveStyles, Boto, AbsoluteFlex,
} from '../../global/styled'


export const Root = CornerWorldRoot.extend`
  &.hire-show, &.hire-enter, &.hire-willExit, &.hire-exit {
    ${CornerWorldRootActiveStyles}
  }
`

export const EntryButton = CornerEntryButton.extend`
  .hire-show &, .hire-enter & {
    ${CornerEntryButtonActiveStyles}
  }
`

export const Background = ExpandingBackground.extend`
  .hire-willEnter &, .hire-willExit &, .hire-exit & {
    position: fixed;
  }
  .hire-show &, .hire-enter & {
    position: fixed;
    ${ExpandingBackgroundLeftActiveStyles}
  }
`

export const CloseButton = aCloseButton.extend`
  .hire-enter & {
    transition-delay: .3s;
  }
  .hire-show &, .hire-enter & {
    ${CloseButtonActiveStyles}
  }
`

export const ContentRoot = CornerWorldContentRoot.extend`
  max-width: 85%;

  .hire-hide & {
    opacity: 0;
    transform: translate(0, -10px);
    display: none;
    transition: none;
  }
  .hire-willEnter &, .hire-willExit &, .hire-exit & {
    opacity: 0;
    transform: translate(0, -10px);
  }
  .hire-willEnter & {
    transition: none;
  }
  .hire-willExit &, .hire-exit & {
    transition: all .3s ${EASE_OUT};
  }
  .hire-show &, .hire-enter & {
    transition: all .5s ${EASE_OUT} .2s;
    pointer-events: all;
  }
`

export const NavParagraphRoot = styled.div`
  width: 100%;
  font-size: 24px;
  color: ${p => p.theme.veryLight};
  line-height: 60px;
  text-align: justify;
  max-width: 760px;
  align-self: center;

  ${screen.medium`
    text-align: left;
  `}
`

export const NavTextButton = Boto.extend`
  display: inline;
  font-size: 22px;
  margin: 0 5px;
  border: 2px solid ${p => p.theme.veryLight};

  &:active {
    transform: scale(.95);
  }

  &.active {
    pointer-events: none;
    background: ${p => p.theme.veryLight};
    border-color: ${p => p.theme.veryDark};
    color: ${p => p.theme.veryDark};
  }
`

export const TabBarRoot = styled.div`
  border-bottom: 1px solid ${p => p.theme.veryLight};
  padding: 60px 0 0;

  .mdc-tab__ripple {
    visibility: hidden !important;
  }
  .mdc-tab-indicator {
    visibility: hidden !important;
  }
`

export const TabButton = styled.button`
  &&& {
    padding: 0 5px;
    height: 62px;
  }
`

export const TabBarTabText = styled.span`
  font-size: 30px;
  text-transform: lowercase;
  font-family: alice;

  &&& {
    color: ${p => p.theme.veryLight};
    transition: all .5s ${EASE_OUT};

    &&&:hover {
      color: white;
    }
  }

  .mdc-tab--active &&& {
    color: white;
    font-size: 44px;
    background: transparent;
  }
`

const ImageHeight = window.innerHeight * .5
export const TabContentRoot = Flex.extend`
  position: relative;

  .image-gallery {
    position: absolute;
    height: ${ImageHeight}px;
    border: 1px solid ${p => p.theme.veryLight};
    border-top: none;
    border-bottom: none;
    cursor: pointer;
  }
  .image-gallery-slide-wrapper {
    height: 100%;

    .image-gallery-index {
      bottom: 0;
      top: initial;
      background: none;
      height: 40px;
      line-height: 36px;
      padding: 0 10px;
    }

    .image-gallery-slide {
      height: 100%;
      overflow: hidden;

      ${screen.medsmall`
        img {
          height: 100%;
          width: initial;
        }
      `}

      .image-gallery-description {
        bottom: 0;
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-style: italic;
        padding: 100px 0 15px;
        background: linear-gradient(
          to top,
          ${p => p.theme.veryDark} 0%,
          transparent 100%
         ) !important;

         ${screen.medsmall`
           font-size: 12px;
         `}
      }
    }
  }
  .image-gallery-right-nav {
    right: -30px;

    &::before {
      content: "\\021C1";
      font-size: 60px;

      ${screen.medsmall`
        font-size: 40px;
      `}
    }
  }
  .image-gallery-left-nav {
    left: -30px;

    &::before {
      content: "\\021BD";
      font-size: 60px;

      ${screen.medsmall`
        font-size: 40px;
      `}
    }
  }
`

export const GalleryOverlay = AbsoluteFlex.extend`
  height: ${ImageHeight}px;
  width: 100%;
  pointer-events: none;
`

export const TabImage = Flex.extend`
  background: url('${p => p.src}');
  width: 100%;
  height: ${ImageHeight}px;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${p => p.theme.veryLight};
  border-top: none;
  border-bottom: none;
`

export const TabDetailsRoot = Flex.extend`
  width: 100%;
  padding: ${ImageHeight + 20}px 20px 20px;
  border: 1px solid ${p => p.theme.veryLight};
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: ${p => p.theme.veryLight};
  font-size: 20px;
  z-index: 1;
  position: relative;
  pointer-events: none;
`
