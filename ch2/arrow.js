//* 화살표 함수(arrow function)라는 새로운 함수가 추가되었으며, 기존의 function() {}도 그대로 사용할 수 있다.

function add1(x, y) {
    return x + y;
};

const add2 = (x, y) => {
    return x + y;
};

const add3 = (x, y) => x + y;

const add4 = (x, y) => (x + y);

function not1(x) {
    return !x;
};

const not2 = x => !x;

/*
 * add1, add2, add3, add4는 같은 기능을 하는 함수. not1, not2도 마찬가지이다.
 * 화살표 함수에서는 function 선언 대신 => 기호로 함수를 선언한다. (변수에 대입하면 재사용이 가능함)
 * 화살표 함수에서는 return문을 줄일 수 있다. add3, add4 처럼 return할 식을 바로 적으면 됨. add4처럼 보기좋게 소괄호()로 감쌀 수도 있다.
 * not2 같은 경우는 매개변수가 한개라 묶어주지 않아도 됨.
 * 자주 쓰이니 알아둘 것!
*/

//? 기존 function과 가장 다른 것은 this 바인드 방식이다.

var relationship1 = {
    name: 'hugo',
    friends: ['zugo', 'mago', 'sugo'],
    logFriends: function() {
        var that = this; //? relationship1을 가리키는 this를 that에 저장
        this.friends.forEach(function (friend) {
            console.log(that.name, friend);
        });
    }
};
relationship1.logFriends();

const relationship2 = {
    name: 'hugo',
    friends: ['zugo', 'mago', 'sugo'],
    logFriends() {
        this.friends.forEach((friend) => {
            console.log(this.name, friend);
        });
    }
};
relationship2.logFriends();

/*
 * relationship1.logFriends() 안의 forEach문에서는 function 선언문을 사용
 * 각자 다른 함수 스코프의 this를 가지므로 that이라는 변수를 사용해서 relationship1에 간접적으로 접근함
 
 * relationship2.logFriends() 안의 forEach문에서는 화살표 함수를 사용.
 * 따라서 바깥 스코프인 logFriends()의 this를 그대로 사용할 수 있다. 상위 스코프의 this를 그대로 물려받는 것!
 
 * 화살표함수에서의 this는 무조건 부모로부터 가져오니까 예측이 된다?로 이해함
 * 기본적으로 화살표 함수를 쓰되, this를 사용해야 하는 경우에 화살표 함수와 함수선언문 둘 중 하나를 고르면 된다고...
*/