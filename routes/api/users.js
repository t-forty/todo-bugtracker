const express = require('express');
const router = express.Router();
// MIDDLEWARE
const bcrypt = require('bcrypt')
const findUser = require('../../middleware/user/UserMethods')
// CONTROLLERS
const deleteUser = require('../../controllers/user/deleteUser')
const updateUser = require('../../controllers/user/updateUser')
const createUser = require('../../controllers/user/createUser');
const verifyToken = require('../../middleware/auth/verifyToken');
const getProfile = require('../../middleware/user/getProfile');
const isAdmin = require('../../middleware/user/isAdmin');

/**
 * ROUTES
 */
// CREATE USER
router.post('/', createUser);
// GET ONE or ALL (ex: url/api/users/?method=findOne or findAll)
router.get('/', verifyToken, isAdmin, findUser);
// GET PROFILE
router.get('/profile', verifyToken, getProfile)
// GET user; check for duplicate email, or username
router.get('/validate', findUser)
// UPDATE USER
router.put('/', verifyToken,updateUser)
// DELETE USER
router.delete('/', verifyToken,deleteUser)


module.exports = router;



