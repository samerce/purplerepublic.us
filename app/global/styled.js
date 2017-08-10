import styled from 'styled-components'

const whitePurple = 'rgba(255, 227, 251, 1)'

export const Header = styled.div`
  position: relative;
  z-index: 1;
  font-family: life savers;/*love ya like a sister;*/
  font-size: 60px;
  text-align: center;
  color: white;
  text-shadow: 2px 1px rgba(130,39,90,1);
  margin: 15px auto 30px;
  display: table;

  @media(max-width: 544px) {
    font-size: 34px;
  }
`

export const CatchLine = styled(Header)`
  font-size: 54px;
  display: table;
  margin-bottom: 0px;
`

export const SweetTalk = styled.div`
  font-size: 24px;
  font-family: annie use your telescope;
  color: ${whitePurple};
  text-align: center;
  margin-bottom: 35px;
  margin-top: -5px;
  position: relative;

  @media(max-width: 544px) {
    font-size: 20px;
  }
`
