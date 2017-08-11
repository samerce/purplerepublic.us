import styled from 'styled-components'
import {secondary} from '../../global/colors'

const whitePurple = 'rgba(255, 227, 251, 1)'
const dialogueBorderRadius = '30px'
const stripedGradientLight = `repeating-linear-gradient(
  45deg,
  rgba(184, 95, 174, .8),
  rgba(184, 95, 174, .8) 2px,
  rgba(177, 85, 167, 0.8) 2px,
  rgba(177, 85, 167, 0.8) 4px
)`
const stripedGradientDark = `repeating-linear-gradient(
  45deg,
  rgba(71, 37, 67, .8),
  rgba(71, 37, 67, .8) 2px,
  rgba(82, 45, 77, 0.8) 2px,
  rgba(82, 45, 77, 0.8) 4px
  /*rgba(45, 39, 92, .8),
  rgba(45, 39, 92, .8) 2px,
  rgba(53, 47, 102, 0.8) 2px,
  rgba(53, 47, 102, 0.8) 4px*/
)`

export const Page = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(87, 5, 76, .8);
`

export const Root = styled.div`
  position: relative;
  width: 100%;
`

export const EmphasisText = styled.div`
  font-family: reenie beanie;
  color: white;
`

export const BackgroundArea = styled.div`
  width: 100%;
  @media(max-width: 544px) {
    display: none;
  }
`

export const Background = styled.img`
  width: 100%;
`

export const StripedBackground = styled.div`
  background: ${stripedGradientLight};
`

export const Image = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`

const byLineMargin = '20%'
const byLineMarginSmall = '10%'
export const ByLine = styled.div`
  background: rgba(40, 33, 82, .85);
  color: white;
  font-family: 'averia sans libre', sans-serif;
  margin-left: ${byLineMargin};
  padding: 10px 25px;
  font-size: 24px;
  line-height: 32px;
  text-align: right;
  z-index: 1;
  position: relative;
  border-radius: 50px;
  display: inline-block;

  @media(max-width: 544px) {
    font-size: 18px;
    margin-left: ${byLineMarginSmall};
  }
`

export const ByLineRight = styled(ByLine)`
  ${'' /* margin: 0 0 0 25%; */}
  ${'' /* padding: 10px 10px 10px 25px; */}
  ${'' /* border-radius: 0;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px; */}
  background: rgba(162, 0, 86, 0.85);
  text-align: left;
  margin-right: ${byLineMargin};
  float: right;

  @media(max-width: 544px) {
    margin-right: ${byLineMarginSmall};
  }
`

export const ContentArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  @media(max-width: 544px) {
    position: relative;
    padding: 15px 0;
  }
`

const MessageStyle = `
  display: table;
  font-family: averia sans libre;
  font-size: 20px;
  color: white;
  max-width: 85%;
  padding: 15px 30px;
  border-radius: ${dialogueBorderRadius};
  margin: 12px 0 0 40px;
`
const MessageStyleRight = `
  margin-right: 40px;
  margin-left: auto;
  background: ${stripedGradientDark};
`

export const BodyCircle = styled(StripedBackground)`
  ${MessageStyle}

  @media(max-width: 544px) {
    font-size: 18px;
    margin-left: 15px;
    max-width: 80%;
  }
`

export const BodyCircleRight = styled(BodyCircle)`
  ${MessageStyleRight}

  @media(max-width: 544px) {
    margin-left: auto;
    margin-right: 15px;
  }
`

export const Separator = styled.div`
  width: 100%;
  height: 3px;
  background: ${stripedGradientLight};
  position: relative;
  z-index: 2;
`

export const Scribble = styled.div`
  position: absolute;
  z-index: 2;
  font-family: annie use your telescope;
  font-size: 20px;
  color: ${whitePurple};

  @media(max-width: 544px) {
    font-size: 16px;
  }
`

export const MessageInput = styled.input`
  ${MessageStyle}
  background: ${stripedGradientLight};
  width: 40%;
  height: 60px;
  font-weight: bold;

  &:focus {
    box-shadow: 0 0 20px rgba(199, 99, 185, 0.8);
    border-color: rgba(209, 113, 196, 1);
    outline: none;
  }
`
MessageInput.right = styled(MessageInput)`
  ${MessageStyleRight}
  &:focus {
    box-shadow: 0 0 20px rgba(136, 93, 132, 0.8);
    border-color: rgba(129, 70, 122, 1);
  }
`

export const Subtitle = styled.div`
  font-size: 24px;
  font-family: annie use your telescope;
  color: ${whitePurple};
  text-align: center;
  margin-bottom: 35px;
  margin-top: -5px;

  @media(max-width: 544px) {
    font-size: 20px;
  }
`
