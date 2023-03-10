/*
    현재는 주로 pbkdf2나 bcrypt, scrypt라는 알고리즘으로 비밀번호를 암호화하고 있다.
    노드에서 pbkdf2를 지원 함.
    pbkdf2: 기존 문자열에 salt라고 불리는 문자열을 붙인 후 해시 알고리즘을 반복해서 적용하는 것.
*/

const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log('password:', key.toString('base64'));
    });
});

/*
    randomBytes() 메서드로 64바이트 길이의 문자열을 만든다. 이것이 salt가 된다.
    pbkdf2() 메서드에는 순서대로 비밀번호, salt, 반복횟수, 출력 바이트, 해시 알고리즘을 인수로 넣는다.
    예시에서는 10만 번 반복해서 적용한다고 되어있다. 
    즉, sha512로 변환된 결괏값을 다시 sha512로 변환하는 과정을 10만번 반복하는 것.
    
    1초 정도밖에 안걸림 => 컴퓨터의 성능에 따라 횟수를 조절할 것.

    싱글 스레드 프로그래밍을 할 때 1초 동안 블로킹이 되는 것은 아닌지 걱정된다면?
    => 다행히 crypto.randomBytes와 crypto.pbkdf2 메서드는 내부적으로 스레드 풀을 사용해 멀티 스레딩으로 동작한다.
*/