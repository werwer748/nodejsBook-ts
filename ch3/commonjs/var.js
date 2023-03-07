/*
const odd = 'CJS 홀수입니다';
const even = 'CJS 짝수입니다';

module.exports = {
    odd,
    even,
};
*/

/*
    변수 두 개를 선언 후 module.exports에 변수들을 담은 객체를 대입함.
    이제 이 파일은 모듈로서 기능한다. 변수들을 모아둔 모듈이 되는 것!
    다른 파일에서 이 파일을 불러오면 module.exports에 대입된 값을 사용할 수 있다.
*/

//? module 객체 말고 exports 객체로도 모듈을 만들 수 있다.

exports.odd = 'CJS 홀수입니다.';
exports.even = 'CJS 짝수입니다.';

/*
    module.exports로 한 번에 대입하는 대신, 각각의 변수를 exports객체에 하나씩 넣은 것.
    동일하게 동작하는 이유 => module.exports와 exports가 같은 객체를 참조하기 때문이다.
    실제로 console.log(module.exports === exports)는 true가 나오고 따라서 exports 객체에 
    add 함수를 넣으면 module.exports에도 add 함수가 들어간다.
*/

/*
    exports 객체 사용 시 유의 사항:
    exports 객체를 사용할 때는 module.exports와의 참조 관계가 깨지지 않도록 주의해야 한다.
    module.exports에는 어떤 값이든 대입해도 되지만, exports에는 반드시 객체처럼 속성명과 속성값을 대입해야 한다.
    exports에 다른 값을 대입하면 객체의 참조 관계가 끊겨 더는 모듈로 기능하지 않는다!

    exports를 사용할 때는 객체만 사용할 수 있으므로 func.js와 같이 module.exports에 함수를 대입한 경우에는 exports로 바꿀 수 없다.

    exports와 module.exports에는 참조 관계가 있으므로 한 모듈에 exports 객체와 module.exports를 동시에 사용하지 않는 것이 좋다.
*/

console.log('var!!', require.main === module);