//* process.exit(코드): 실행 중인 노드 프로세스를 종료한다. 서버환경에서 이 함수를 사용하면 서버가 멈추므로 특수한 경우를 제외하고는 잘 사용하지 않음.

let i = 1;
setInterval(() => {
    if (i === 5) {
        console.log('종료~!');
        process.exit();
    }
    console.log(i);
    i += 1;
}, 1000); //1 => 2 => 3 => 4 => 종료~!

/*
    process.exit 메서드는 인수로 코드 번호를 줄 수 있다.
    인수를 주지 않거나 0을 주면 정상 종료를 뜻하고, 1을 주면 비정상 종료를 뜻한다.
*/

/*
 --------------------------------------------
그 외 기타 내장 객체

fetch를 노드에서는 쓸 수 있게 됨에 따라 브라우저에서 존재하던 객체들이 노드에서 동일하게 생성 되었다.


*/

/*
 * URL, URLSearchParams
 * AbortController, FormDate, fetch, Headers, Request, Response, Event, EeventTarget: 브라우저에서 사용하던  API가 노드에도 동일하게 작성.
 * TextDecoder: Buffer를 문자열로 바꾼다.
 * TextEncoder: 문자열을 Buffer로 바꾼다.
 * webAssembly: 웹어셈블리 처리.
*/
