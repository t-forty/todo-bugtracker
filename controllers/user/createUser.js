DB = require('../../models/db')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = async (req, res, next) => {
    const {firstName, lastName, userName, password, email, TeamId, role } = req.body
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        // Store hash in your password DB.
        const newUser = await DB.User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hash,
            role: 'client',
            TeamId
        })
        const ModifiedNewUser = newUser
        delete ModifiedNewUser.dataValues.password
        res.send(ModifiedNewUser)
        next()
    });
}