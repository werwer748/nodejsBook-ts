//* ES2020에서 추가된 ??(널 병합 - nullish coalescing) 연산자와 ?.(옵셔널 체이닝 - optional chaining) 연산자

//* 널 병합 연산자(??)는 주로 || 연산자 대용으로 사용되며, falsy 값(0, '', false, NaN, null, undefined) 중 null과 undefined만 따로 구분 한다.
const a = 0;
const b = a || 3; // || 연산자는 falsy 값이면 뒤로 넘어 감
// console.log(b); // 3

const c = 0;
const d = c ?? 3; // ?? 연산자는 null과 undefined일 때만 뒤로 넘어감
const v = {};
const w = 3;
const x = null;
const y = v ?? w ?? x ?? 5;
console.log(y);
// console.log(d); // 0

const e = null;
const f = e ?? 3;
// console.log(f); // 3;

const g = undefined;
const h = g ?? 3;
// console.log(h); // 3;


//* 옵셔널 체이닝 연산자는 null이나 undefined의 속성을 조회하는 경우 에러가 발생하는 것을 막는다.

const aa = {};
aa.b; // a가 객체이므로 문제없음

const cc = null;
// try {
//     cc.d;
// } catch (e) {
//     console.error(e); // TypeError: Cannot read properties of null (reading 'd')
// }
cc?.d; // 문제없음

// try {
//     cc.f();
// } catch (e) {
//     console.error(e); // TypeError: Cannot read properties of null (reading 'f')
// }
cc?.f(); // 문제없음

// try {
//     cc[0];
// } catch (e) {
//     console.error(e); // TypeError: Cannot read properties of null (reading '0')
// }
cc?.[0]; // 문제 없음

/*
    위 코드처럼 일반적인 속성뿐만 아니라 함수 호출이나 배열 요소 접근에 대해서도 에러가 발생하는 것을 방지할 수 있다.
    cc?.d, cc?.f(), cc?.[0]의 값은 undefined가 됨.

    옵셔널 체이닝 연산자는 ypeError: Cannot read properties of null 또는 undefined 에러의 발생 빈도를 획기적으로 낮출 수 있어
    자주 사용된다.
*/


