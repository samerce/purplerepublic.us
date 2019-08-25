import React from 'react'

import autobind from 'autobind-decorator'

function laganja() { return Component => {
  return class extends React.PureComponent {

    render() {
      return (
        <Component
          initMoments={this.initMoments}
          {...this.props}
        />
      )
    }

    @autobind
    initMoments(momentDna) {

    }

  }
}}

export default laganja
