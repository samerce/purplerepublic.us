import styled, {injectGlobal} from 'styled-components'

injectGlobal`
  .movement-root {
    position: absolute;
    width: 100%;
  }

  .movement-header {
    color: rgba(130,39,90,1);
    text-shadow: 2px 1px #A3D4FB;
  }

  .movement-main {
    padding: 100px 0 700px;
  }

  .movement-blurb {
    max-width: 670px;
    margin-left: auto;
    margin-right: auto;

    div {
      margin: 0 20px;
      background: rgba(87, 5, 76, .5);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 1px 1px 15px rgba(87, 5, 76, .5);
    }
  }
`
