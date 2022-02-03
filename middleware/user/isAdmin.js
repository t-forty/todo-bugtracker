const DB = require('../../models/db')
const AuthHelpers = require('../../helpers/auth/AuthHelpers.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../../helpers/auth/token/config')

module.exports = async (req, res, next) => {
    // get jwt from cookie
    const  userToken = req.cookies.userToken
    // decode jwt
    const UserData = jwt.decode(userToken)
    // findOne by id in jwt
    const admin = UserData.role == 'admin' ? true : false
    if(admin){        
        next()
    }else{
        res.status(403).send('ACCESS DENIED: Admin role required')
    }
}