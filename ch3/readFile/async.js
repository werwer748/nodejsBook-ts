const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('2번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('3번', data.toString());
});
console.log('끝');
/*
 --- 콘솔 ---
 시작
 끝
 1번 저를 여러번 읽어보세요.
 2번 저를 여러번 읽어보세요.
 3번 저를 여러번 읽어보세요.

 시작, 끝을 제외하면 결과 순서가 매번 다름.
*/

/*
    비동기 메서드들은 백그라운드에 해당 파일을 읽으라고 요청하고 다음 작업으로 넘어감.
    파일읽기 요청만 3번 보내고 '끝'을 찍는다.
    읽기가 완료된 후 백그라운드가 다시 메인 스레드에 알리고 메인 스레드는 그제서야 등록된 콜백 함수를 실행한다.
    수백개의 I/O가 들어와도 메인스레드는 백그라운드에 요청처리를 위임함.

    동기와 비동기 블로킹과 논블로킹 네 개의 용어가 혼용되어 사용되는데 의미상의 차이가 있음
    동기오 비동기: 백그라운드 작업 완료 확인 여부
    블로킹과 논블로킹: 함수가 바로 return되는지 여부

    동기-블로킹 방식에서는 백그라운드 작업 여부를 계속 확인함.
    호출한 함수가 바로 return되지 않고 백그라운드 작업이 끝나야 return한다.

    비동기-논블로킹 방식에서는 호출한 함수가 바로 return되어 다음 작업으로 넘어가고 백그라운드 작업 완료 여부는 신경쓰지 않고
    나중에 백그라운드가 알림을 줄 때 비로소 처리한다.
*/