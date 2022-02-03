const config = require('../../helpers/auth/token/config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if(req.cookies.userToken){
        const { userToken } = req.cookies
        const decoded = jwt.verify(userToken, config.secret)  
        req.body.user = {
            id: decoded.id,
            userName: decoded.username,
            role: decoded.role 
        }
        next()
    }else{
        res.status(401).send('login')
    }
}