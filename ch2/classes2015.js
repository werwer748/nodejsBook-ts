// ES2015
class Human {
  constructor(type = "human") {
    this.type = type;
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  breathe() {
    console.log("h-a-a-a-m");
  }
}

class Hugo extends Human {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    super.breathe();
    console.log(`${this.firstName} ${this.lastName}`);
  }
}

const newHugo = new Hugo("human", "Hugo", "Kang");

// console.log(Hugo);
console.log(new Hugo("human", "Hugo", "Kang").sayName());
// console.log(Human.isHuman(newHugo));

/*
    1. 전반적으로 class 안으로 그룹하된 것을 볼 수 있다.
    2. 생성자 함수는 constructor 안으로 들어갔고, Human.isHuman 같은 클래스 함수는 static 키워드로 전환되었다.
    3. 프로토타입 함수들도 모두 class 블록 안에 포함돼서 어떤 함수가 어떤 클래스 소속인지 확인하기 쉬움.
    4. 상속도 간단해져서 extends 키워드로 쉽게 상속할 수 있다.
    5. 단, 이렇게 클래스 문법으로 바뀌더라도 자바스크립트는 프로토타입 기반으로 동작한다는 것을 명심할 것!
*/
