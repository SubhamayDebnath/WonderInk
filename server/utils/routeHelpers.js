function isActiveRoute(route, currentRoute) {
    return route === currentRoute ? 'active-link' : '';
  }
  
export default isActiveRoute ;