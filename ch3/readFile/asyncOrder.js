const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme2.txt', (err, data) => {
        if (err) {
            throw err;
        }
        console.log('2번', data.toString());
        fs.readFile('./readme2.txt', (err, data) => {
            if (err) {
                throw err;
            }
            console.log('3번', data.toString());
            console.log('끝');
        });
    });
})
/*
 --- 콘솔 ---
 시작
 1번 저를 여러번 읽어보세요.
 2번 저를 여러번 읽어보세요.
 3번 저를 여러번 읽어보세요.
 끝
*/
/*
    콜백 지옥이지만 순서가 어긋나는 일은 없다...
*/