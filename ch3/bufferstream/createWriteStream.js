const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
//* createWriteStream으로 쓰기 스트림을 만든다.
//* 첫 번째 인수는 출력 파일명, 두 번째 인수는 옵션이 들어간다.
writeStream.on('finish', () => {
    console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다. \n');
writeStream.write('한 번 더 씁니다.');
writeStream.end(); // end로 종료를 알리고 이때 finish이벤트가 발생.
