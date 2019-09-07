import React from 'react'
import {CosmosRoot, CosmosSkin} from './styled'

import {connect} from 'react-redux'
import {makeEnum} from '../../utils/lang'
import psychedelia from './psychedelia'
import {View} from '../../containers/start/reducer.coffee'
import {setStartView} from '../../containers/start/actions.coffee'

export default connect((d) ->
  view: d.get('start').get('view'),
  energy: d.get('start').get('energy'),
) class Cosmos extends React.PureComponent

  componentDidMount: -> psychedelia()

  render: ->
    {view, energy} = @props
    <CosmosRoot className={energy + ' ' + view}>
      <CosmosSkin
        id='cosmosRoot'
        onClick={@onClick}
        className={view}
      />
    </CosmosRoot>

  onClick: =>
    @props.dispatch setStartView(View.cosmos)
