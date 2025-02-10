export default defineNuxtPlugin((nuxtApp) => {
  addRouteMiddleware('routeWatcher', (to, from) => {
      // console.log('from: ' + from.path, 'to: ' + to.path);
    },
    { global: true }
  )
})
