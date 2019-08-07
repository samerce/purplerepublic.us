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

    },
  },
  river: {
    title: 'body-ish',
    peers: {

    },
  },
  pride: {
    title: 'solitude',
    peers: {

    },
  },
}

Object.keys(Portals).forEach(pid => {
  Portals[pid].id = pid
})

export default Portals
