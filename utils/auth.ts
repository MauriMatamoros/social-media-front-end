import cookie from 'js-cookie'

export const handleLogin = (token: string) => {
    cookie.set('token', token)
}

export const handleLogout = () => {
    cookie.remove('token')
    window.localStorage.setItem('logout', `${Date.now()}`)
}
