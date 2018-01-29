import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
} from '../../global/constants'
import aSpinner from '../../components/spinnie'
import {
  ToolBar as ToolBarRaw,
  ToolBarItem as ToolBarItemRaw,
} from '../../global/styled'

const easeInOutSine = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';

injectGlobal`
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

  .quark-img-crop {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .cropper-view-box {
    outline-color: ${p => lighten(.3, p.themeColor)};
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

  .quarkHeader {
    position: absolute;
    top: 0;
    left: 0;
    text-shadow: 1px 1px ${p => darken(.2, p.themeColor)};
    margin: 0;
    padding: 0 0 30px;
    width: 100%;
    background: linear-gradient(to top, transparent 0%, ${p => alpha(.3, p.themeColor)} 100%);
    pointer-events: none;
    z-index: 3;

    &, .enter .quark-exit & {
      opacity: 0;
      transform: translateY(-250px);
      transition: all 1s ${easeInOutSine};
    }

    .enter &.show {
      opacity: 1;
      transform: none;
      transition: all 1s ${EASE_OUT};
    }

    @media (max-width: ${SCREEN_WIDTH_M_PX}) {
      padding-top: 10px;
    }
  }

  .enter &.quark-exit .quarkHeader.show {
    opacity: 0;
    transform: translateY(-250px);
    transition: all 1s ${easeInOutSine};
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

const ToolBar = styled(ToolBarRaw)`
  &, .enter .quark-exit &.show {
    opacity: 0;
    transform: translateY(150px);
    transition: all 1s ${easeInOutSine};
  }

  .enter &.show {
    opacity: 1;
    transform: none;
    transition: all 1s ${EASE_OUT};
  }
`

export const MultipleChoices = styled(ToolBar)`
  .mode-multipleChoice & {
    pointer-events: all;
  }
`

export const ToolBarItem = styled(ToolBarItemRaw)`
`

export const Choice = styled(ToolBarItem)`

`

export const CropPrompt = styled(ToolBar)`
  font-size: 36px;
  padding: 30px 0 20px;
  text-shadow: 1px 1px ${p => darken(.2, p.themeColor)};
  color: white;
  text-align: center;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    font-size: 24px;
    width: 100%;
  }

  .mode-crop & {
    pointer-events: all;
  }
`

export const CropTools = styled(ToolBar)`
  opacity: 0;
  transform: translateY(150px);
  pointer-events: none;
  transition: all 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);

  .mode-crop &.show {
    opacity: 1;
    transform: none;
    pointer-events: all;
    transition: all 1s ${EASE_OUT};
  }
`

export const CropTool = styled(ToolBarItem)`

`

export const DescribeTools = styled(ToolBar)`
  .mode-describe & {
    pointer-events: all;
  }
`

export const DescribeTool = styled(ToolBarItem)`
`

export const CroppedImage = styled.img`
  pointer-events: none;
  position: absolute;
  z-index: 6;

  &, .quark-exit &.show {
    opacity: 0;
    transition: all 1s ${easeInOutSine};
  }

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

  .quark-exit &.show {
    opacity: 0;
    transition: all 1s ${easeInOutSine};
  }

  &.show {
    opacity: .7;
    transition: all 1s ${easeInOutSine};
  }
`

export const OutlineDescription = styled.div`
  padding: 10px;
  position: absolute;
  pointer-events: none;
  z-index: 5;
  display: flex;
  flex-direction: column;

  &, .quark-exit &.show {
    opacity: 0;
    transform: translateY(-20px);
    transition: transform .5s, opacity .4s;
    transition-timing-function: ${easeInOutSine};
  }
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
  z-index: 5;

  &, .quark-exit &.show {
    opacity: 0;
    transition: all 1s ${easeInOutSine};

    .intro {
      opacity: 0;
    }
  }
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

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    display: none;
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

  .mode-quarkArtGallery & {
    pointer-events: all;
  }
`

export const GalleryTool = styled(ToolBarItem)`
  ${p => p.disabled && 'pointer-events: none'};
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
export const Spinner = styled(aSpinner)`
  &.big {
    font-size: 52px;
  }
  &.opaque {
    background: ${p => p.themeColor};
  }
`
