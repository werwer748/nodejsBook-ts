/*
    createReadStream으로 파일을 읽고 그 스트림을 전달받아 createWriteStream으로 파일을 쓸 수도 있다.
    파일 복사와 비슷하다고... 
    스트림끼리 연결하는것을 '파이핑한다'고 표현 한다.
*/
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream);

/*
* pipe 메서드로 연결하면 저절로 데이터가 writeStream으로 넘어간다.
*/