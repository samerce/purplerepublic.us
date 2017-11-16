export default [
  'stopped',
  'recording',
  'paused',
].reduce((modeMap, mode) => (modeMap[mode] = mode) && modeMap, {})
