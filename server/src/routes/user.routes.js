const express = require('express');
const router = express.Router();
const { attachUser } = require('../middleware/auth');
const { getProfile, updateProfile, deleteAccount } = require('../controllers/user.controller');

router.get('/profile', attachUser, getProfile);
router.put('/profile', attachUser, updateProfile);
router.delete('/account', attachUser, deleteAccount);

module.exports = router;
