const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./server2.html');
        // 요청이 들어오면 fs모듈로 html파일을 읽는다.
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
        // data 변수에 저장된 버퍼를 클라이언트로 보낸다.
    } catch (err) { // 에러 발생에 대응
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }); // 에러메시지는 일반 문자열이므로 text/plain을 사용함.
        res.end(err.message);
    }
})
    .listen(8081, () => {
        console.log('8081번 포트에서 서버 대기 중!!!');
    });

/*
    요청 처리 과정중 에러가 발생했다고 해서 응답을 보내지 않으면 안된다.
    요청의 성패와 상관 없이 클라이언트에 요청이 마무리되었음을 알려야 한다.
*/