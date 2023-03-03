//* var.js를 참조
const { odd, even } = require('./var');

function checkOddOrEven(num) {
    if (num % 2) { // 홀수면~
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven;

/*
    require 함수 안에 불러올 모듈의 경로를 적는다. (require 함수의 인수로 제공하는 경로 잘 지정해야 함)

    require 함수로 var.js에 있던 값들을 불러오고 있다. (const {odd, even} <= 구조 분해 할당)
    var.js의 module.exports에 담겨 있던 객체를 불러와 func.js에서 사용한다.
    const obj = require('./var');로 객체를 통째로 불러온뒤 obj.odd, obj.even처럼 접근할 수도 있다.

    var.js에서 변수를 불러온 뒤, 숫자의 홀짝을 판별하는 함수를 선언하고 다시 module.exports에 대입
    이렇게 다른 모듈(var)을 사용하는 파일을 다시 모듈(func)로 만들 수 있다.

    module.exports에는 객체 뿐만 아니라 함수나 변수를 대입해도 된다.
*/