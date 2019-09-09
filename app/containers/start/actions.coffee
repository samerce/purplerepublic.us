export StartSetView = 'start.setView'
export StartSetFruitScrolled = 'start.setFruitScrolled'

export setStartView = (view, props) -> {
  ...props,
  type: StartSetView,
  view: view,
}

export setFruitScrolled = (scrolled) -> {
  scrolled,
  type: StartSetFruitScrolled,
}
