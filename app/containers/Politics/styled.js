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
  overflow: hidden;
`

export const EmphasisText = styled.div`
  font-family: reenie beanie;
  color: white;
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
const byLineMarginSmall = '10px'
export const ByLine = styled.div`
  background: rgba(40, 33, 82, .85);
  color: white;
  font-family: 'averia sans libre', sans-serif;
  margin-left: ${byLineMargin};
  padding: 10px 25px;
  font-size: 24px;
  line-height: 32px;
  z-index: 1;
  position: relative;
  border-radius: 50px;
  display: inline-block;
  max-width: 50%;

  @media(max-width: 544px) {
    font-size: 18px;
    margin-left: ${byLineMarginSmall};
    width: fit-content;
  }
  @media(max-width: 440px) {
    font-size: 16px;
  }
`

export const ByLineRight = styled(ByLine)`
  background: rgba(162, 0, 86, 0.85);
  margin-right: ${byLineMargin};
  float: right;

  @media(max-width: 544px) {
    margin-right: ${byLineMarginSmall};
  }
`

export const MessageStyle = `
  display: table;
  font-family: averia sans libre;
  font-size: 20px;
  color: white;
  max-width: 85%;
  padding: 15px 30px;
  border-radius: ${dialogueBorderRadius};
  margin: 12px 0 0 10%;
  max-width: 65%;
`
export const MessageStyleRight = `
  margin-right: 15%;
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
  @media(max-width: 440px) {
    font-size: 16px;
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
  background: rgba(184, 95, 174, .8);
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

export const Subtitle = styled.div`
  font-size: 24px;
  font-family: annie use your telescope;
  color: ${whitePurple};
  text-align: center;
  margin-bottom: 35px;
  margin-top: -5px;
  padding: 0 10px;

  @media(max-width: 544px) {
    font-size: 20px;
  }
`

export const OurPolitics = styled.div`
  width: 100%;
  padding: 60px 20px 0;
  display: flex;
  color: white;
  font-size: 20px;
  align-items: center;
  justify-content: space-around;

  & > * {
    border-radius: 10px;
    flex-basis: 552px;
  }

  .videoBlock {
    display: flex;
    flex-direction: column;
    background: rgba(40, 33, 82, .85);
    padding: 10px 20px 20px;

    .intro {
      padding: 0 0 10px;
    }
    iframe {
      width: 512px;
      height: 288px;
    }
  }

  .reassureBlock {
    flex-shrink: 1;
    background: rgba(162, 0, 86, 0.85);
    padding: 10px 20px;
    margin: 0 10px 0;
  }

  @media(max-width: 552px) {
    .video iframe {
      width: 256px;
      height: 144px;
    }
  }

  @media(max-width: 900px) {
    flex-direction: column-reverse;

    & > * {
      flex-basis: auto;
    }

    .reassureBlock {
      margin: 20px 0;

    }
    .videoBlock {
      max-width: 552px;
    }
    .video {
      margin: 0 auto;
    }
  }
`
