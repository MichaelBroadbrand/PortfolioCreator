const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { attachUser } = require('../middleware/auth');
const { uploadSingle, deleteSingle } = require('../controllers/upload.controller');

router.post('/', attachUser, upload.single('image'), uploadSingle);
router.delete('/', attachUser, deleteSingle);

module.exports = router;
