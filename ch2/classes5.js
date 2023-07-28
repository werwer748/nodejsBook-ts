//* 클래스 문법이 추가되었지만 다른 언어처럼 클래스 기반으로 동작하는 것이 아님(여전히 프로토타입 기반으로 동작)
//* => 프로토타입 기반 문법을 보기 좋게 클래스로 바꾸것으로 이해하면 된다.

// ES5
var Human = function (type) {
  this.type = type || "human";
};

Human.isHuman = function (human) {
  return human instanceof Human;
};

Human.prototype.breathe = function () {
  console.log("h-a-a-a-m");
};

var Hugo = function (type, firstName, lastName) {
  Human.apply(this, arguments);
  /*
        call은 보통 함수와 똑같이 인자를 넣고, apply는 인자를 하나로 묶어 배열로 만들어 넣는 것
        arguments는 함수라면 처음부터 갖고 있는 숨겨진 속성. 바로 함수에 들어온 인자를 배열 형식으로(유사 배열) 반환.
        call(1, 2), apply(1, 2)의 첫번째 인자는 this, 2(인자들)는 배열이 아니기(유사배열이기) 때문에 배열의 메소드를 쓰면 에러가 발생한다
        이 때 배열의 프로토타입에 있는 함수를 빌려 쓰면 해결이 가능하다. ex) Array.prototype.join.call(arguments) <= this는 arguments를 가리키게 함.
    */
  this.firstName = firstName;
  this.lastName = lastName;
};

Hugo.prototype = Object.create(Human.prototype);
Hugo.prototype.constructor = Hugo;
Hugo.prototype.sayName = function () {
  console.log(this.firstName + " " + this.lastName);
};

var oldHugo = new Hugo("human", "Hugo", "Kang");

var test = function (a, b) {
  return a + b;
};
// console.log(test(1, 2));
// console.log(Human.isHuman(oldHugo));
console.log(oldHugo.sayName());

/*
    Human 생성자 함수가 있고, 그 함수를 Hugo 생성자 함수가 상속한다.
    Hugo 생성자 함수를 보면 상속받기 위한 코드가 상당히 난해함.
    Human.apply와 Object.create 부분이 상속받는 부분이다.
*/
