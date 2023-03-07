/*
! 에러 예시
const a = false;

if (a) {
    import '../ecma/func.mjs'; //에러...
};
console.log('성공!');
*/
/*
 * ES 모듈은 if문 안에서 import하는 것이 불가능 함.
 * 이럴 때 다이내믹 임포트를 사용
*/

const a = true;

if (a) {
    const m1 = await import('../ecma/func.mjs');
    console.log(m1);
    const m2 = await import('../ecma/var.mjs');
    console.log(m2);
}

/*
 * import라는 함수를 사용해서 모듈을 동적으로 불러올 수 있다.
 * import는 Promise를 반환하기에 await이나 then을 붙여야 한다.
 * async 함수를 사용지않은 이유 => ES 모듈의 최상위 스코프에서는 async 함수 없이도 await할 수 있다. (CommonJS 안됨)
 * export default의 경우 import할 때도 default라는 속성 이름으로 import 된다. => [Module: null prototype] { default: [Function: checkOddOrEven] }
 * 참고로 CommonJS 모듈에서 module.exports한 것도 default라는 이름으로 import 된다.
*/