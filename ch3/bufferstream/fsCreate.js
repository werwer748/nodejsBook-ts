const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
    .then(() => {
        return Promise.reject('이미 폴더 있음');
    })
    .catch((err) => {
        if (err.code === 'ENOENT') {
            console.log('폴더 없음');
            return fs.mkdir('./folder');
        }
        return Promise.reject(err);
    })
    .then(() => {
        console.log('폴더 만들기 성공');
        return fs.open('./folder/file.js', 'w');
    })
    .then((fd) => {
        console.log('빈 파일 만들기 성공', fd);
        return fs.rename('./folder/file.js', './folder/newfile.js');
    })
    .then(() => {
        console.log('이름 바꾸기 성공');
    })
    .catch((err) => {
        console.error(err);
    })

/*
 * fs.access(경로, 옵션, 콜백)
 * : 폴더나 파일에 접근할 수 있는지 체크, 두번째 인수로 상수들(constants를 통해 가져옴)을 넣음
 * F_OK는 파일 존재 여부, R_OK는 읽기 권한 여부, W_OK는 쓰기 권한 여부를 체크한다.
 * 파일/폴더나 권한이 없다면 에러가 발생하는데 이 에러 코드가 ENOENT임
 * 
 * fs.mkdir(경로, 콜백)
 * : 폴더를 만드는 메서드인데 이미 폴더가 있다면 에러가 말생하므로 access 메서드로 확인하는 것이 중요함.
 * 
 * fs.open(경로, 옵션, 콜백)
 * : 파일의 아이디(fd 변수)를 가져오는 메서드로, 파일이 없다면 파일을 생성한 뒤 그 아이디를 가져온다.
 * 가져온 아이디를 사용해 fs.read, fs.write로 읽거나 쓸 수 있다.
 * 두 번째 인수로 어떤 동작을 할 것인지를 설정할 수 있다. 쓰려면 w, 읽으려면 r, 기존 파일에 추가하려면 a
 * 
 * fs.rename(기존 경로, 새 경로, 콜백)
 * : 파일의 이름을 바꾸는 메서드. 기존 파일위치와 새로운 파일 위치를 적으면 된다.
*/