const express = require('express');
const { getMyPosts, searchByHashtag } = require('../controllers');

const router = express.Router();

// POST /test => 토큰 인증 과정 테스트 라우터.
router.get('/myposts', getMyPosts);

router.get('/search/:hashtag', searchByHashtag);

module.exports = router;