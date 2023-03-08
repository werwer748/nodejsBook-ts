/*
    브라우저의 window와 같은 전역 객체.
    전역 객체이므로 모든 파일에서 접근할 수 있다.
    또한, window.open 메서드를 그냥 open으로 호출할 수 있는 것처럼 global도 생략할 수 있다. (require함수도 global.require 임, console도 마찬가지)
    global 내부를 보려면 REPL을 이용해야 한다.
*/

/*
    노드에서는 DOM이나 BOM 없이 window와 document 객체를 노드에서 사용할 수 없다.
    노드에서 window 또는 document를 사용하면 에러가 발생하기 때문에 이 둘을 아우르는 globalThis 객체가 만들어졌다.
    globalThis는 브라우저 window, 노드에서는 global이 된다.
*/

