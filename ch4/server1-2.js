const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(8080, () => { // 서버 연결
        console.log('8080번 포트에서 서버 대기 중입니다!');
    });

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(8081, () => { // 서버 연결
        console.log('8081번 포트에서 서버 대기 중입니다!');
    });

/*
    서버 여러개를 띄울수도 있지만 실무에서 쓰이는 일은 드물다
*/