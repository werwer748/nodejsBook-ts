const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
    res.send('Hello, User');
});

module.exports = router;

/*
 * /user/:id => :id에 다양한 값이 들어갈 수 있다. ex) user/1, user/123
 * req.params 객체에 들어있는데 :id라서 req.params.id로 조회 가능
 * 주의점: user/like 같은 라우터는 user/:id같은 라우터보다 위에 위치해야한다.
 * 
 * 쿼리스트링의 경우:
 * /users/123?limit=5&skip=10
 * req.params, req.query => { id: '123' }, { limit: '5', skip: '10' }
*/