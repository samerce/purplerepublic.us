import styled, {injectGlobal} from 'styled-components'

injectGlobal`
  .reflection-root {
    width: 100%;
    position: absolute;
  }

  .reflection-main {
    padding: 100px 0 700px;
  }

  .reflect-quote {
    margin-left: auto;
    margin-right: auto;
    max-width: 860px;

    iframe {
      margin-top: 10px;
      width: 512px;
      height: 288px;
    }

    .blurb {
      margin: 0 20px;
      background: rgba(87, 5, 76, .5);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 1px 1px 15px rgba(87, 5, 76, .5);
    }
  }

  @media(max-width: 585px) {
    .reflect-quote iframe {
      width: 256px;
      height: 144px;
    }
  }
`
