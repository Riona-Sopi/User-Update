const express = require('express');
const router = express.Router();
const {list, getUser, editUser, remove, listSearch} = require('../controllers/user.controller');

//Authorization
const authorize = require('../middleware/authorize')
const Role = require('../middleware/role');

router.post('/users', list);
router.get('/user/:userId', getUser);
router.put('/user/:userId',  authorize([Role.Admin]), editUser);
router.delete('/user/:userId', authorize([Role.Admin]), remove);
router.get('/users/search', listSearch);


module.exports = router; 