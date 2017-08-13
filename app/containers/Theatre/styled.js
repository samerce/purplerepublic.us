import styled, {injectGlobal} from 'styled-components'

export const Pitch = styled.div`
  font-family: averia sans libre, sans-serif;
  font-size: 24px;
  margin: 30px 10%;
  color: white;

  @media(max-width: 670px) {
    margin-left: 15px;
    margin-right: 15px;
  }
`

injectGlobal`

  .theatre-main {
    padding: 100px 0 700px;
  }

  .theatre-root {
    width: 100%;
    position: absolute;
  }

  .theatre-tagline {
    max-width: 800px;
    margin: 40px auto 50px;
    font-family: caveat;


    div {
      margin: 0 20px;
      background: rgba(87, 5, 76, .5);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 1px 1px 15px rgba(87, 5, 76, .5);
    }
  }
`
