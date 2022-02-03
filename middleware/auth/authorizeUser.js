const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../helpers/auth/token/config')
const AuthHelpers = require('../../helpers/auth/AuthHelpers')

module.exports = authorizeUser = async (req, res, next) => {
    const {password} = req.body
    // try to get user object from db returns user or empty object
    const User = await DB.User.findOne({
        where: {
            email: req.body.email
            }
        })   
    if(!User){
        res.status(404).send('user not found')
    }else{
        // compare submitted password to password stored in DB
        const authorize = await bcrypt.compare(password, User.password)

        // if passwords dont compare send error msg (bad email, or password)
        // ELSE send userToken as cookie, and send user info except for password
        if(!authorize){
            const errorMSG = await AuthHelpers(req.body)
            res.status(404).send(errorMSG)
        }else{
        
            // assign user(id and username) to new variable 
            const tokenObj = {
                id: User.id,
                username: User.userName,
                role: User.role
            }
            // create jwt(userToken) with tokenObj as payload
            const UserToken = jwt.sign(tokenObj, config.secret, {
                expiresIn: '30d' // 30 days
            });
            // assign token to cookies
            res.cookie('userToken', UserToken, { httpOnly: true});
            // send user object
            res.send(true)
        }    
        next();
    }
}