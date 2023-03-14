/*
    매번 전체용량을 버퍼로 처리하는 것은 비효율 적이다.
    그래서 버퍼의 크기를 작게 만들고 여러번에 걸쳐 나눠 보내는 방식이 나왔는데 이것이 스트림.
*/

const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
//* createReadStream으로 읽기 스트림을 만듬. 첫번째 인수는 파일 경로, 두번째 인수는 옵션 객체
//* highWaterMark는 버퍼의 크기를 정할 수 있는 옵션. 기본은 64KB, 지금은 16B
const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data : ', chunk, chunk.length);
});
/*
* readStream은 이벤트 리스너를 붙여서 사용
* 보통 data, end,error 이벤트를 사용한다.
*/

readStream.on('end', () => {
    console.log('end : ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error : ', err);
});