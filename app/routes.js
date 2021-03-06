// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      getComponent(nextState, cb) {
        import('containers/purpleRouter')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    // {
    //   path: '/vision',
    //   name: 'vision',
    //   getComponent(nextState, cb) {
    //     import('containers/Vision')
    //       .then(loadModule(cb))
    //       .catch(errorLoading);
    //   },
    // }, {
    //   path: '/show',
    //   name: 'show',
    //   getComponent(nextState, cb) {
    //     import('containers/Show')
    //       .then(loadModule(cb))
    //       .catch(errorLoading);
    //   },
    // }, {
    //   path: '/bowling',
    //   name: 'bowling',
    //   getComponent(nextState, cb) {
    //     import('containers/Bowling')
    //       .then(loadModule(cb))
    //       .catch(errorLoading);
    //   },
    // }, {
    //   path: '/events',
    //   name: 'events',
    //   getComponent(nextState, cb) {
    //     import('containers/Events')
    //       .then(loadModule(cb))
    //       .catch(errorLoading);
    //   },
    // }, {
    //   path: '/getting-involved',
    //   name: 'getting-involved',
    //   getComponent(nextState, cb) {
    //     import('containers/GettingInvolved')
    //       .then(loadModule(cb))
    //       .catch(errorLoading);
    //   },
    // },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
