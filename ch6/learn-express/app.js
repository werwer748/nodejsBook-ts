const express = require('express');
const path = require('path');

const app = express(); // express 내부에 http 모듈이 내장되어 있어서 서버의 역할을 할 수 있다.
app.set('port', process.env.PORT || 3000); //? 서버가 실행될 포트 설정

app.get('/', (req, res) => {
//* app.get(주소, 라우터): 주소에 대한 GET 요청이 올 때 어떤 동작을 할지 적는 부분.
    // res.send('Hello, Express!');
    //? express에서는 res.wirte나 res.end 대신 res.send를 사용하면 된다.
    res.sendFile(path.join(__dirname, '/index.html'));
    //? html파일 서빙할 경우 res.sendFile사용
});

app.listen(app.get('port'), () => {
//? listen부는 http 웹 서버와 동일함.
    console.log(app.get('port'), '번 포트에서 대기 중')
});