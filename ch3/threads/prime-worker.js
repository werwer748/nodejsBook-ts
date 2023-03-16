const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const min = 2;
let primes = [];

function findPrimes(start, range) {
    let isPrime = true;
    const end = start + range;
    for (let i = start; i < end; i++) {
        for (let j = min; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

if (isMainThread) {
    const max = 10000000;
    const threadCount = 8;
    const threads = new Set();
    const range = Math.floor((max- min)/ threadCount);
    let start = min;
    console.time('prime');
    for (let i=0; i< threadCount-1; i++) {
        const wStart= start;
        threads.add(new Worker(__filename, { workerData: {start: wStart, range } }));
        start += range;
    }
    threads.add(new Worker(__filename, { workerData: { start, range: max - start } }));
    for (let worker of threads) {    
        worker.on('error', (err)=> {
            throw err;    
        });    
        worker.on('exit', ()=> {      
            threads.delete(worker);
            if (threads.size===0) {        
                console.timeEnd('prime');        
                console.log(primes.length);     
            }    
        });    
        worker.on('message', (msg)=> {      
            primes = primes.concat(msg);    
        });
    }
} else {
    findPrimes(workerData.start, workerData.range);  
    parentPort.postMessage(primes);
}

/*
    속도가 6배 정도 빨라짐.
    워커스레드를 여덟개 사용했다고 해서 여덟배 빨라지는 것은 아니다.
    스레드를 생성하고 스레드 사이에서 통신하는데 상당한 비용이 발생하므로, 이 점을 고려 할것.
    잘못하면 싱글 스레딩보다 느려질수도...
*/
