/*
    싱글 프로세스로 동작하는 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈
    cluster 모듈을 설정해 코어 하나당 노드 프로세스 하나가 돌아가게 할 수 있다.(성능 개선의 장점이있음)
    메모리를 공유하지 못하는 단점도 존재한다. 때문에 세션을 메모리에 저장하는 경우 문제가 될 수 있으며, 이는 레디스 등의 서버를 도입해 해결할 수 있다.
    클러스터링 한다 라고 얘기하는 듯
*/

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    // CPU 개수만큼 워커를 생산
    for (let i=0; i < numCPUs; i+= 1) {
        cluster.fork();
    }
    // 워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        cluster.fork(); // 워커 프로세스가 종료 되었을 때 새로 하나를 생성
    });
} else {
    //워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        setTimeout(() => { // 워커가 존재하는지 확인하기 위해 1초마다 강제 종료
            process.exit(1);
        }, 1000);
    })
    .listen(8086);

    console.log(`${process.pid}번 워커 실행`);
}

/*
 * worker_threads의 예제와 모양이 비슷하지만 스레드가 아니라 프로세스다.
 * 클러스터에는 마스터 프로세스와 워커 프로세스가 있다.
 * 마스터 프로세스는 CPU 개수만큼 워커 프로세스를 만들고, 8086포트에서 대기한다. 요청이 들어오면 만들어진 워커 프로세스에 요청을 분배한다.
 * 워커 프로세스가 실질적인 일을 하는 프로세스.
 * 
 * localhost:8086에 접속하고 1초후 콘솔에서 워커 종료를 알림
 * 컴퓨터의 코어 개수만큼 새로고침을 하면 모든 워커가 종료되어 서버가 응답을 하지 않는다.
 * 
 * code는 process.exit의 인수로 넣어준 코드가 출력되고, signal은 존재하는 경우 프로세스를 종료한 신호의 이름이 출력된다.
 * 워커 프로세스가 존재하기에 cpu 개수만큼은 오류가 발생해도 서버가 정상 작동할 수 있다는 뜻이다.
 * 종료된 워커를 다시 켜면 오류가 발생해도 계속 버틸 수 있다.
 * 
 * 워커 하나가 종료될 때 새로운 워커를 생성하는 방식으로 오류를 처리하는 것은 좋지 않다. 오류의 원인을 찾아 해결해야 한다!!
 * 예기치 못한 에러로 서버 종료 현상은 방지할 수 있어 클러스터링은 적용해두면 좋다.
 * 
 * 예제처럼 직접 cluster 모듈로 클러스터링을 구현할 수 있지만, 실무에서는 pm2 등의 모듈로 cluster 기능을 사용한다.
 * 웹 주소는 크게 HTML, CSS 같은 정적 파일 요청 주소와 서버의 자원(data?)를 요청하는 주소로 나뉘고 그 수가 늘어나면 그만큼 주소의 종류도 많아져야한다.
 * 그런데 if문이 많아지고 주소수도 많아질것이고 쿠키와 세션이 붙으면 코드가 더 복잡해진다.
 * 이를 편리하게 만들어 주는 모듈이 Express 모듈이다.
*/
