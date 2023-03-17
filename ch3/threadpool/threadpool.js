/*
    fs모듈의 비동기 메서드들을 사용해봤는데 이 비동기 메서드들은 백그라운드에서 실행되고, 
    실행된 후에 다시 메인 스레드의 콜백 함수나 프로미스의 then부분이 실행 된다.
    이 때 fs 메서드를 여러 번 실행해도 백그라운드에서 동시에 처리 되는데, 바로 스레드 풀이 있기 때문.

    fs 외에 내부적으로 스레드 풀 사용 모듈: crypto, zlib, dns.lookup 등이 있다.
*/

const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('1: ', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('2: ', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('3: ', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('4: ', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('5: ', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('6: ', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('7: ', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('8: ', Date.now() - start);
});

/*
 * 실행할 때마다 시간과 순서가 달라진다.
 * 스레드 풀이 작업을 동시에 처리하므로 여덟개의 작업 중에서 어느 것이 먼저 처리될지 모름.
 * 규칙: 1~4와 5~8이 그룹으로 묶여져 있고, 5~8이 1~4보다 시간이 더 소요 된다. (기본적인 스레드 풀의 개수가 네 개이기 떄문)
 * 처음 네 개의 작업이 동시 실행되고, 그것들이 종료되고 다음 네 개의 작업이 실행 됨.
*/

/*
 * 윈도: SET UV_THREADPOOL_SIZE=1
 * 맥, 리눅스: UV_THREADPOOL_SIZE=1
 * 스레드 풀의 개수 조절 명령어
 * SET UV_THREADPOOL_SIZE=숫자 와 같은 것은 process.env.UV_THREADPOOL_SIZE를 설정하는 명령어.
*/