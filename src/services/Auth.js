import axios from 'axios'

export default class AuthService {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/auth/'
        this.setAuthorizationHeader()
    }
    logout() {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
    }
    login(email, password) {
        return axios.post('login', {
        email, password
        }).then((response) => {
        // console.log(response.data.access_token)
        window.localStorage.setItem('token', response.data.access_token)
        this.setAuthorizationHeader()
        })
    }
    setAuthorizationHeader() {
        const token = window.localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    isAuthenticated() {
        return !!localStorage.getItem('token')
    }

    addUser(user) {
        return axios.post('register', user).then((response) => {
        // console.log(response.data.access_token)
        window.localStorage.setItem('token', response.data.access_token)
        this.setAuthorizationHeader()
        })

    }
}
export const authService = new AuthService()
