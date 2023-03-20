// 다양한 방식의 암호화를 도와주는 모듈

/*
    비밀번호는 보통 단방향 암호화(복호화할 수 없는 암호화 방식) 알고리즘을 사용해서 암호화 한다.
    복호화는 암호화된 문자열을 원래 문자열로 돌려놓는 것.
    즉! 단방향 암호화는 한번 암호화하면 원래 문자열을 찾을 수 없다.(복호화할수 없어서 해시 함수라고 부르기도 함.)

    참고: 고객의 비밀번호는 복호화할 필요가 없다.
    => 먼저 받은 비밀번호 암호화 후 DB 저장 => 로그인시 비밀번호 암호화해서 비교 하면 되기 때문.

    단방향 알고리즘은 주로 해시 기법(어떤 문자열을 고정길이의 다른 문자열로 바꿔버리는 방식)을 사용 함.
*/

const crypto = require('crypto');

console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));

/*
    비밀번호라는 문자열을 해시를 사용해 바꿈.

 * createHash(알고리즘): 사용할 해시 알고리즘을 넣습니다. md5, sha1, sha256, sha512 등이 가능. 지금은 sha512 많이 사용
 * update(문자열): 변환할 문자열을 넣는다.
 * digest(인코딩): 인코딩할 알고리즘을 넣는다. base64, hex, latin1이 주로 사용 됨. 
    base64가 결과 문자열이 가장 짧아서 애용된다.
*/

/*
    가끔 nopqrst라는 문자열이 qvew로 변환되어 abcdefgh를 넣었을 때와 똑같은 출력 문자열로 바뀔 때도 있다.
    이런 상황을 충돌이 발생했다고 표현한다.
    해킹용 컴퓨터의 역할은 어떠한 문자열이 같은 출력 문자열을 반환하는지 찾아내는 것이다.
    여러 입력 문자열이 같은 출력 문자열로 변환될 수 있으므로 비밀번호를 abcedfgh로 설정했어도 nopqrst로 뚫리는 사태가 발생하게 된다.
*/