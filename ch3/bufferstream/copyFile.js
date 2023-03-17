const fs = require('fs').promises;

fs.copyFile('readme4.txt', 'writeme4.txt')
    .then(() => {
        console.log('복사 완료');
    })
    .catch((error) => {
        console.error(error);
    });

/*
 * readme4.txt와 동일한 내용의 writeme4.txt 가 생성 됨.
 * 첫번째 인수로 복사할 파일, 두번째 인수로 복사될 경로, 세번째 인수로 복사 후 실행될 콜백 함수를 넣는다.
*/