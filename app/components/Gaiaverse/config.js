const Portals = {
  jellyfish: {
    title: '108',
    peers: {
      top: 'maypole',
      bottomLeft: 'river',
      bottomRight: 'pride',
    },
  },
  maypole: {
    title: '5th dimension',
    peers: {
      top: 'jellyfish',
      bottomLeft: 'river',
      bottomRight: 'pride',
    },
  },
  river: {
    title: 'body-ish',
    peers: {
      top: 'jellyfish',
      bottomLeft: 'maypole',
      bottomRight: 'pride',
    },
  },
  pride: {
    title: 'solitude',
    peers: {
      top: 'jellyfish',
      bottomLeft: 'river',
      bottomRight: 'maypole',
    },
  },
}

Object.keys(Portals).forEach(pid => {
  Portals[pid].id = pid
})

export default Portals
