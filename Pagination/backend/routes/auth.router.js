const express = require('express');
const router = express.Router();
const Multer = require('../middleware/multer');
const {signup, signin, signout, forgotPassword, resetPassword, list, update} = require('../controllers/auth.controller');

//Authorization
const authorize = require('../middleware/authorize')
const Role = require('../middleware/role');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.get('/users', list);
// router.get('/user/:id', update);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);




module.exports = router; 