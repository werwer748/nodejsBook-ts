const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const parseCookies = (cookie = '') => // 쿠키 문자열 사용을 위해 자바스크립트 객체 형식으로 변환
    cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});

const session = {};

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const url = new URL(req.url, 'http://localhost:8085');
        const name = url.searchParams.get('name');
        const expires = new Date();
        // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        const uniqueInt = Date.now();
        session[uniqueInt] = { // 사용자의 이름과 만료 시간을 session 객체에 저장
            name,
            expires,
        };
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.session && session[cookies.session].expires > new Date()) { 
        // 세션쿠키가 존재하고, 만료 기간이 지나지 않았다면 session 변수에서 사용자 정보를 가져와 사용한다.
        // 이 방식이 세션 => 서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통하는것!
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요.`);
    } else { // 주소가 /이면서 name이라는 쿠키가 없는 경우
        try {
            const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
})
    .listen(8085, () => {
        console.log('8085번 포트에서 서버 대기 중입니다!');
    });