const odd = 'CJS 홀수입니다';
const even = 'CJS 짝수입니다';

module.exports = {
    odd,
    even,
};

/*
    변수 두 개를 선언 후 module.exports에 변수들을 담은 객체를 대입함.
    이제 이 파일은 모듈로서 기능한다. 변수들을 모아둔 모듈이 되는 것!
    다른 파일에서 이 파일을 불러오면 module.exports에 대입된 값을 사용할 수 있다.
*/