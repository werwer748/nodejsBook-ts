const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    // <Buffer ec a0 80 eb a5 bc 20 ec 9d bd ec 96 b4 ec a3 bc ec 84 b8 ec 9a 94 21>
    console.log(data.toString());
    // 저를 읽어주세요!
});

/*
    fs 모듈을 불러온 뒤 읽을 파일의 경로를 지정한다.
    여기서 파일의 경로가 현재 파일 기준이 아니라 node 명령어를 실행하는 콘솔 기준이라는점에 유의
    파일을 읽은 후 실행되는 콜백 함수도 readFile의 인수로 넣는다.

    readFile의 결과물은 버퍼라는 형식으로 제공된다.
*/