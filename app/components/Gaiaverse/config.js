const Portals = {
  underwater: {
    title: '108',
    peers: {
      top: 'jojo',
      bottomLeft: 'bloom',
      bottomRight: 'fishypop',
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
      bottomLeft: 'bloom',
      bottomRight: 'pride',
    },
  },
  pride: {
    title: 'solitude',
    peers: {
      top: 'underwater',
      bottomLeft: 'river',
      bottomRight: 'fishypop',
    },
    position: {
      xOffset: '-460px',
    },
  },
  fishypop: {
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
  bloom: {
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
