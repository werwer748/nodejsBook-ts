/*
    인터넷 주소를 쉽게 조작하도록 도와주는 모듈.
    url 처리에는 크게 두 가지 방식이 존재함
    1. 노드 버전 7에서 추가된 WHATWG(웹 표준을 정하는 단체의 이름) 방식의 url
    2. 예전부터 노드에서 사용하던 방식의 url.

    요즘은 1번 방식을 사용하므로 호환성이 좋다.
*/

const url = require('url');

const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
/*
    new URL(): URL {
    href: 'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor',
    origin: 'http://www.gilbut.co.kr',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'www.gilbut.co.kr',
    hostname: 'www.gilbut.co.kr',
    port: '',
    pathname: '/book/bookList.aspx',
    search: '?sercate1=001001000',
    searchParams: URLSearchParams { 'sercate1' => '001001000' },
    hash: '#anchor'
    }
    url.format(): http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor
*/
/*
    url 모듈 안에 URL 생성자가 있다. 참고로 URL은 노드 내장 객체이기도 해서 require할 필요는 없음.
    이 생성자에 주소를 넣어 객체로 만들면 주소가 부분멸로 정리가 된다. 이 방식이 WHATWG의 url이다.
    username, password, origin, searchParams 속성이 존재한다.
*/

/*
 * url.format(객체): 분해되었던 url 객체를 다시 원래 상태로 조립한다.
*/
/*
    주소가 host부분 없이 pathname 부분만 오는 경우(예시: /book/bookList.apsx), WHATWG 방식은 이 주소를 처리할 수 없다.
    이럴 때는 new URL('/book/bookList.apsx', 'https://www.gitbut.co.kr')처럼 두 번째 인수로 host를 적어줘야 한다.

    search 부분(쿼리스트링)은 보통 주소를 통해 데이터를 전달할 때 사용된다.
    search는 물음표(?)로 시작하고, 그 뒤에 키=값 형식으로 데이터를 전달한다. 여러 키가 있을 경우에는 &로 구분한다.
    search 부분을 다루기 위해 searchParams라는 특수한 객체가 생성된다.

    http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript와 같은 주소에서는 
    ?page=3&limit=10&category=nodejs&category=javascript 부분이 search 부분이다.
*/