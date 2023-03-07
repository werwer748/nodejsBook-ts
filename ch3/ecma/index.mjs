/*
    ECMAScript 모듈(이하 ES 모듈)은 공식적인 자바스크립트 모듈 형식이다.
    브라우저에서도 ES 모듈을 사용할 수 있어 브라우저와 노드 모두에 같은 모듈 형식을 사용할 수 있다는 것이 장점이다.
*/

import { odd, even } from "./var.mjs";
import checkNumber from "./func.mjs";

function checkStringOddOrEven(str) {
    if (str.length % 2) { // 홀수이면
        return odd;
    }
    return even;
}

console.log(checkNumber(10)); // MJS 짝수입니다.
console.log(checkStringOddOrEven('hello')); // MJS 홀수입니다.

/*
 * require와 exports, module.exports가 각각 import, export, export default로 바뀌었다.
 * 상당한 부분에서 차이가 있으므로 단순히 글자만 바꿔서는 제대로 동작하지 않을 수 있다.
 * ES 모듈의 import나 export default는 require나 module처럼 함수나 객체가 아니라 문법 그 자체이다.
 * 파일도 js 대신 mjs 확장자로 변경 됨.
 * js 확장자에서 import를 사용하면 문법에러 발생.
 * CommonJS 모듈과는 달리 import 시 파일 경로에서 확장자를 생략할 수 없다. (폴더 내부의 index도 마찬가지)
 * CommonJS 모듈과 ES 모듈간에 호환되지 않는 케이사가 많으므로 웬만하면 한 가지 형식만 사용할 것!
*/