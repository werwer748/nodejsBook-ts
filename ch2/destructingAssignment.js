//* 구조분해 할당을 사용하면 객체나 배열로부터 속성이나 요소를 쉡게 꺼낼 수 있다.

// 1. 객체의 속성을 같은 이름의 변수에 대입하는 코드
/*
ES5
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function() {
        this.status.count--;
        return this.status.count;
    },
};

var getCandy = candyMachine.getCandy();
var count = candyMachine.status.count;
*/

// ES2015+
const candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy() {
        this.status.count--;
        return this.status.count;
    },
};

const { getCandy, status: { count } } = candyMachine;

const machineBind = getCandy.bind(candyMachine); // <- bind해주어서 this 범위 고정
// console.log(machineBind());

/*
    1. candyMachine객체 안의 속성을 찾아서 변수와 매칭.
    2. count처럼 여러 단계 안의 속성도 찾을 수 있다. (getCandy, count 변수가 초기화된 것(선언된것...?)).
    3. 구조 분해 할당을 사용하면 함수의 this가 달라질 수 있다.
    => getCandy함수를 쓰면 에러: 달라진 this를 원래대로 바꿔주려면 bind 함수를 따로 사용해야 한다.
*/

// 2. 배열에 대한 구조 분해 할당

/*
ES5
var array = ['nodejs', {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[3];

console.log(node, obj, bool);
*/

// ES2015+
const array = ['nodejs', {}, 10, true];
const [node, obj, , bool] = array;

console.log(node);

/*
    1. array의 위치와 구조 분해 할당한 요소들의 위치가 일치. 10에는 변수명을 지어주지 않아서 10은 무시 됨.
    2. 구조 분해 할당 문법은 코드 줄 수를 상당히 줄여주므로 굉장히 유용하다.
    3. 노드는 모듈 시스템을 사용하므로 이 방식을 자주 사용함.
*/