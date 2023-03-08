/*
    타이머 기능을 제공하는 함수 setTimeout, setInterval, setImmediate는 노드에서 window 대신 global 객체 안에 들어 있다.
*/

/*
 * setTimeout(콜백 함수, 밀리초): 주어진 밀리초(1000분의 1초) 이후에 콜백 함수를 실행
 * setInterval(콜백 함수, 밀리초): 주어진 밀리초마다 콜백 함수를 반복 실행 함.
 * setImmediate(콜백 함수): 콜백 함수를 즉시 실행.
 
 ? 이 타이머 함수들은 모두 아이디를 반환. 아이디를 사용하면 타이머를 취소할 수 있다.

 * clearTimeout(아이디): setTimeout을 취소.
 * clearInterval(아이디): setInterval을 취소.
 * clearImmediate(아이디): setImmediate를 취소.
 */

const timeout = setTimeout(() => {
    console.log('1.5초 후 실행');
}, 1500);

const interval = setInterval(() => {
    console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않음');
}, 3000);

setTimeout(() => {
    clearTimeout(timeout2)
    clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
    console.log('즉시 실행');
});

const immediate2 = setImmediate(() => {
    console.log('im?', '실행되지 않음');
});

clearImmediate(immediate2);

/*
 * 제일 먼저 immediate가 실행.
 * immediate2는 바로 clearImmediate를 사용해서 취소해서 실행되지 않음.
 * 코드 실행 1초 후에 interval의 콜백 실행.
 * 코드 실행 1.5초 후에는 timeout 콜백이 실행.
 * interval의 콜백이 1초마다 실행되니까 2초 지났을 때도 실행
 * 2.5초가 지나면 clearTimeout, clearInterval이 timeout2, interval을 취소 함.
 * 3초 후에는 아무 로그도 남지 않는다.
*/

/*
    setImmediate(콜백)과 setTimeout(콜백, 0):
    setImmediate와 setTimeout에 담긴 콜백 함수는 이벤트 루프를 거친 뒤 즉시 실행된다.
    특수한 경우에 setImmediate는 setTimeout보다 먼저 실행된다. (파일 시스템 접근, 네트워킹 같은 I/O 작업의 콜백 함수 안에서 타이머를 호출하는 경우)
    setImmediate가 항상 setTimeout보다 먼저 호출되지 않는다.
*/