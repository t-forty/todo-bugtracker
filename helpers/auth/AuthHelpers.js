const DB = require('../../models/db')
module.exports = async (body) => {
        let errorMsg = []
        const verifiedEmail = await DB.User.findOne({
            where: { email: body.email }
        })
        const verifiedPassword = await DB.User.findOne({
            where: { email: body.email, password: body.password}
        })
        const email = verifiedEmail ? true : errorMsg.push(`invalid email`)
        const password = verifiedPassword ? true : errorMsg.push(`invalid password`)
        const result = errorMsg.length > 1 ? 'user not found' : 'invalid password'
        return result
    
}