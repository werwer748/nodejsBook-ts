//* 노드에서 잡아주는 에러
const fs = require('fs');

setInterval(() => {
    fs.unlink('./abcdefg.js', (err) => {
        if (err) {
            console.error(err);
        }
    });
}, 1000);

/*
 * fs.unlink로 존재하지 않는 파일을 지우고 있다.
 * 에러가 발생하지만, 노드 내장 모듈의 에러는 실행 중인 프로세스를 멈추지 않는다.
 * 
 * error1에서 throw를 사용했는데 그러면 노드 프로세스가 멈춰버린다. 이 경우 반드시 try/catch문으로 throw한 에러를 잡아야 한다.
*/