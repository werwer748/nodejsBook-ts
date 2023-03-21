/*
    https 모듈은 웹 서버에 SSL 암호화를 추가한다.
    GET이나 POST 요청을 할 때 오가는 데이터를 암호화해서 중간에 요청을 가로채도 내용을 확인할 수 없다.
    인증서를 발급 받아야 사용 가능하고 발급받은 인증서가 있다면 아래 코드를 적용
*/

const https = require('http');
const fs = require('fs');

https.createServer({
    cert: fs.readFileSync('도메인 인증서 경로'),
    key: fs.readFileSync('도메인 비밀 키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(443, () => { // 서버 연결
        console.log('443번 포트에서 서버 대기 중입니다!');
    });
/*
 * createServer 메서드가 인수 두 개를 받는다.
 * 두번째 인수는 http 모듈과 같이 서버 로직이고, 첫 번째 인수는 인증서에 관련된 옵션 객체이다.
 * 인증서 구입시 pem이나, cert, 또는 key 확장자를 가진 파일들을 제공한다. 파일들을 fs.readFileSync 메서드로 읽어서 cert, key, ca 옵션에 맞게 넣으면 된다.
 * 실 서버 포트는 80번 대신 443번 포트를 사용하면 된다.
 * 
 * 노드의 http2 모듈은 SSL 암호화와 더불어 최신 HTTP 프로토콜인 http/2를 사용할 수 있게 한다.
 * http/2는 요청 및 응답 방식이 기존 http/1.1보다 개선되어 훨씬 효율적으로 요청을 보낸다. 웹의 속도도 많이 개선된다.
*/
