//* 전역 객체라는 점을 이용해서 파일 간에 간단한 데이터를 공유할 때 사용하기도 한다.

module.exports = () => global.message;

/*
 * globalA 모듈의 함수는 global.message 값을 반환한다.
 * globalB.js에서는 global 객체에 속성명이 message인 값을 대입하고 globalA 모듈의 함수를 호출한다.
 * 콘솔 결과처럼, globalB에서 넣은 global.message 값을 globalA에서 접근할 수 있음을 알 수 있다.
*/

/*
    ! global 객체의 남용:
    ! global 객체의 속성에 값을 대입해 파일 간에 데이터를 공유할 수 있지만, 남용하지는 말것!
    ! 프로그램의 규모가 커질수록 어떤 파일에서 global 객체에 값을 대입했는지 찾기 힘들어져 유지보수가 어려워 지기 때문.
    ! 다른 파일의 값을 사용하고 싶다면 모듈 형식으로 만든 후 명시적으로 값을 불러와서 사용하는 것이 좋다.
 */