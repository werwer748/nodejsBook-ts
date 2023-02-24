if (true) {
    var x = 3;
}
console.log(x); //? 3

if (true) {
    const y = 3;
}
// console.log(y); //! y is not defined

/*
* x는 정상적으로 출력됨. y는 에러가 발생한다. (var -> const)
? var는 함수 스코프를 가지므로 if 문의 블록과 관계없이 접근할 수 있다. 하지만 const와 let은 블록 스코프를 가지므로 블록 밖에서는 변수에 접근할 수 없다.
? 블록의 범위는 if, while, for, function 등에서의 {}중괄호 사이임
? 함수 스코프 대신 블록 스코프를 사용함으로써 호이스팅 문제가 해결되고 코드관리가 수월해졌다.
*/

/*
* const, let과 var은 스코프 종류가 다르다!
* const와 let의 차이 =>
? const: 한 번 값을 할당하면 다른 값을 할당할 수 없다. 또한 초기화할 때(선언할때?) 값을 할당하지 않으면 에러가 발생 => const로 선언한 변수를 상수라고 부른다.
? let: 값을 재할당 할 수 있다. 초기화할 때 값을 할당하지 않아도 된다.
*/

const a = 0;
// a = 1; //! TypeError: Assignment to constant variable.

let b = 0;
b = 1;

console.log(a, b);

//const c; //! Missing initializer in const declaration

let d;

console.log('d', d); //undefined