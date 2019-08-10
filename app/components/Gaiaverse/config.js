const Portals = {
  underwater: {
    title: '108',
    peers: {
      top: 'jojo',
      bottomLeft: 'towardthesun',
      bottomRight: 'alyssa',
    },
    position: {
      xOffset: '-360px',
    },
  },
  maypole: {
    title: '5th dimension',
    peers: {
      top: 'underwater',
      bottomLeft: 'river',
      bottomRight: 'pride',
    },
  },
  river: {
    title: 'bodyish',
    peers: {
      top: 'underwater',
      bottomLeft: 'towardthesun',
      bottomRight: 'pride',
    },
  },
  pride: {
    title: 'solitude',
    peers: {
      top: 'underwater',
      bottomLeft: 'river',
      bottomRight: 'alyssa',
    },
    position: {
      xOffset: '-460px',
    },
  },
  alyssa: {
    title: 'awakening',
    peers: {
      top: 'river',
      bottomLeft: 'underwater',
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
      bottomLeft: 'underwater',
      bottomRight: 'pride',
    },
    position: {
      yOffset: '-20px',
      xOffset: '-490px',
    },
  },
}

Object.keys(Portals).forEach(pid => {
  Portals[pid].id = pid
})

export default Portals
