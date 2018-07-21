export function openInNewTab(url) {
  ga('send', 'event', {
    eventCategory: 'external link',
    eventAction: 'click',
    eventLabel: url,
  })

  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.click()
}

export function canShowEditingTools() {
  return window.origin.includes('edit.')
}

export function isInsider() {
  return window.origin.includes('insider.')
}
