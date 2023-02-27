//* 노드 7.6 버전부터 지원되는 기능으로, ES2017에서 추가 됨.
//* 알아두면 정말 편리한 기능이라고, 특히 노드처럼 비동기 위주로 프로그래밍을 해야 할 때 도움이 많이 된다.
//* 프로미스에서 then과 catch의 반복을 깔끔하게 줄여준다.

//* Promise
function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = 'hugo';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .then((user) => {
            //...생략
        })
        .catch(err => {
            console.error(err)
        })
}

//* async/await

async function findAndSaveUser(Users) {
    let user = await Users.findOne({});
    user.name = 'hugo';
    user = await user.save();
    user = await Users.findOne({ gender: 'm' });
    // ...생략
}
/*
    함수 선언부를 일반 함수 대신 async function으로 교체 후, 프로미스 앞에 await를 붙였다.
    이제 함수는 해당 프로미스가 resolve될 때까지 기다린 뒤 다음 로직으로 넘어가는 것.
    await Users.findOne({})이 resolve될 떄까지 기다린 다음 user 변수를 최기화 하는 것이다.
*/

//* 위 코드에 에러 처리를 위해 추가 작업
async function findAndSaveUser(Users) {
    try {
        let user = await Users.findOne({});
        user.name = 'hugo';
        user = await user.save();
        user = await Users.findOne({ gender: 'm' });
        // ...생략
    } catch (error) {
        console.error(error);
    }
}
/*
    try/catch 문으로 로직을 감싸면 프로미스의 catch메서드처럼 try/catch문의 catch가 에러를 처리한다.
*/

//* 화살표 함수 + async
const findAndSaveUser = async (Users) => {
    try {
        let user = await Users.findOne({});
        user.name = 'hugo';
        user = await user.save();
        user = await Users.findOne({ gender: 'm' });
        // ...생략
    } catch (error) {
        console.error(error);
    }
};

//* for문 + async/await (노드 10 버전부터 지원 ES2018)
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async () => {
    for await (promise of [promise1, promise2]) {
        console.log(promise);
    }
})();
/*
    for await of문을 사용해서 프로미스 배열을 순회 함.
    async 함수의 반환값은 항상 Promise로 감싸진다. 따라서, 실행 후 then을 붙이거나 또 다른 async 함수 안에 await을 붙여서 처리할 수 있다.
*/

async function findAndSaveUser(Users) {
    // ...생략
}
findAndSaveUser().then();
// 또는
async function other() {
    const result = await findAndSaveUser();
};