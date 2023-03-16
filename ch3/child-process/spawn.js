const spawn = require('child_process').spawn;

const process = spawn('python3', ['test.py'], { shell: true });
//? spawn으로 파이썬 코드를 실행 => python3 명령어를 통해 test.py를 실행하는 것.
//? 첫 번째 인수로 명령어, 두 번째 인수로 옵션 배열

process.stdout.on('data', function(data) {
    console.log(data.toString());
});

process.stderr.on('data', function(data) {
    console.error(data.toString());
});

/*
    exec은 셸을 실행해서 명령어를 수행하고, spawn은 새로운 프로세스를 띄우면서 명령어를 실행한다.
    spawn에서도 세번째 인수로 { shell: true }를 제공하면 exec처럼 셸을 실행해서 명령어를 수행함.
    셸을 실행하는지 마는지에 따라 수행할 수 있는 명령어에 차이가 있다.
*/

/*
* 기타 묘듈들
* async_hooks: 비동기 코드의 흐름을 추적할 수 있는 실험적인 모듈입니다.
* dgram: UDP와 관련된 작업을 할 때 사용합니다.
* net: HTTP보다 로우 레벨인 TCP나 IPC 통신을 할 때 사용합니다.
* perf_hooks: 성능 측정을 할 때console.time보다 더 정교하게 측정합니다.
* querystring:URLSearchParams가 나오기 이전에 쿼리스트링을 다루기 위해 사용했던 모듈입니다. 요즘은URLSearchParams를 사용하는 것을 권장합니다.
* string_decoder: 버퍼 데이터를 문자열로 바꾸는 데 사용합니다.
* tls: TLS와 SSL에 관련된 작업을 할 때 사용합니다.
* tty: 터미널과 관련된 작업을 할 때 사용합니다.
* v8: v8 엔진에 직접 접근할 때 사용합니다.
* vm: 가상 머신에 직접 접근할 때 사용합니다.
* wasi: 웹어셈블리를 실행할 때 사용하는 실험적인 모듈입니다.
*/