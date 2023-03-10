const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
// 노드 내장 객체기 때문에 require('url')생략

console.log('searchParams:', myURL.searchParams);
console.log('searchParams.getAll():', myURL.searchParams.getAll('category'));
console.log('searchParams.get():', myURL.searchParams.get('limit'));
console.log('searchParams.has():', myURL.searchParams.has('page'));

console.log('searchParams.keys():', myURL.searchParams.keys());
console.log('searchParams.values():', myURL.searchParams.values());

myURL.searchParams.append('filter','es3');
myURL.searchParams.append('filter','es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter','es6');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter');
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString():', myURL.searchParams.toString());
myURL.search= myURL.searchParams.toString();

/*
console----
    searchParams: URLSearchParams {
    'page' => '3',
    'limit' => '10',
    'category' => 'nodejs',
    'category' => 'javascript' }
    searchParams.getAll(): [ 'nodejs', 'javascript' ]
    searchParams.get(): 10
    searchParams.has(): true
    searchParams.keys(): URLSearchParams Iterator { 'page', 'limit', 'category', 'category' }
    searchParams.values(): URLSearchParams Iterator { '3', '10', 'nodejs', 'javascript' }
    [ 'es3', 'es5' ]
    [ 'es6' ]
    []
    searchParams.toString(): page=3&limit=10&category=nodejs&category=javascript
*/

/*
    URL 생성자를 통해 myURL이라는 주소 객체를 만듬.
    myURL 안에는 searchParams 객체가 있다. 이 객체는 search 부분을 조작하는 다양한 메서드를 지원한다. (FormData 객체 메서드와 비슷하다.)
    myURL.searchParams 대신 new URLSearchParams(myURL.searchParams)로도 같은 결괏값을 얻을 수 있다.
  
 * getAll(키): 키에 해당하는 모든 값을 가져온다. category 키에는 nodejs와 javascript라는 두 가지 값이 들어있다.
 * get(키): 키에 해당하는 첫 번째 값만 가져온다.
 * has(키): 해당 키가 있는지 없는지를 검사한다.
 * keys(): searchParams의 모든 키를 반복기(iterator - ES2015문법) 객체로 가져온다.
 * values(): searchParams의 모든 값을 반복기 객체로 가져온다.
 * append(키, 값): 해당 키를 추가한다. 같은 키의 값이 있다면 유지하고 하나 더 추가한다.
 * set(키, 값): append와 비슷하지만 같은 키의 값들을 모두 지우고 새로 추가한다.
 * delete(키): 해당 키를 제거한다.
 * toString(): 조작 searchParams 객체를 다시 문자열로 만든다. 이 문자열을 search에 대입하면 주소 객체에 반영 됨.
*/
