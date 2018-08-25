import {fromJS} from 'immutable'
import {SetActivePostIndex, SetPosts} from './actions'

const initialState = fromJS({
  activePostIndex: 0,
  posts: [],
})

export default function instagram(state = initialState, action) {
  switch (action.type) {
    case SetActivePostIndex:
      return state.set('activePostIndex', action.activePostIndex)
    case SetPosts:
      return state.set('posts', action.posts)
    default:
      return state
  }
}
