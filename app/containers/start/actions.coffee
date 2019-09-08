export StartSetView = 'start.setView'

export setStartView = (view, props) -> {
  ...props,
  type: StartSetView,
  view: view,
}
