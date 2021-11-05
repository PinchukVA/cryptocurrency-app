export const Routs = {
  HomeRoute: '/',
  MainRoute: '/main'
}

export const linkToRoute = (history, route) => {
  history.push(route)
}