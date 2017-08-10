import React, {PropTypes} from 'react'
import {Root, Text, Timer} from './styled'

export default class NavLink extends React.Component {

  render() {
    const {
      children,
      isTimed,
      isSelected,
      canHide,
      routeKey,
      isInMenu,
      onClick,
      className,
    } = this.props;
    console.log(children, ' hide ', canHide, ' selected ', isSelected, ' inmenu ', isInMenu)
    return (
      <Root
        className={className}
        onClick={onClick}
        canHide={canHide}
        isInMenu={isInMenu}
        isSelected={isSelected}>
        <Timer
          isTimed={isTimed}
          isSelected={isSelected}
          routeKey={routeKey} />
        <Text isInMenu={isInMenu}>{children}</Text>
      </Root>
    )
  }

}
