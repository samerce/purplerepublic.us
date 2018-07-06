export function openInNewTab(url) {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.click()
}

export function canShowEditingTools() {
  return window.origin.includes('edit.')
}
