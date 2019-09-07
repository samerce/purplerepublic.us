export StartSetView = 'start.setView'

export setStartView = (view, energy = '') ->
  type: StartSetView,
  view: view,
  energy: energy,
