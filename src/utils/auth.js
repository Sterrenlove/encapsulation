const TokenKey = 'Admin-Token'

export function getToken() {
  const token = localStorage.getItem(TokenKey)
  if (token) return token
  else return false
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
