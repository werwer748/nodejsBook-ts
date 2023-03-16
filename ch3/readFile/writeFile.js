const fs = require('fs');

fs.writeFile('./writeme.txt', '글은 입력되었습니다.', (err) => {
//* 해당 메서드에 생성될 파일의 경로와 내용을 입력한다.
    if (err) {
        throw err;
    }
    fs.readFile('./writeme.txt', (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data.toString());
    });
});