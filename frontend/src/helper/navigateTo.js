export function navigateTo(data) {
  const { history, navigatedata } = data;
  history.push(navigatedata.route);
}

export function handlePageRoute(route, props) {
  navigateTo({
    navigatedata: {
      route: route,
    },
    ...props,
  });
}
