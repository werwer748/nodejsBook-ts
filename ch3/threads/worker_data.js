const {
    Worker, isMainThread, parentPort, workerData,
} = require('worker_threads');

if (isMainThread) { // 부모 일때
    const threads = new Set();
    threads.add(new Worker(__filename, {
        workerData: { start: 1 },
        //? workerData 속성으로 원하는 데이터를 보낸다.
    }));
    threads.add(new Worker(__filename, {
        workerData: { start: 2 },
    }));
    for (let worker of threads) {
        worker.on('message', message => console.log('from worker', message));
        worker.on('exit', () => { //? 돌려 받을 때 워커가 종료되며 실행
            threads.delete(worker);
            if (threads.size === 0) {
                console.log('job done'); //? 워커 두개가 모두 종료되면 로깅...
            }
        });
    }
} else { // 워커일 때
    const data = workerData; //? 부모로부터 데이터를 받는다.
    parentPort.postMessage(data.start + 100); //? 부모로부터 숫자를 받아 100을 더해 돌려줌.
}

/*
--- 콘솔 ---
from worker 101
from worker 102
job done
*/