//* 타이머는 콜백 기반 API지만 프로미스 방식을 사용할 수도 있다.
//* 프로미스 기반 타이머는 노드 내장 객체가 아니라 노드 내장 모듈이다.

import { setTimeout, setInterval } from 'timers/promises';

await setTimeout(3000);
console.log('3초 뒤 실행');

for await (const startTime of setInterval(1000, Date.now())) {
    console.log('1초마다 실행', new Date(startTime));
};

/*
 * 프로미스 기반이므로 then 대신 await을 사용하기 위해 ES 모듈을 사용
 * timers/promises라는 모듈에서 setTimeout, setInterval을 새롭게 제공함.
 * setTimeout으로 몇 밀리초를 기다릴지 정할 수 있다.
 * setInterval은 for await of 문법과 함께 사용할 수 있다.
*/