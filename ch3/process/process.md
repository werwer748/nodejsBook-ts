process객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있다.

node REPL에서 확인 process를 통해 확인 가능한 것들

process.version: 설치된 노드의 버전

process.arch: 프로세서 아키텍처 정보.

process.pid: 현재 프로세스의 아이디. 프로세스를 여러개 가질 때 구분할 수 있다.

process.uptime(): 프로세스가 시작된 후 흐른 시간. 단위는 초

process.execPath: 노드의 경로

process.cwd(): 현재 프로세스가 실행되는 위치.

process.cpuUsage(): 현재 cpu 사용량
