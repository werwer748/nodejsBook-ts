setInterval(() => {
    console.log('시작');
    // throw new Error('서버를 고장내주마!!');
    try {
        throw new Error('서버를 고장내주마!!');
    } catch (err) {
        console.error(err);
    }
}, 1000);

/*
    에러가 발생하지만 try/catch로 잡을 수 있고, setInterval도 계속 실행 된다.
    이렇게 에러가 발생할 것 같은 부분을 미리 try/catch로 감싸면 된다.
*/