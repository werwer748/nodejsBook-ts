//* process.nextTick(콜백): 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선으로 처리하도록 한다.

setImmediate(() => {
    console.log('immediate');
});

process.nextTick(() => {
    console.log('nextTick');
});

setTimeout(() => {
    console.log('timeout');
}, 0);

Promise.resolve().then(() => console.log('promise'));

//결과 확인 순서 nextTick => promise => timeout => immediate

/*
 * process.nextTick은 setImmediate나 setTimeout보다 먼저 실행된다.
 * 코드 맨 밑에 Promise를 넣은 것은 resolve된 Promise도 nextTick처럼 다른 콜백들보다 우선시되기 때문이다.
 * 그래서 process.nextTick과 Promise를 마이크로태스크라고 따로 구분해서 부른다.
*/

/*
 ! 마이크로태스크의 재귀 호출
 process.nextTick으로 받은 콜백 함수나 resolve된 Promise는 다른 이벤트 루프에서 대기하는 콜백 함수보다도 먼저 실행된다.
 그래서 비동기 처리를 할 때 setImmediate보다 process.nextTick을 더 선호하는 개발자도 있다.
 하지만 이런 마이크로태스크를 재귀 호출하게 되면 이벤트 루프는 다른 콜백 함수보다 마이크로태스크를 우선해 처리하므로 콜백 함수들이 실행되지 않을 수도있다.
*/


