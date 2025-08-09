const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createBookmark, getBookmarks, getBookmark, deleteBookmark } = require('../controllers/bookmarkController');

router.post('/', auth, createBookmark);
router.get('/', auth, getBookmarks);
router.get('/:id', auth, getBookmark);
router.delete('/:id', auth, deleteBookmark);

module.exports = router;