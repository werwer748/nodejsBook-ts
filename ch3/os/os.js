/*
    os 모듈: 웹 브라우저에 사용되는 자바스크립트는 운영체제의 정보를 가져올 수 없지만, 노드는 os 모듈에 정보가 담겨 있어 정보를 가져올 수 있다.

    내장 모듈인 os를 불러오려면 require('os') 또는 require('node:os')를 하면 된다.
    os라는 파일이 조냊하는게 아니라 노드가 알아서 내장 모듈임을 파악해 불러온다.
*/

const os = require('os');

console.log('운영체제 정보---------------------------------');
console.log('os.arch():', os.arch());
console.log('os.platform():', os.platform());
console.log('os.type():', os.type());
console.log('os.uptime():', os.uptime());
console.log('os.hostname():', os.hostname());
console.log('os.release():', os.release());

console.log('경로------------------------------------------');
console.log('os.homedir():', os.homedir());
console.log('os.tmpdir():', os.tmpdir());

console.log('cpu 정보--------------------------------------');
console.log('os.cpus():', os.cpus());
console.log('os.cpus().length:', os.cpus().length);

console.log('메모리 정보-----------------------------------');
console.log('os.freemem():', os.freemem());
console.log('os.totalmem():', os.totalmem());

/*
    운영체제 정보---------------------------------
    os.arch(): arm64
    os.platform(): darwin
    os.type(): Darwin
    os.uptime(): 18881
    os.hostname(): Hugo-MacBookPro.local
    os.release(): 22.2.0

    경로------------------------------------------
    os.homedir(): /Users/gangjungi
    os.tmpdir(): /var/folders/pl/t4ly19rs3mgdn1qbh6xl82vr0000gn/T

    cpu 정보--------------------------------------
    os.cpus(): [
    {
        model: 'Apple M2',
        speed: 24,
        times: { user: 1657280, nice: 0, sys: 1209750, idle: 14820990, irq: 0 }
    },
    {
        model: 'Apple M2',
        speed: 24,
        times: { user: 1508640, nice: 0, sys: 1047350, idle: 15145670, irq: 0 }
    },
    {
        model: 'Apple M2',
        speed: 24,
        times: { user: 1258100, nice: 0, sys: 856510, idle: 15605970, irq: 0 }
    },
    {
        model: 'Apple M2',
        speed: 24,
        times: { user: 1101590, nice: 0, sys: 714630, idle: 15920090, irq: 0 }
    },
    {
        model: 'Apple M2',
        speed: 24,
        times: { user: 1396670, nice: 0, sys: 482060, idle: 15869090, irq: 0 }
    },
    {
        model: 'Apple M2',
        speed: 24,
        times: { user: 1050530, nice: 0, sys: 388580, idle: 16315990, irq: 0 }
    },
    {
        model: 'Apple M2',
        speed: 24,
        times: { user: 714650, nice: 0, sys: 229650, idle: 16825180, irq: 0 }
    },
    {
        model: 'Apple M2',
        speed: 24,
        times: { user: 474840, nice: 0, sys: 148310, idle: 17154860, irq: 0 }
    }
    ]
    os.cpus().length: 8

    메모리 정보-----------------------------------
    os.freemem(): 53313536
    os.totalmem(): 8589934592
*/

/*
 * os.arch(): process.arch와 동일함.
 * os.platform(): process.platform과 동일함.
 * os.type(): 운영체제의 종류를 보여줌.
 * os.uptime(): 운영체제 부팅 이후 흐른 시간(초)를 보여준다. process.uptime()은 노드의 실행 시간.
 * os.hostname(): 컴퓨터 이름
 * os.release(): 운영체제의 버전
 * os.homedir(): 홈 디렉터리 경로
 * os.tmpdir(): 임시 파일 저장 경로
 * os.cpus(): 컴퓨터의 코어 정보
 * os.freemem(): 사용 가능한 메모리(RAM)
 * os.totalmem(): 전체 메모리 용량
*/

/*
    !코어 개수 확인하기:
    os.cpus().length를 하면 코어의 개수가 숫자로 나온다.
    하지만 노드에서 싱글 스레드 프로그래밍을 하면 코어가 몇 개든 상관없이 대부분의 코어를 하나밖에 사용하지 않는다.
    하지만 cluster 모듈을 사용하는 경우 코어 개수에 맞춰 프로세스를 늘릴 수 있다.
    이 때 cpus() 메서드를 사용할 것이다.
*/

/*
    ? os.constants라는 객체가 가 있음.
    그 안에는 각종 에러와 신호에 대한 정보가 담겨 있다.
    에러가 발생했을 때는 EADDRINUSE나 ECONNRESET 같은 에러 코드를 함께 보여주며, 이러한 코드들이 os.constants안에 들어있다.
    에러 코드가 너무 많아서 외울 수 없으므로 발생할 때마다 검색해보는 것이 좋음.
*/

/*
    os 모듈은 주로 컴퓨터 내부 자원에 빈번하게 접근하는 경우 사용된다.
    즉, 일반적인 웹 서비스를 제작할 때는 사용 빈도가 높지 않다. 하지만 운영체제별로 다른 서비스를 제공하고 싶을 때
    os 모듈이 유용할 것이다.
*/