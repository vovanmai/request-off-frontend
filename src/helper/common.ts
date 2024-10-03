import { ROUTES } from '../constants/routes'
export const removeEmptyFields = (obj: Record<string, any>): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== '' && obj[key] !== undefined && obj[key] !== null) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Record<string, any>);
};

export const getActiveMenuByRoute = (pathname: string) => {
  const matchRoutes = [
    {
      regex: /^\/dashboard\/roles$/,
      path: ROUTES.DASHBOARD_ROLE_LIST
    },
    {
      regex: /^\/dashboard\/roles\/create$/,
      path: ROUTES.DASHBOARD_ROLE_LIST
    },
    {
      regex: /^\/dashboard\/roles\/\d+\/edit$/,
      path: ROUTES.DASHBOARD_ROLE_LIST
    },
    {
      regex: /^\/dashboard\/users$/,
      path: ROUTES.DASHBOARD_USER_LIST
    },
  ]

  const route = matchRoutes.find((route) => {
    return route.regex.test(pathname)
  })

  return route ? route.path : null
}