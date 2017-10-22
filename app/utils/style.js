export const cx = classMap => (
  Object.keys(classMap).filter(c => !!classMap[c]).join(' ')
)
