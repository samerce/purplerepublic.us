import styled, {injectGlobal} from 'styled-components'

injectGlobal`
  .action-root {
    position: absolute;
    width: 100%;
  }

  .action-main {
    padding: 100px 0 700px;
  }

  .action-blurb {
    max-width: 670px;
    margin-left: 20px;
    margin-right: 20px;
    background: rgba(87, 5, 76, .5);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 1px 1px 15px rgba(87, 5, 76, .5);
  }
`
