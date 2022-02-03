import axios from 'axios' 
export const authenticated = (type) => {
    const auth = localStorage.getItem('auth')
    switch (type) {
        case true:
            localStorage.setItem('auth', true)
            break;
        case false:
            localStorage.setItem('auth', false)
            break;
        default:
            localStorage.setItem('auth', null)
            break;
    }
    return auth
}
export async function signinUser (values) {
    const isLoggedIn = await axios.post('/auth/access', values)
    isLoggedIn.data ? authenticated(true) : authenticated(false)
    return isLoggedIn.data
}
export async function createUser (values) {
    const newUser = await axios.post('/api/users', values)
    console.log(newUser)
    return newUser
}

export async function findOne (key, values) {
    let User
    // let payload
    const {email, userName } = values
    switch (key) {
        case 'email':
            User = await axios.get(`/api/users/validate?method=validateUser&email=${email}`)
            break;
        case 'username':
            User = await axios.get(`/api/users/validate?method=validateUser&userName=${userName}`)
            break;
        default:
            console.log('error')    
        break;
    }
    return User
}

