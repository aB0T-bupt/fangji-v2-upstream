export function shouldClearAuthAfterRefreshError(error) {
  const status = Number(error?.status || error?.response?.status || 0)
  return status === 401 || status === 403
}
