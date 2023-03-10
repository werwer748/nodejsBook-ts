/*
    폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈.
    path 모듈이 필요한 이유 중 하나는 운영체제별로 경로 구분자가 다르기 때문이다.
    크게 윈도 타입과 POSIX(맥, 리눅스) 타입으로 구분된다.

 * 윈도: C:\Users\Name... 처럼 \로 구분
 * POSIX: /home/Name... 처럼 /로 구분.
 
    외에 파일 경로에서 파일명이나 확장자만 따로 떼어주는 기능도 구현해되어있다.
*/

const path=require('path');
const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('------------------------------');
console.log('path.dirname():', path.dirname(string));
console.log('path.extname():', path.extname(string));
console.log('path.basename():', path.basename(string));
console.log('path.basename - extname:', path.basename(string, path.extname(string)));
console.log('------------------------------');
console.log('path.parse()', path.parse(string));
console.log('path.format():', path.format({dir:'/Users/gangjungi/Desktop/nodejsBook/nodejsBook-ts/ch3/path',name:'path',ext:'.js',}));
console.log('path.normalize():', path.normalize('/Users/gangjungi/Desktop/nodejsBook///nodejsBook-ts/\\ch3/path'));
console.log('------------------------------');
console.log('path.isAbsolute(/):', path.isAbsolute('/'));
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'));
console.log('------------------------------');
console.log('path.relative():', path.relative('/Users/gangjungi/Desktop/nodejsBook/nodejsBook-ts/ch3/path','/Users'));
console.log('path.join():', path.join(__dirname,'..','..','/users','.','/hugoK'));
console.log('path.resolve():', path.resolve(__dirname,'..','users','.','/hugoK'));

/*
path.sep: /
path.delimiter: :
------------------------------
path.dirname(): /Users/gangjungi/Desktop/nodejsBook/nodejsBook-ts/ch3/path
path.extname(): .js
path.basename(): path.js
path.basename - extname: path
------------------------------
path.parse() {
  root: '/',
  dir: '/Users/gangjungi/Desktop/nodejsBook/nodejsBook-ts/ch3/path',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
path.format(): C:\users\zerocho/path.js
path.normalize(): C:/users\\zerocho\path.js
------------------------------
path.isAbsolute(C:\): false
path.isAbsolute(./home): false
------------------------------
path.relative(): ../C:\
path.join(): /Users/gangjungi/Desktop/nodejsBook/nodejsBook-ts/users/zerocho
path.resolve(): /zerocho
*/

/*
 * path.sep: 경로의 구분자. 윈도는 \, POSIX는 /
 * path.delimiter: 환경 변수의 구분자. process.env.PATH를 입력하면 여러개의 경로가 이 구분자로 구분되어 있다. 윈도는 세미콜론(;), POSIX는 콜론(:)
 * path.dirname(경로): 파일이 위치한 폴더 경로를 보여준다.
 * path.extname(경로): 파일의 확장자를 보여준다.
 * path.basename(경로, 확장자): 파일의 이름(확장자 포함)을 표시한다. 파일의 이름만 표시하고 싶다면 basename의 두 번째 인수로 파일의 확장자를 넣으면 됨.
 * path.parse(경로): 파일 경로를 root, dir, base, ext, name으로 분리한다.
 * path.format(객체): path.parse()한 객체를 파일 경로로 합친다.
 * path.normalize(경로): /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환.
 * path.isAbsolute(경로): 파일의 경로가 절대경로인지 상대경로인지를 true(절대경로)나 false(상대경로)로 알린다.
 * path.relative(기준경로, 비교경로): 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알림.
 * path.join(경로, ...): 여러 인수를 넣으면 하나의 경로로 합친다. 상대 경로인 ..(부모 디렉터리)과 .(현 위치)도 알아서 처리한다.
 * path.resolve(경로, ...): path.join()과 비슷하지만 다르다.

 ? join, resolve 차이
 /를 만나면 path.resolve는 절대경로로 인식해서 앞의 경로를 무시하고, path.join은 상대경로로 처리한다.

 ! path.join('/a', '/b', 'c'); 결과: /a/b/c 
 ! path.resolve('/a', '/b', 'c'); 결과: /b/c 
*/

/*
    가끔 윈도에서 POSIX 스타일 경로를 사용할 때가 있고, 그 반대일 때도 있다.
    이러한 경우 윈도에서는 path.posix.sep이나 path.posix.join()과 같이 사용하면 되고,
    POSIX에서는 path.win32.sep이나 path.win32.join()과 같이 사용하면 된다.

    노드는 require.main 파일을 기준으로 상대경로를 인식한다.
    따라서 require.main(첫 모듈)과는 다른 디렉터리의 파일이 상대경로를 갖고 있다면 예상과 다르게 동작할 수 있다.
    이 문제는 path모듈을 통해 해결할 수 있다.

    path 모듈은 노드 프로그래밍을 하면서 매우 자주 쓰게되는 모듈이다.
*/