const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());
console.log('끝');

/*
 --- 콘솔 ---
 시작
 1번 저를 여러번 읽어보세요.
 2번 저를 여러번 읽어보세요.
 3번 저를 여러번 읽어보세요.
 끝
*/

/*
    readFileSync는 콜백 함수를 넣는 대신 직접 return값을 받아오고,
    값을 바로 다음 줄부터 사용 가능하다.

    readFileSync는 요청이 수백 개 들어올 때 성능에 문제가 생긴다.(비효율적이다.)
    프로그램을 처음 실행할 때 초기화 용도로만 사용하는 것을 권장한다.
*/