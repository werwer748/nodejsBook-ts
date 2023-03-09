process.env: REPL에서 process.env를 입력하면 매우 많은 정보가 출력된다. 이 정보들은 시스템의 환경 변수다.
시스템 환경정보는 노드에 직접 영향을 미치기도 한다.

NODE_OPTIONS=--max-old-space-size=8192
UV_THREADPOOL_SIZE=8

왼쪽이 환경 변수 이름, 오른쪽이 값이다.

NODE_OPTIONS는 노드를 실행할 때의 옵션들을 입력받는 환경 변수이다.
--max-old-space-size=8192는 노드의 메모리를 8GB까지 사용할 수 있게 한다.

UV_THREADPOOL_SIZE는 노드에서 기본적으로 사용하는 스레드 풀의 스레드 개수를 조절할 수 있게 한다.

시스템 환경 변수 외에도 임의로 환경 변수를 저장할 수 있다.
process.env는 서비스의 중요한 키를 저장하는 공간으로 사용된다.
서버나 DB의 비밀번호와 각종 API 키를 코드에 직접 입력하는것은 위험하고 혹 코드가 유출될 경우, 각종 키가 코드에 남아있어 추가 피해가 발생할 수 있기 때문인데,
따라서 중요한 비밀번호는 process.env의 속성으로 대체한다.

ex) secretId = process.env.SECRET_ID;
secretCode = process.env.SECRET_CODE;
