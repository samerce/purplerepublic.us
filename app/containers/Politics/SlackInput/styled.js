import styled, {injectGlobal} from 'styled-components'
import {
  MessageStyle,
  MessageStyleRight,
} from '../styled'
import {
  EASE_OUT,
} from '../../../global/constants'

injectGlobal`
  @keyframes blinking {
    0% { background: rgba(255, 190, 248, 0.8); }
    50% { background: rgba(247, 151, 237, 0.8); }
    100% { background: rgba(255, 190, 248, 0.8); }
  }
`

export const Input = styled.input`
  ${MessageStyle}
  background: rgba(184, 95, 174, .8);
  width: 40%;
  height: 60px;
  font-weight: bold;
  transition: all .2s ${EASE_OUT};

  &:focus {
    box-shadow: 0 0 20px rgba(199, 99, 185, 0.8);
    border-color: rgba(209, 113, 196, 1);
    outline: none;
  }
  @media(max-width: 544px) {
    width: initial;
    max-width: 90%;
    font-size: 18px;
    margin-left: 15px;
  }

  &.right {
    ${MessageStyleRight}

    &:focus {
      box-shadow: 0 0 20px rgba(136, 93, 132, 0.8);
      border-color: rgba(129, 70, 122, 1);
    }

    @media(max-width: 670px) {
      margin-right: 15px;
      margin-left: auto;
    }
  }

  &.sending {
    background: rgba(255, 190, 248, 0.8);
    animation: .8s ${EASE_OUT} 0s blinking infinite;
    color: rgba(71, 37, 67, .8);
  }
  &.justSent {
    background: rgba(255, 190, 248, 0.8);
    color: rgba(71, 37, 67, .8);
  }

`
