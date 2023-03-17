const fs = require('fs');

//* watch는 파일/폴더의 변경 사항을 감시할 수 있다.
fs.watch('./target.txt', (eventType, filename) => {
    console.log(eventType, filename);
});

/*
 * 내용을 수정하면 change 이벤트가 발생함
 * 파일명을 변경하거나 파일을 삭제하면 rename이벤트가 발생
 * rename이벤트 발생 후에는 더 이상 watch가 수행되지 않는다?
*/