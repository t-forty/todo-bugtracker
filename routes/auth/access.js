const express = require('express');
const verifyToken = require('../../middleware/auth/verifyToken');
const router = express.Router();
//const DB = require('../../models/db')
// MIDDLEWARE
const authorizeUser = require ('../../middleware/auth/authorizeUser')
// SIGNIN
router.post('/', authorizeUser);

module.exports = router;
