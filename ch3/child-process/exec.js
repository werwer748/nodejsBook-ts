/*
    child_process:
    노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈
    다른 언어의 코드를 실행하고 결괏값을 받을 수 있음.
    노드 프로세스 외에 새로운 프로세스를 띄워서 명령을 수행하고 노드 프로세스에 결과를 알려주기 때문에 child-process(자식 프로세스)라고 한다.
*/

const exec = require('child_process').exec;

const process = exec('ls');

process.stdout.on('data', function(data) {
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
    console.log(data.toString());
}); // 실행 에러

/*
    exec의 첫번째 인수로 명령어를 넣는다.
    결과는 stdout(표준출력)과 stderr(표준에러)에 붙여둔 data 이벤트 리스너에 버퍼?형태로 전달 됨.
*/