import styled from 'styled-components'
import {
  MessageStyle,
  MessageStyleRight,
} from '../styled'

export const Input = styled.input`
  ${MessageStyle}
  background: rgba(184, 95, 174, .8);
  width: 40%;
  height: 60px;
  font-weight: bold;

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
`
