const Portals = {
  tribalfish: {
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
      top: 'tribalfish',
      bottomLeft: 'river',
      bottomRight: 'pride',
    },
  },
  river: {
    title: 'bodyish',
    peers: {
      top: 'tribalfish',
      bottomLeft: 'maypole',
      bottomRight: 'pride',
    },
  },
  pride: {
    title: 'solitude',
    peers: {
      top: 'tribalfish',
      bottomLeft: 'river',
      bottomRight: 'maypole',
    },
  },
}

Object.keys(Portals).forEach(pid => {
  Portals[pid].id = pid
})

export default Portals
