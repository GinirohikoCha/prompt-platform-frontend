import { Router } from 'vue-router'

const title = import.meta.env.VITE_APP_TITLE || 'Prompt Platform'

export function useGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (to.meta?.title) {
      document.title = getPageTitle(to.meta.title)
    }
    next()
  })
  router.afterEach(() => {
  })
}

export default function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}