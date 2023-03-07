const a = false;

if (a) {
    require('../commonjs/func');
};
console.log('성공!');

/*
 * dynamic.js에서 require('./func')는 실행되지 않는다.
 * if 문이 false라서 실행되지 않는것.
 * 이렇게 조건부로 모듈을 불러오는 것을 다이내믹 임포트 라고 한다.
*/