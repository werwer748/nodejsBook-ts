const dep1 = require('./dep1');
const dep2 = require('./dep2');

dep1();
dep2();
/*
? console결과

require dep1 {}
require dep2 [Function (anonymous)]
dep2 [Function (anonymous)]
dep1 {}
(node:3646) Warning: Accessing non-existent property 'Symbol(nodejs.util.inspect.custom)' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:3646) Warning: Accessing non-existent property 'constructor' of module exports inside circular dependency
(node:3646) Warning: Accessing non-existent property 'Symbol(Symbol.toStringTag)' of module exports inside circular dependency
(node:3646) Warning: Accessing non-existent property 'Symbol(nodejs.util.inspect.custom)' of module exports inside circular dependency
(node:3646) Warning: Accessing non-existent property 'constructor' of module exports inside circular dependency
(node:3646) Warning: Accessing non-existent property 'Symbol(Symbol.toStringTag)' of module exports inside circular dependency

*/

/*
 * 코드가 위에서부터 실행되므로 require('./dep1')이 먼저 실행된다.
 * dep1.js에서는 제일 먼저 require('./dep2')가 실행되고 다시 dep2.js에서는 require('./dep1')이 실행 됨.
 * 상기 과정이 반복된다.

 * dep1의 module.exports가 함수가 아닌 빈 객체로 표시 됨.
 * 이러한 현상을 순환 참조(circular dependency)라고 부른다.
 * 이렇게 순환 참조가 있을 경우, 순환 참조되는 대상을 빈 겍체로 만든다.
 * 이때 에러가 발생하지않고(Warning은 에러가 아닌 경고) 조용히 빈 객체로 변경되므로 예기치 못한 동작이 발생할 수 있다.
 * 따라서 순환 참조가 발생하지 않도록 구조를 잘 잡는 것이 중요.
*/