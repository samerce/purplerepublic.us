import {openInNewTab} from '../../utils/nav'

export const BubbleButtonActions = {
  OpenLink: props => openInNewTab(props.url),
}
export const BubbleButtonActionList =
  Object.keys(BubbleButtonActions).reduce((list, k) => {
    list[k] = k
    return list
  }, {})
