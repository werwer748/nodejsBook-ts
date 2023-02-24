//* 객체 리터럴에 편리한 기능들이 추가 됨 (고정된 값을 나타나는 표현 그 자체가 리터럴)

//* ES5
var sayNode = function() {
    console.log('Node');
};
var es = 'ES';
var oldObject = {
    sayJs: function() {
        console.log('JS');
    },
    sayNode: sayNode,
};
oldObject[es + 6] = 'Fantastic';
oldObject.sayNode(); // Node
oldObject.sayJs(); // JS
console.log(oldObject.ES6); // Fantastic

//* ES2015
const newObject = {
    sayJs() {
        console.log('JS');
    },
    sayNode,
    [es + 6]: 'Fantastic',
    '에블라랄': '에블라라'
};
newObject.sayNode(); // Node
newObject.sayJs(); // JS
console.log(newObject.ES6); // Fantastic
console.log(newObject.에블라랄); // 에블라라

/*
 1. sayJs 같은 객체의 메서드에 함수를 연결할 때 더는 콜론과 function을 붙이지 않아도 된다.
 2. sayNode: sayNode처럼 속성명과 변수명이 동일하면 한번만 써도 된다.
 ex) { name: name, age: age } es5 => { name, age } es2015
 3. 객체의 속성명을 동적으로 생성할 수 있다. 객체의 바깥에서 [es + 6]을 해야했지만 객체 러터럴 안에 동적 속성을 선언해도 됨.
*/