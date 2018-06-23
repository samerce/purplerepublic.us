export function openInNewTab(url) {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.click()
}

export function canShowEditingTools() {
  return true//window.origin.includes('edit.')
}
