/*
    console도 노드에서는 window 대신 global 객체 안에 들어 있다. (브라우저의 console과 거의 비슷함)
    console객체는 보통 디버깅을 위해 사용. 여러 로깅 함수가 존재한다.
*/

const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside: {
        insede: {
            key: 'value',
        }
    }
};
console.time('전체 시간');
//? console.time(레이블): console.timeEnd(레이블)과 대응되어 같은 레이블을 가진 time과 timeEnd 사이의 시간을 측정

console.log('그냥 로그 쉼표로 구분해 여러 값을 찍는다!');
console.log('%c tt', 'background-color: red', string, number, boolean);
//? console.log(내용): 평범한 로그. console.log(내용, 내용, ...)처럼 여러 내용을 동시에 표현 가능

console.error('에러 메시지는 console.error에 담는다?');
//? console.error(에러내용): 에러를 콘솔에 표시

console.table([{ name: '휴고', birth: 1993 }, { name: 'zugo', birth: 1988 }]);
//? console.table(배열): 배열의 요소로 객체 리터럴을 넣으면, 객체의 속성들이 테이블 형식으로 포현된다.

console.dir(obj, { colors: true, depth: 2 });
console.dir(obj, { colors: false, depth: 1 });
//? console.dir(객체, 옵션): 객체를 콘솔에 표시할 때 사용. 첫번째 인수로 표시할 객체를 넣고, 두번째 인수로 옵션을 넣는다.
//? 옵션의 colors가 true면 콘솔에 색이 추가되고 depth는 객체 안의 객체를 몇 단계까지 보여줄지를 결정함.(기본 2)

console.time('시간 측정');

for (let i = 0; i < 100000; i++) {}

console.timeEnd('시간 측정');

function b() {
    console.trace('에러 위치 추적??');
//? console.trace(레이블): 에러가 어디서 발생했는지 추적. 에러 발생 시 위치가 나오지 않으면 사용할만 함.
}

function a() {
    b();
}

a();

console.timeEnd('전체 시간');