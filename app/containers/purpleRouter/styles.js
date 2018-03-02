import styled from 'styled-components';

export const Root = styled.div`
  height: 100%;
  position: relative;
`

export const RouteRoot = styled.div`
  pointer-events: none;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;

  &.enter {
    opacity: 1;
    z-index: 1;
    pointer-events: all;
  }
`
