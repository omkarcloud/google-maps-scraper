export function pushToHome(router: any) {
  router.push({
    pathname: '/',
  })
}

export function pushToRoute(router: any, path) {
  router.push({
    pathname: path,
  })
}
