/*
    * require는 함수이고, 함수는 객체이므로 require는 객체로서 속성을 몇 개 갖고 있다.
*/

console.log('require가 가장 위에 오지 않아도 됩니다.');

module.exports = '저를 찾아보세요.';

require('./var');

console.log('require.cache입니다.');
console.log(require.cache);
console.log('require.main');
console.log(require.main === module);
console.log(require.main.filename);
/*
? console결과

require가 가장 위에 오지 않아도 됩니다.
require.cache입니다.
[Object: null prototype] {
  '/Users/gangjungi/Desktop/nodejsBook/ch3/commonjs/require.js': Module {
    id: '.',
    path: '/Users/gangjungi/Desktop/nodejsBook/ch3/commonjs',
    exports: '저를 찾아보세요.',
    filename: '/Users/gangjungi/Desktop/nodejsBook/ch3/commonjs/require.js',
    loaded: false,
    children: [ [Module] ],
    paths: [
      '/Users/gangjungi/Desktop/nodejsBook/ch3/commonjs/node_modules',
      '/Users/gangjungi/Desktop/nodejsBook/ch3/node_modules',
      '/Users/gangjungi/Desktop/nodejsBook/node_modules',
      '/Users/gangjungi/Desktop/node_modules',
      '/Users/gangjungi/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  },
  '/Users/gangjungi/Desktop/nodejsBook/ch3/commonjs/var.js': Module {
    id: '/Users/gangjungi/Desktop/nodejsBook/ch3/commonjs/var.js',
    path: '/Users/gangjungi/Desktop/nodejsBook/ch3/commonjs',
    exports: { odd: 'CJS 홀수입니다.', even: 'CJS 짝수입니다.' },
    filename: '/Users/gangjungi/Desktop/nodejsBook/ch3/commonjs/var.js',
    loaded: true,
    children: [],
    paths: [
      '/Users/gangjungi/Desktop/nodejsBook/ch3/commonjs/node_modules',
      '/Users/gangjungi/Desktop/nodejsBook/ch3/node_modules',
      '/Users/gangjungi/Desktop/nodejsBook/node_modules',
      '/Users/gangjungi/Desktop/node_modules',
      '/Users/gangjungi/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  }
}
require.main
true
/Users/gangjungi/Desktop/nodejsBook/ch3/commonjs/require.js
*/

/*
 * require가 반드시 파일 최상단에 위치할 필요가 없고, module.exports도 최하단에 위치할 필요가 없다. (아무 곳에서나 사용 가능)

 * require.cache 객체에 require.js 나 var.js 같은 파일 이름이 속성명으로 들어 있는 것을 볼 수 있다.
 * 속성값으로는 각 파일의 모듈 객체가 들어 있다.
 * 한번 require한 파일은 require.cache에 저장되므로 다음 번에 require할 때는 새로 불러오지 않고, require.cache에 있는 것이 재사용 된다.
 * 만약 새로 require하길 원한다면 require.cache의 속성을 제거하면 됨. (프로그램의 동작이 꼬일 수 있으므로 권장되지 않음)
 * module.exports했던 부분(exports)이나 로딩 여부(loaded), 자식(children) 모듈 관계를 찾을 수 있다.
 
 * require.main은 노드 실행 시 첫 모듈을 가리킨다.
 * 현재 node require로 실행했으므로 require.js가 require.main이 된다.
 * require.main 객체의 모양은 require.cache의 모듈 객체와 같다.
 * 현재 파일이 첫 모듈인지 알아보려면 require.main === module을 해보면 된다. (node require로 실행한 경우 var.js에서 require.main === module을 하면 false가 반환 됨)
 * 첫 모듈의 이름을 알아보려면 require.main.filename으로 확인하면 된다.
 */