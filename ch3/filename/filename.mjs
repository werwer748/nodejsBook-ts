//* ES 모듈에서는 __filename과 __dirname을 사용할 수 없다. 대신 import.meta.url로 경로를 가져올 수 있다.

console.log(import.meta.url);
console.log('__filename은 에러');
console.log(__filename);