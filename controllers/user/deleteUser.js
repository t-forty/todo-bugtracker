DB = require('../../models/db')
module.exports = async (req, res, next) => {
    if(req.body.user.id && req.body.user.userName){
        await DB.User.destroy({
            where: req.body.user
        })
        const checkDelete = DB.User.findOne({
            where: req.body.user
        })
        if(checkDelete){
            res.status(200).send(`deleted user ${req.body.user.userName}`)
        }else{
            res.status(500).send('SERVER ERROR: Try again later')
        }
    }else{
        res.send('ERROR: could not delete user, invalid token')
    }
    next()
}