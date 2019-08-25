import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex,
} from '../../global/styled'
import theme from '../../global/theme'

export const Root = styled.div`
  color: white;
  flex-direction: column;
  visibility: hidden;
  opacity: 0;
  transform: translate(0, -10px);
  transition: all .5s ${EASE_OUT};
  font-size: 21px;
  line-height: 1.58;
  max-width: 780px;
  margin: 0 auto;
  padding: 0 15px 100px;
  text-shadow: 0 0 10px ${alpha(.5, lighten(.2, theme.hopiLight))};

  .mode-inTheDeep .spot-center &, .mode-willDive .spot-center & {
    visibility: visible;
  }
  .mode-inTheDeep .spot-center & {
    opacity: 1;
    transform: none;
    transition-delay: .5s;
  }

  .wordRolodex {
    display: inline-block;
    color: ${theme.hopiLight};
    transform: translate(8px, 8px);
  }
  .fear {
    display: inline;
    text-shadow: 0 0 15px ${theme.hopi};
    cursor: pointer;

    .floater {
      visibility: hidden;
      img {
        width: 200px;
      }
    }

    &:hover {
      .floater {
        visibility: visible;
      }
    }
  }
`
