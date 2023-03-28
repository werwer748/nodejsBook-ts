//* 라우터의 분리
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    next('route'); // next route로 다음 라우트(주소가 일치하는)로 가서 밑에꺼 실행안됨.
}, (req, res, next) => {
    console.log('실행되지 않습니다.');
    next();
}, (req, res, next) => {
    console.log('실행되지 않습니다.');
    next();
});
// GET / 라우터
router.get('/', (req, res) => {
    res.send('Hello, Express');
});


/*
router.get('/abc', (req, res) => {
    res.send('GET /abc');
});
router.post('/abc', (req, res) => {
    res.send('POST /abc');
});
*/
//* 주소는 같지만 메서드는 다른 코드는 한 덩어리로 줄일 수 있다.
router.route('/abc')
.get((req, res) => {
    res.send('GET /abc');
})
.post((req, res) => {
    res.send('POST /abc');
})

module.exports = router;