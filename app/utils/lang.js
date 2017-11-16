export function makeEnum(valueArray) {
  return valueArray.reduce((modeMap, mode) => (modeMap[mode] = mode) && modeMap, {})
}
