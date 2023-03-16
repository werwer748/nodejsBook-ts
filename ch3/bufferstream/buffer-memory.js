const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);
//before:  37404672

const data1 = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.txt', data1);
console.log('buffer: ', process.memoryUsage().rss);
// buffer:  1038581760

/*
    메모리 용량이 순식간에 커짐
    1GB 용량의 파일을 복사하기 위해 메모리에 파일을 올려둔 후 wirteFileSync를 수행했기 때문
*/