const DB = require('../../models/db')
const AuthHelpers = require('../../helpers/auth/AuthHelpers.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../../helpers/auth/token/config')
module.exports = UserMethods = (req, res, next) => {
    const findOneUser = async () => {
        try{
            const Query = req.query
            delete Query.method
            const QueryLength = Object.keys(Query).length
            if(QueryLength !== 0){
                const User = await DB.User.findOne({
                    where: Query, 
                    attributes: ['id', 'userName', 'firstName', 'lastName']
                })
                User.data !== "" ? res.send(User) : res.status(404).send('user not found')
                next()
            }
            else{
                res.send('Invalid query: search criteria cannot be NULL')
            }
        }catch(error){
            res.send(error)
        }
        next()
    }
    const findAllUsers = async () => {
        const users = await DB.User.findAll({ attributes: ['id', 'userName', 'firstName', 'lastName'] })
        res.send(users)
        next()
    }
    switch (req.query.method) {
        case 'findOne':
            findOneUser()
            break;
        case 'findAll':
            findAllUsers()
            break;
        case 'validateUser':
            findOneUser()
            break;
        default:
            res.send('invalid request: this route accepts query "?method= authorizeUser, findOne,  or findAll. Check that URL is formatted correctly')
    } 
}