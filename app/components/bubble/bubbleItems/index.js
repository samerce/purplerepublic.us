const FilterOptions = [
  // {
  //   name: 'photos',
  //   Component: require('./gallery').default,
  //   componentName: 'BubbleGallery',
  // },
  {
    name: 'videos',
    Component: require('./video').default,
    componentName: 'BubbleVideo',
  },
  {
    name: 'writing',
    Component: require('./medium').default,
    componentName: 'BubbleMedium',
  },
  // {
  //   name: 'music',
  //   nucleusClass: BubbleMusic,
  // },
]

const exportsss = {All: FilterOptions}
FilterOptions.forEach(opt => exports[opt.componentName] = opt.Component)
export default exportsss
