const Portals = {
  tribalfish: {
    title: '108',
    peers: {
      top: 'jojo',
      bottomLeft: 'towardthesun',
      bottomRight: 'alyssa',
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
      bottomLeft: 'towardthesun',
      bottomRight: 'pride',
    },
  },
  pride: {
    title: 'solitude',
    peers: {
      top: 'tribalfish',
      bottomLeft: 'river',
      bottomRight: 'alyssa',
    },
  },
  alyssa: {
    title: 'awakening',
    peers: {
      top: 'river',
      bottomLeft: 'tribalfish',
      bottomRight: 'pride',
    },
    position: {
      xOffset: '-330px',
    },
  },
  towardthesun: {
    title: 'trust',
    peers: {
      top: 'river',
      bottomLeft: 'jojo',
      bottomRight: 'pride',
    },
    position: {
      xOffset: '-420px',
    }
  },
  jojo: {
    title: 'isness',
    peers: {
      top: 'river',
      bottomLeft: 'tribalfish',
      bottomRight: 'pride',
    },
    position: {
      yOffset: '200px',
    }
  },
}

Object.keys(Portals).forEach(pid => {
  Portals[pid].id = pid
})

export default Portals
