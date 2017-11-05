import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN} from '../../global/constants'

const easeInOutSine = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';
const aColor = '#498359'

injectGlobal`
  @keyframes spinning {
    0% {
      transform: rotate(180deg) scale(1.1);
    }
    50% {
      transform: rotate(270deg) scale(.9);
    }
    100% {
      transform: rotate(360deg) scale(1.1);
    }
  }

  @keyframes blinking {
    from {
      opacity: 1;
    }

    to {
      opacity: .3;
    }
  }

  @keyframes pointPulsing {
    from {
      transform: scale(1.3);
      background-color: black;
    }
    to {
      transform: scale(1.6);
      background-color: white;
    }
  }

`
export const Page = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: ${aColor};

  .quark-img-crop {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .cropper-view-box {
    outline-color: ${lighten(.3, aColor)};
  }
  .cropper-point {
    animation-name: pointPulsing;
    animation-duration: 1s;
    animation-timing-function: ${EASE_OUT};
    animation-direction: alternate;
    animation-iteration-count: infinite;
  }
  .cropper-modal {
    transition: opacity .5s ${easeInOutSine};
  }

  .bitHeader {
    position: absolute;
    top: 0;
    left: 0;
    text-shadow: 1px 1px ${darken(.2, aColor)};
    margin: 0;
    padding: 0 0 30px;
    width: 100%;
    background: linear-gradient(to top, transparent 0%, ${alpha(.3, aColor)} 100%);
    pointer-events: none;
    z-index: 3;
    ${'' /* opacity: 0;
    transform: translateY(-250px); */}
    transition: all 1s ${easeInOutSine};

    &.show {
      opacity: 1;
      transform: none;
      transition: all 1s ${EASE_OUT};
    }
  }

  &.mode-describe, &.mode-performCrop {
    .cropper-point {
      opacity: 0;
      transition: all .3s ${EASE_OUT};
    }
  }

  &.mode-describe {
    .cropper-modal {
      opacity: .7;
      transition-duration: 1s;
      transition-timing-function: ${EASE_OUT};
    }
  }
  &.mode-quarkArtGallery {
    .cropper-drag-box {
      cursor: default;
    }
    .cropper-modal {
      opacity: .7;
    }
  }
  &.mode-performCrop {
    .cropper-modal {
      opacity: 0;
      transition: all .5s ${easeInOutSine};
    }
  }
`

export const BitBox = styled.div`
  width: 90%;
  max-width: 800px;
  max-height: 300px;
  background: ${darken(.2, aColor)};
  border-radius: 10px;
  color: white;
  margin: 10% auto 0;
  padding: 20px;
  font-size: 24px;
  overflow: scroll;
  font-family: american typewriter;
`

const ToolBar = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 3;
  width: 100%;
  margin: 0 auto;
  display: flex;
  text-align: center;
  font-family: annie use your telescope;
  overflow: hidden;
  background: linear-gradient(to bottom, transparent 0%, ${p => p.themeColor} 100%);
  opacity: 0;
  transform: translateY(150px);
  pointer-events: none;
  transition: all 1s ${easeInOutSine};

  & > * {
    flex: 1 0 0;
  }
  &.show {
    opacity: 1;
    transform: none;
    pointer-events: all;
    transition: all 1s ${EASE_OUT};
  }
`

export const MultipleChoices = styled(ToolBar)`
`

export const ToolBarItem = styled.div`
  position: relative;
  color: white;
  padding: 20px 10px;
  cursor: pointer;
  font-size: 32px;
  transition: all .4s ${EASE_OUT};

  div {
    position: relative;
    z-index: 3;
    transition: all .4s ${EASE_OUT};
    text-shadow: 1px 1px ${p => darken(.2, p.themeColor)};
    user-select: none;
  }

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent 0%, ${p => alpha(.3, p.themeColor)} 50%, transparent 100%);
    transition: all .2s ${EASE_OUT};
    content: ' ';
    transform: translateY(10px);
    z-index: 1;
    opacity: 0;
    border-top: 1px solid ${p => alpha(.2, p.themeColor)};
  }

  &:hover {
    &:after {
      transform: none;
      opacity: 1;
      transition-duration: .4s;
    }
    div {
      transform: scale(1.05);
      letter-spacing: 1px;
      transition: all 5s cubic-bezier(0.39, 0.575, 0.565, 1);
    }

  }
`

export const Choice = styled(ToolBarItem)`

`

export const CropPrompt = styled(ToolBar)`
  font-size: 36px;
  padding: 30px 0 20px;
  text-shadow: 1px 1px ${p => darken(.2, p.themeColor)};
  color: white;
`

export const CropTools = styled(ToolBar)`
  opacity: 0;
  transform: translateY(150px);
  pointer-events: none;
  transition: all 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);

  &.show {
    opacity: 1;
    transform: none;
    pointer-events: all;
    transition: all 1s ${EASE_OUT};
  }
`

export const CropTool = styled(ToolBarItem)`

`

export const DescribeTools = styled(ToolBar)`
`

export const DescribeTool = styled(ToolBarItem)`
`

export const CroppedImage = styled.img`
  opacity: 0;
  pointer-events: none;
  position: absolute;
  z-index: 6;
  transition: all 1s ${easeInOutSine};

  &.show {
    opacity: 1;
    border: 5px solid white;
    border-radius: 2px;
  }
`

export const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  transition: all 1.9s ${easeInOutSine};

  &.show {
    opacity: .7;
    transition: all 1s ${easeInOutSine};
  }
`

export const OutlineDescription = styled.div`
  padding: 10px;
  position: absolute;
  opacity: 0;
  transform: translateY(-20px);
  transition: transform .5s, opacity .4s;
  transition-timing-function: ${easeInOutSine};
  pointer-events: none;
  z-index: 5;
  display: flex;
  flex-direction: column;

  &.show {
    opacity: 1;
    transform: none;
    pointer-events: all;
    transition: transform .9s, opacity .8s, top 1s, left 1s, width 1s;
    transition-timing-function: ${easeInOutSine};
  }
  &.gallery {
    transition: all 1s ${easeInOutSine};
    textarea {
      pointer-events: none;
    }
  }

  textarea {
    flex: 0 0 auto;
    position: relative;
    z-index: 5;
    width: 100%;
    font-size: 22px;
    outline: none;
    padding: 10px;
    border-radius: 3px;
    background: ${p => alpha(.4, p.themeColor)};
    resize: none;
    font-family: annie use your telescope;
    color: white;
    text-shadow: 1px 1px alpha(.3, ${p => p.themeColor});
    transition: all .4s ${EASE_OUT};
    text-align: center;

    &:focus {
      border-color: ${alpha(.2, 'white')};
      box-shadow: 1px 1px 15px ${alpha(.8, 'white')},
                  -1px -1px 15px ${alpha(.8, 'white')},
                  -1px 1px 15px ${alpha(.8, 'white')},
                  1px -1px 15px ${alpha(.8, 'white')};
      background: ${p => alpha(.1, p.themeColor)};
    }
  }
`

export const QuarkArtGallery = styled.div`
  position: absolute;
  top: 150px;
  left: 500px;
  right: 0;
  pointer-events: none;
  opacity: 0;
  transition: all 1s ${easeInOutSine};
  z-index: 5;

  &.show {
    opacity: 1;
    pointer-events: all;
    transition-delay: .5s;

    .intro {
      opacity: 1;
    }
  }

  .intro {
    font-size: 24px;
    color: white;
    font-family: annie use your telescope;
    opacity: 0;
    transition: all 1s ${EASE_OUT};
  }
`

export const GalleryItemList = styled.div`
  display: flex;
  z-index: 7;
  width: 100%;
  overflow-x: scroll;

  & > * {
    flex: 0 0 auto;
  }
`

export const GalleryItem = styled.div`
  height: 50%;
  opacity: 0;
  transform: translateX(500px);
  padding: 15px;
  transition: all 1s ${easeInOutSine};
  cursor: pointer;

  &:hover img {
    box-shadow: 0 0 40px ${p => lighten(.3, p.themeColor)};
    transform: scale(1.02);
    transition: all .4s ${EASE_OUT};
  }

  .show & {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_OUT} ${p => .35 + p.delay}s;
  }
  img {
    border: 2px solid white;
    border-radius: 2px;
    transition: all .3s ${EASE_OUT};
  }
`

export const GalleryTools = styled(ToolBar)`
  z-index: 5;
`

export const GalleryTool = styled(ToolBarItem)`
  pointer-events: ${p => p.disabled? 'none' : 'all'};
  cursor: ${p => p.disabled? 'default' : 'cursor'};

  &.gone {
    flex: 0 0 0;
    opacity: 0;
    padding-left: 0;
    padding-right: 0;
    transform: translate(-50px, 160px);
    transition: opacity .5s, flex 1s, padding .7s, transform 1s;
    transition-timing-function: ${easeInOutSine};
    transition-delay: .2s;
    overflow: hidden;

    div {
      max-height: 20px;
      overflow: visible;
    }
    &:after {
      display: none;
    }
  }
`
export const Spinner = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    z-index: 8;
    color: white;
    font-size: 20px;
    opacity: 0;
    transform: scale(2);
    transition: all 1s ${EASE_OUT};
    pointer-events: none;

    &.big {
      font-size: 52px;
    }
    &.opaque {
      background: ${p => p.themeColor};
    }
    &.show {
      opacity: 1;
      transform: none;
      transition: all 1s ${easeInOutSine};
      pointer-events: all;
    }

    i {
      animation-duration: 1s;
      animation-name: spinning;
      animation-iteration-count: infinite;
      animation-timing-function: ${easeInOutSine};
      flex: 0 0 auto;
      color: inherit;
      font-size: inherit;
    }
    span {
      animation-duration: 1s;
      animation-name: blinking;
      animation-iteration-count: infinite;
      animation-timing-function: ${easeInOutSine};
      animation-direction: alternate;
    }
`
