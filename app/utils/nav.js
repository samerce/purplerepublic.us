export function openInNewTab(url) {
  ga('send', 'event', {
    eventCategory: 'external link',
    eventAction: 'click',
    eventLabel: url,
  })

  const a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.target = '_blank'
  a.click()
  document.body.removeChild(a)
}

export function canShowEditingTools() {
  return window.origin.includes('edit.')
}

export function isInsider() {
  return window.origin.includes('insider.')
}
