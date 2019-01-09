import React from 'react'

import {cx} from '../../../utils/style'
import {
  Root, ShootingStars, Star, StarRoot, StarWithTrail,
  Foreground, Background,
} from './styled'

import _ from 'lodash'
import resizable from '../../../components/hocs/resizable'

import {SRC_URL} from '../../../global/constants'

const INKY = SRC_URL + 'intro/inky-glass.png'

function getBackgroundSize() {
  return Math.max(window.innerHeight, window.innerWidth)
}

@resizable()
export default class Backdrop extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      foregroundLoaded: false,
      backgroundSize: getBackgroundSize(),
    }
  }

  onResize() {
    this.setState({backgroundSize: getBackgroundSize()})
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
  }

  render() {
    return (
      <Root>
        <ShootingStars>
          <StarRoot style={{
            transform: 'rotate(0deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '3.5s',
              animationDuration: '2.5s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(145deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '2s',
              animationDuration: '1.5s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(105deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '5s',
              animationDuration: '2.5s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(25deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '8.5s',
              animationDuration: '2s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(85deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '9.5s',
              animationDuration: '3s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(195deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '7.5s',
              animationDuration: '1s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(5deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '5s',
              animationDuration: '3.5s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(-15deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '2.5s',
              animationDuration: '2s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(67deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '.5s',
              animationDuration: '2.5s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(-87deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '3.5s',
              animationDuration: '1.7s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(-130deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '4s',
              animationDuration: '2.7s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(-190deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '3s',
              animationDuration: '2.2s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(-110deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '6.7s',
              animationDuration: '1.4s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(-168deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '8.4s',
              animationDuration: '3.2s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
          <StarRoot style={{
            transform: 'rotate(-45deg)',
          }}>
            <StarWithTrail style={{
              animationDelay: '4.5s',
              animationDuration: '2s',
            }}>
              <Star />
            </StarWithTrail>
          </StarRoot>
        </ShootingStars>

        <Background size={this.state.backgroundSize} />
        {/* <Foreground
          className={cx({show: this.state.foregroundLoaded})}
          src={INKY}
          onLoad={() => this.setState({foregroundLoaded: true})} /> */}
      </Root>
    )
  }

}
