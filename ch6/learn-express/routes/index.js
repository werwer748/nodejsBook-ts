const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
    //? res 객체에 추가한 템플릿 렌더링을 위한 메서드. { title: 'Express' }라는 객체를 변수로 집어 넣는다. 
    //? HTML에도 변수를 사용할 수 있게 된 셈이다.
});

router.get('/', (req, res, next) => {
    res.locals.title = 'Express';
    res.render('index');
    //? render 두번째 인수로 변수 객체를 넣는대신 res.locals 객체를 활용해 변수를 넣을 수도 있다.
});

module.exports = router;