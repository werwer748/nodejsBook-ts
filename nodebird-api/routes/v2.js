const express = require('express');
const cors = require('cors');

const { verifyToken, apiLimiter, corsWhenDomainMatches } = require('../middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v2');

const router = express.Router();

// router.use(cors({
//     credentials: true,
    /*
    * 응답에 Access-Control-Allow-Origin 헤더가 추가되어 나간다.
    * credentials: true => 다른 도메인간에 쿠키가 공유 됨.
    * 프론트와 서버의 도메인이 다른경우 이 옵션을 활성화 하지 않으면 로그인이 되지 않을 수 있다.
    * axios에서도 도메인이 다른데, 쿠키를 공유해야 할 경우 withCredentials: true 옵션을 줘서 요청을 보내야 한다.
    */
// }));

router.use(corsWhenDomainMatches);

// POST /v2/token
router.post('/token', apiLimiter, createToken);

// GET? /v2/test
router.get('/test', apiLimiter, verifyToken, tokenTest);

// GET /v2/posts/my
router.get('/posts/my', apiLimiter, verifyToken, getMyPosts);

// GET /v2/posts/hashtag/:title
router.get('/posts/hashtag/:title', apiLimiter, verifyToken, getPostsByHashtag);

module.exports = router;