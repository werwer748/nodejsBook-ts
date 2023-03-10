/*
    양방향 대칭형 암호화?
    암호화된 문자열을 복호화할 수 있고, key라는 것이 사용된다. 대칭형 암호화에서는 암호를 복호화하려면 암호화할 때 사용한 키와 같은 키를 사용해야 한다.
*/

//! 해당코드를 완벽히 이해하려면 암호학을 추가로 공부해야한다...

const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcedfghijklmnopqrstuvwxyz123456';
const iv = '1234567890123456';

const cipher = crypto.createCipheriv(algorithm, key, iv);
let result = cipher.update('암호화할 문장', 'utf8', 'base64');
result += cipher.final('base64');
console.log('암호화:', result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log('복호화:', result2);

/*
 * crypto.createCipheriv(알고리즘, 키, iv):
    암호화 알고리즘과 키, iv를 넣는다.
    암호화 알고리즘은 aes-256-cbc를 사용했으며, 다른 알고리즘을 사용해도 된다.
    aes-256-cbc 알고리즘의 경우 키는 32바이트여야 하고, iv는 16바이트여야 한다.
    iv는 암호화할 때 사용하는 초기화 벡터를 의미하는데 따로 공부하는게 낫다... ㅠㅜ
    사용 가능한 알고리즘 목록은 crypto.getCipher()를 호출하면 볼 수 있다.

 * cipher.update(문자열, 인코딩, 출력 인코딩):
    암호화할 대상과 대상의 인코딩, 출력 결과물의 인코딩을 넣는다.
    보통 문자열은 utf8 인코딩을, 암호는 base64를 많이 사용한다.

 * cipher.final(출력 인코딩):
    출력 결과물의 인코딩을 넣으면 암호화가 완료된다.

 * crypto.createDecipheriv(알고리즘, 키, iv):
    복호화할 때 사용. 암호화할 때 사용했던 알고리즘과 키, iv를 그대로 넣어야 한다.
 * decipher.update(문자열, 인코딩, 출력 인코딩):
    암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 넣는다.
    createCipheriv의 update()에서 utf8, base64 순인데 createDecipheriv의 update()에서는 base64, utf8 순으로 넣으면 된다.

 * decipher.final(출력 인코딩):
    복호화 결과물의 인코딩을 넣는다.
*/

