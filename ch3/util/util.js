/*
    각종 편의 기능을 모아둔 모듈. 가끔 deprecated 된다.
*/

const util = require('util');
const crypto = require('crypto');

const dontUseMe = util.deprecate((x, y) => {
    console.log(x, y);
}, 'dontUseMe 함수는 deprecated되었으니 더 이상 사용 ㄴㄴ');
dontUseMe(1, 2);
/*
    util.deprecate:
    함수가 deprecate 처리됨을 알린다.
    첫 번째 인수로 넣은 함수를 사용하면 경고 메시지 출력, 두 번째 인수로 경고 메시지를 넣는다.
    함수가 사라지거나 변경될 때 알려주는 용도로 사용하면 유용함.
*/

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
.then((buf) => {
    console.log(buf.toString('base64'));
})
.catch((error) => {
    console.error(error);
})
/*
    util.promisify:
    콜백 패턴을 프로미스 패턴으로 바꾼다.(바꿀 함수를 인자로 제공하면 됨)
    async/await 패턴까지 사용 가능

    util.callbackify도 있음...
*/