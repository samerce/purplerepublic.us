import quarkMothers from './quarkMothers'

export function getMotherImageIndex() {
  return Math.round(Math.random() * (quarkMothers.length - 1))
}
