const express = require('express');
const { getMyPosts, searchByHashtag, renderMain } = require('../controllers');

const router = express.Router();

// POST /test => 토큰 인증 과정 테스트 라우터.
router.get('/myposts', getMyPosts);

router.get('/search/:hashtag', searchByHashtag);

router.get('/', renderMain);
/*
* main.html을 통해 프론트에서 요청을 하게끔 되어있는데 이때 
* CORS에러 발생
* 브라우저에서 서버로 요청시 발생하는 현상(서버에서 서버로의 요청에서는 발생하지 않는다.)
* 클라이언트(localhost:4000) 요청을 받는 서버 (localhost:8002)의 도메인이 다르다.

? 크롬관리자 Network탭에서 확인하면  Method에 OPTIONS가 있고 POST요청은 CORS error 로 뜬다.
? OPTIONS 메서드가 실제 요청을 보내기전 서버가 요청의 도메인, 헤더와 메서드 등을 허용하는지 체크하는 역할을 한다고 함.
? nodebird-api 콘솔에도 OPTIONS /v2/token 200 1.035 ms - 4 요청이 기록됨.
? 응답헤더에 Access-Control-Allow_Origin이라는 헤더를 res.set 메서드로 직접 넣어도 되지만 cors라는 패키지를 사용하면 편리함 (nodebird-api에 설치할 것)
*/

module.exports = router;