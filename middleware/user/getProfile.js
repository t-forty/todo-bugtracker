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
    const User = await DB.User.findOne({ where: { id: UserData.id}, attributes: ['id', 'userName', 'firstName', 'lastName']})
    // send User data  
    res.send(User)
}