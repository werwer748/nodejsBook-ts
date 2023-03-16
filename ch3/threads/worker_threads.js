//* 노드에서 멀티 스레드 방식으로 작업하는 방법.

const {
    Worker, isMainThread, parentPort
} = require('worker_threads');

if (isMainThread) { // 부모일 때?
    const worker = new Worker(__filename);
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => console.log('worker exit'));
    worker.postMessage('ping');
} else { // 워커일 때!
    parentPort.on('message', (value) => {
        console.log('from parent', value);
        parentPort.postMessage('pong');
        parentPort.close(); //! 중요 종료시켜 줘야한다!
    });
}

/*
    isMainThread를 통해 현재 코드가 메인스래드에서 실행되는지, 우리가 생성한 워커 스레드에서 실행되는지 구분한다.

    메인 스레드에서는 new Worker(__filename)으로 현재 파일을 실행 중. 나머지 else 부분만 워커스레드에서 실행 된다.

    worker.postMessage: 부모 => 워커에 데이터를 보냄
    parentPort.on('message'): 이벤트리스너로 부모로부터 메시지를 받음
    parentPort.postMessage: 부모에게 메시지를 보냄
    worker.on('message'): 워커로부터 메시지를 받음
    --> 메시지를 한번만 받고싶다면 once('message')를 사용

    워커에서 on메서드를 사용할 때는 직접 워커를 종료해야 한다!! => parentPort.close();
    연결이 종료될 때는 worker.on('exit')이 실행된다.

    --- 콘솔 ---
    from parent ping
    from worker pong
    worker exit
*/