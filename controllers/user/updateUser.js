DB = require('../../models/db')
module.exports = async (req, res, next) => {
    await DB.User.update( req.body.update, {
        where: req.body.user
      });
    const updatedUser = await DB.User.findOne({
        where: req.body.user,
        attributes: ['id', 'firstName', 'lastName', 'userName', 'email']
        
    })
    res.send(updatedUser)
    next()
}