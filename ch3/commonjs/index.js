/*
    CommonJS 모듈은 표준 자바스크립트 모듈은 아님.
    하지만 노드 생태계에서 가장 널리 쓰이는 모듈 => 표전이 나오기 이전부터 쓰였기 때문이다.
*/

//* 모듈을 만들 때는 모듈이 될 파일과 모듈을 불러와서 사용할 파일이 필요하다.

const { odd, even } = require('./var');
const checkNumber = require('./func');

function checkStringOddorEven(str) {
    if (str.length % 2) { // 홀수
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddorEven('hello'));

/*
    index.js는 var.js와 func.js를 모두 참조한다.(모듈 하나가 여러 개의 모듈을 사용할 수 있음)
    var.js가 func.js와 index.js에 두 번 쓰이는 것 처럼 모듈 하나가 여러개의 모듈에 사용될 수도 있다.

    모듈로부터 값을 불러올 때 변수 이름을 다르게 지정할 수도 있다.
    ex) checkOddOrEven이 CheckNumber라는 이름으러 사용 됨.
*/

/*
    이렇게 여러 파일에 걸쳐 재사용되는 함수나 변수를 모듈로 만들어두면 편리하다.
    그러나 모듈이 많아지고 모듈 간의 관계가 얽히게 되면 구조 파악이 어려워진다는 단점도 존재한다.
*/