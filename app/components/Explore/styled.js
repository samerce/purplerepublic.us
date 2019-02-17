import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, BlurbBubble, BlurbContent, BlurbButton, BlurbText, screen, CornerWorldContentRoot, Boto, AbsoluteFlex, FlexColumn,
} from '../../global/styled'

export const Root = Flex.extend`
  position: absolute;
  z-index: 7;
  margin: 250px 0 0;
  align-items: center;
  flex-direction: column;
  width: 100%;
  display: none;
  opacity: 0;
  transform: translate(0, -10px);
  transition: all .5s ${EASE_OUT};

  &.hire-willEnter {
  display: flex;
}
  &.hire-enter, &.hire-show {
    display: flex;
    opacity: 1;
    transform: none;
    transition-delay: .2s;
  }
  &.hire-willExit, &.hire-exit {
    display: flex;
    opacity: 0;
    transform: translate(0, -10px);
    transition: all .3s ${EASE_OUT};
  }
  ${screen.large`
    margin: 140px 0 0;
  `}
  ${screen.medsmall`
    margin: 250px 0 0;
  `}
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
    display: flex;
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
  width: 90%;
  font-size: 24px;
  color: ${p => p.theme.veryLight};
  line-height: 60px;
  text-align: center;
  max-width: 780px;
  align-self: center;
  padding: 20px;
  border-radius: 10px;
  background: ${p => p.theme.veryDark};
  border: 1px solid ${p => p.theme.veryLight};

  ${screen.medium`
    font-size: 20px;
    line-height: 30px;
  `}
`

export const NavTextButton = Boto.extend`
  display: inline;
  font-size: 22px;
  margin: 0 8px;
  background: ${p => p.theme.shelly};
  border-color: ${p => p.theme.shellyLight};

  &:active {
    transform: scale(.95);
  }

  &.active {
    pointer-events: none;
    background: ${p => p.theme.shellyLight};
    border-color: ${p => p.theme.shellyDark};
    color: ${p => p.theme.shellyDark};
  }

  ${screen.medium`
    font-size: 18px;
    display: block;
    padding: 5px;
    margin: 5px 0;
  `}
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
  span.mdc-tab__text-label {
    opacity: 1 !important;
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
    color: white;
    transition: all .5s ${EASE_OUT};

    &&&:hover {
      color: white;
    }
  }

  .mdc-tab--active &&& {
    color: ${p => p.theme.veryLight};
    font-size: 44px;
    background: transparent;

    ${screen.medium`
      font-size: 38px;
    `}
  }

  ${screen.medium`
    font-size: 24px;
  `}
`

export const TabContentRoot = FlexColumn.extend`
  position: relative;
  width: 100%;
`

export const TabHeader = Flex.extend`
  padding: 40px 20px;
  justify-content: center;
  align-items: center;
  width: 100%;

  ${screen.medium`
    flex-direction: column-reverse;
    padding: 20px;
  `}
`

export const TabHeaderImage = styled.img`
  flex: 0 0 auto;
  height: 400px;
  margin: 0 20px 0 0;
  border-radius: 10px;
  box-shadow: ${p => p.theme.shadowHeavy};
  z-index: 1;

  ${screen.medium`
    height: 200px;
    margin: 0;
  `}
`

export const TabIntro = Flex.extend`
  flex: 0 1 auto;
  color: ${p => p.theme.veryLight};
  font-size: 26px;
  max-width: 790px;
  background: ${p => p.theme.veryDark};
  box-shadow: ${p => p.theme.shadowMedium};
  border-radius: 10px;
  border: 1px solid ${p => p.theme.veryLight};
  padding: 0 30px 0 20px;
  margin: 0 -10px 0 0;

  span {
    text-decoration: underline;
  }

  ${screen.medium`
    margin: -15px 0 0;
    font-size: 22px;
  `}
`

export const TabDetailsRoot = FlexColumn.extend`
  width: 100%;
  color: ${p => p.theme.veryLight};
  font-size: 20px;
  z-index: 1;
  position: relative;
  margin: 60px 0 0;
`

export const BubbleRowRoot = Flex.extend`
  flex: 0 0 100%;
  justify-content: center;
  align-items: center;
  padding: 0 100px 0 0;
  margin: 100px 0;

  ${screen.medium`
    flex-direction: column;
    padding: 0;
    width: 90%;
    margin: 0 auto 240px;
  `}
`

export const BubbleImage = Flex.extend`
  background: url('${p => p.src}');
  background-position: center;
  background-size: cover;
  flex: 0 0 200px;
  height: 200px;
  border: 1px solid ${p => p.theme.veryLight};
  border-radius: 100%;
  box-shadow: ${p => p.theme.shadowVeryHeavy};
  z-index: 2;
  transform: translate(100px, 0);

  .emphasis & {
    border-color: ${p => p.theme.tweet};
  }

  ${screen.medium`
    width: 200px;
    margin: 0 0 10px;
    transform: none;
  `}
`

export const BubbleRowContentRoot = Flex.extend`
  position: relative;
  align-items: center;
  flex: 1 0 90%;
  max-width: 890px;

  ${screen.medium`
    z-index: 3;
  `}
`

export const BubbleRowTitle = FlexColumn.extend`
  position: absolute;
  background: white;
  padding: 5px 30px 15px;
  border-radius: 10px;
  border: 1px solid ${p => p.theme.veryDark};
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, 10px);
  margin: 0 0 0 50px;
  color: ${p => p.theme.veryDark};
  box-shadow: ${p => p.theme.shadowMedium};
  text-transform: uppercase;
  text-align: center;
  font-family: playfair display;
  font-size: 18px;

  & > :last-child {
    font-size: 14px;
    color: ${p => p.theme.slightlyDark};
    text-transform: lowercase;

    .emphasis & {
      color: ${p => lighten(.3, p.theme.tweet)};
    }
  }

  .emphasis & {
    background: ${p => p.theme.tweet};
    border-color: ${p => p.theme.tweet};
    color: white;
  }

  ${screen.medium`
    margin: 0 0 90px;
    padding: 5px 30px;
    width: 80%;
  `}
`

export const BubbleJuice = Flex.extend`
  z-index: 1;
  background: ${p => p.theme.veryDark};
  box-shadow: ${p => p.theme.shadowHeavy};
  color: ${p => p.theme.veryLight};
  font-size: 22px;
  padding: 0 20px 0 120px;
  border-radius: 10px;
  border: 1px solid ${p => p.theme.veryLight};
  flex: 0 0 100%;

  .emphasis & {
    border-color: ${p => p.theme.tweet};
  }

  ${screen.medium`
    font-size: 18px;
    padding: 0 20px;
  `}
`

export const BubbleRowActionsRoot = Flex.extend`
  position: absolute;
  top: 100%;
  width: 100%;
  margin: -15px 0 0;
  justify-content: center;
  padding: 0 0 0 100px;

  ${screen.medium`
    flex-direction: column;
    margin: 0;
    padding: 0;
  `}
`

export const BubbleRowAction = Boto.extend`
  font-size: 24px;
  box-shadow: ${p => p.theme.shadowMedium};
  padding-top: 25px;
  flex: 0 0 40%;
  margin: 0 10px;

  &:last-child {
    background: ${p => p.theme.shelly};
    border-color: ${p => p.theme.shellyLight};

    &:hover {
      background: white;
      border-color: ${p => p.theme.shellyDark};
      color: ${p => p.theme.shellyDark};
    }
  }

  ${screen.medium`
    padding: 10px 20px;
    margin: 10px 0 0;
    font-size: 20px;
  `}
`

export const DiveRoot = FlexColumn.extend`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0;
`

export const DiveText = Flex.extend`
  color: ${p => p.theme.veryLight};
  font-size: 24px;
`

export const DiveButton = Boto.extend`
  border-radius: 100%;
  height: 100px;
  width: 100px;
  margin: 10px 0 0;
  box-shadow: ${p => p.theme.shadowHeavy};
  background: ${p => p.theme.tweet};
  border-color: ${p => p.theme.tweetLight};
`
