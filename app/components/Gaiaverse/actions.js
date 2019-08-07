export const GaiaverseActivatePortal = 'gaiaverse.activatePortal'
export const GaiaverseDive = 'gaiaverse.dive'

export function activatePortal(portalId) {
  return {
    type: GaiaverseActivatePortal,
    portalId,
  }
}

export function dive() {
  return {
    type: GaiaverseDive,
  }
}
