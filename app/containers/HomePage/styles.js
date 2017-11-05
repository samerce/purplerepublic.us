import styled from 'styled-components';

export const Root = styled.div`
  height: 100%;
  position: relative;
`

export const RouteRoot = styled.div`
  pointer-events: none;
  opacity: 0;
  width: 100%;
  height: 100%;

  &.enter {
    opacity: 1;
    pointer-events: all;
  }
`
