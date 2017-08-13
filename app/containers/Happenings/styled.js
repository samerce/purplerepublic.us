import styled from 'styled-components'
import {
  CatchLine as aCatchLine,
  SweetTalk as aSweetTalk,
} from '../../global/styled'

export const Root = styled.div`
  width: 100%;
  background: url('https://s3.amazonaws.com/purplerepublic/purple-feather.jpg');
  background-size: cover;
  background-attachment: fixed;
  padding: 100px 0 5px;
  margin-top: 0;
  display: flex;
  justify-content: space-between;

  & > * {
    flex: 0 0 50%;
  }

  @media(max-width: 544px) {
    padding-top: 130px;
    overflow-x: hidden;
  }

  @media(max-width: 960px) {
    flex-direction: column;
  }
`

export const Invitation = styled.div`

`

export const GetInvolved = styled.div`

`

export const CatchLine = styled(aCatchLine)`
  text-align: left;
  margin-left: 30px;
  margin-top: 0;
`

export const SweetTalk = styled(aSweetTalk)`
  text-align: left;
  margin: -10px 0 20px 30px;
  font-size: 30px;

  &.blurb-area {
    max-width: 670px;
    margin: 40px auto 0;
    font-size: 22px;

    .blurb {
      position: fixed;
    }

    @media(max-width: 960px) {
      margin: 20px auto;
      .blurb {
        position: relative;
      }
    }
  }
`

export const WhenPart = styled.a`
  flex: 1 0 auto;
  padding: 10px 0 10px 60px;
  text-decoration: none;
  &:hover {
    background: rgba(102, 15, 89, .75);
  }
  &:active {
    background: rgba(102, 15, 89, .95);
  }
  .link {
    text-decoration: underline;
  }

  @media(max-width: 544px) {
    padding-left: 30px;
  }
`

export const TicketLink = styled.a`
  color: rgba(255, 210, 249, 1);
  font-size: 26px;
  flex: 1 0 auto;
  text-align: center;
  vertical-align: middle;
  line-height: 54px;
  border-left: 1px solid rgba(255, 210, 249, .7);
  text-decoration: none;
  background: rgba(102, 15, 89, 0.35);
  padding: 10px 0 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  @media(max-width: 530px) {
    padding-left: 30px;
    border: none;
    text-align: left;
    border-radius: 0;
  }
  &:hover {
    background: rgba(102, 15, 89, 0.55);
  }
  &:active {
    background: rgba(102, 15, 89, 0.85);
  }
`

export const When = styled(SweetTalk)`
  font-size: 24px;
  margin: 5px 0 40px;
  background: none;
  line-height: 28px;
  background: rgba(102, 15, 89, .5);
  border-radius: 10px;
  max-width: 580px;
  transform: translateX(-30px);
  display: flex;
  justify-content: center;
  padding-right: 0;

  a {
    color: rgba(255, 210, 249, 1);
  }
  @media(max-width: 530px) {
    flex-direction: column;
    transform: none;
    border-radius: 0;
    padding-left: 0;
  }
`

const Text = styled.div`
  font-size: 20px;
  ${'' /* text-shadow: 1px 1px rgba(250, 166, 238, 0.5); */}
  color: rgba(102, 15, 89, 1);
  margin-left: -15px;
  max-width: 620px;
  position: relative;
  z-index: 3;
  border-radius: 10px;
  padding: 5px 10px 5px 40px;
`

const SpecialText = `
  border-top: 2px solid rgba(245, 212, 241, .5);
  text-shadow: 1px 1px rgba(89, 12, 80, 0.44);
  background: rgba(164, 84, 154, 0.4);
  padding-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: rgba(255, 210, 249, 1);
`

export const HookEm = styled(Text)`
  font-size: 34px;
  font-family: caveat;
  background: rgba(94, 83, 163, 0.6);
  transform: rotate(-3deg);
  color: rgba(247, 219, 244, 1);

  div.sub {
    font-size: 26px;
    color: rgba(124, 21, 111, 1);
    &:last-child {
      color: rgba(74, 10, 66, 1);
    }
  }
`

export const WooEm = styled(Text)`
  font-size: 26px;
  font-family: reenie beanie;
  transform: rotateZ(-1deg);
  color: rgba(97, 27, 88, 1);
  background: rgba(217, 111, 203, 0.7);
  margin-top: 30px;
`

export const Bounce = styled(Text)`
  font-family: annie use your telescope;
  font-size: 32px;
  margin-top: 35px;
  color: rgba(247, 219, 244, 1);
  background: rgba(164, 84, 154, 0.5);
  transform: rotateZ(3deg);
  max-width: 500px;
`

export const ShakeEm = styled(Text)`
  font-size: 28px;
  font-family: caveat;
  transform: rotateZ(1deg);
  margin-top: 20px;
  color: rgba(74, 10, 66, 1);
  background: rgba(193, 118, 183, 0.5);
  max-width: 330px;
`

export const Jiggle = styled(Text)`
  font-family: annie use your telescope;
  font-size: 22px;
  transform: rotateZ(-2deg);
  margin-top: 25px;
  color: rgba(74, 10, 66, 1);
  background: rgba(185, 93, 173, 0.7);
  max-width: 590px;

  div.sub {
    color: rgba(124, 21, 111, 1);
  }
  div.tres {
    color: rgba(247, 219, 244, 1);
  }
  div.quat {
    color: rgba(255, 255, 255, 1);
  }
`

export const Pocky = styled(Text)`
  font-family: caveat;
  font-size: 26px;
  margin: 35px 0 25px -10px;
  color: rgba(97, 27, 88, 1);
  background: rgba(217, 111, 203, 0.7);
  transform: rotateZ(-1deg);
`

export const Chortle = styled(Text)`
  font-family: annie use your telescope;
  font-size: 28px;
  transform: rotateZ(-3deg);
  color: rgba(255, 210, 249, 1);
  margin-top: 20px;
`

export const Koki = styled(Text)`
  font-family: love ya like a sister;
  font-size: 20px;
  margin-top: 15px;
  color: rgba(255, 210, 249, 1);
`
