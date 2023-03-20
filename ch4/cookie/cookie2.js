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

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const url = new URL(req.url, 'http://localhost:8084');
        const name = url.searchParams.get('name');
        const expires = new Date();
        // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
            /*
                쿠키명=쿠키값: 기본적인 쿠키의 값.
                Expires=날짜: 만료 기한. 이 기한이 지나면 쿠키가 제거된다.(기본값은 클라이언트 종료전까지)
                Max-age=초: Expires와 비슷하지만 날짜 대신 초를 입력할 수 있다. 해당 초가 지나면 쿠키가 제거된다. Expires보다 우선시 됨.
                Domain=도메인명: 쿠키가 전송될 도메인을 특정할 수 있다. 기본값은 현재 도메인
                Path=URL: 쿠키가 전송되 URL을 특정할 수 있다. 기본값은 '/'이고, 이 경우 모든 URL에서 쿠키를 전솔할 수 있다.
                Secure: HTTPS일 경우에만 쿠키가 전송 된다.
                HttpOnly: 설정 시 자바스크립트에서 쿠키에 접근할 수 없다. 쿠키 조작을 방지하기 위해 설정
            */
        });
        res.end();
    } else if (cookies.name) { // 주소가 /이면서 name이라는 쿠키가 있는 경우
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요.`);
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
    .listen(8084, () => {
        console.log('8084번 포트에서 서버 대기 중입니다!');
    });