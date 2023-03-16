const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');
readStream.pipe(writeStream);
readStream.on('end', () => {
    console.log('stream: ', process.memoryUsage().rss);
});
/*
    큰 파일을 조각내어 작은 버퍼 단위로 옮긴것.
    스트림을 사용하면 효과적으로 데이터를 전송할 수 있다. 이런 이유로 큰 파일들을 전송할 때 스트림을 사용함
*/