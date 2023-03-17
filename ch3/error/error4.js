process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
});

setInterval(() => {
    throw new Error('서버 고장내뿌기!');
}, 1000);

setTimeout(() => {
    console.log('실행됩니다~!');
}, 2000);

/*
 * process객체에 uncaughtException 이벤트 리스너를 달아서 에러가 발생했을때,
 * 이벤트 리스너가 실행되고 프로세스가 유지 되는데 이 부분이 없다면 setTimeout이 실행되지 않는다.
 * 1초만에 프로세스가 멈추기 때문이다.
 * 하지만, uncaughtException 이벤트 리스너가 연결되어 있으므로 프로세스가 멈추지 않는다.
*/

/*
    try/catch로 처리하지 못한 에러가 발생했으나 코드가 제대로 실행되었다.
    하지만 uncaughtException이벤트로 모든 에러를 처리할 수는 없다.
    uncaughtException 이벤트 발생 후 다음 동작이 보증되지 않기 때문이다.

    따라서 uncaughtException는 에러 내용을 기록하는 정도로 사용하고
    에러가 발생했을 때 철저히 기록(로깅)하는 습관을 들이고, 주기적으로 로그를 확인하면서 보완해 나가야 한다.
*/