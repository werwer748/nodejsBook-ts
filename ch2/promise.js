/**
 * 자바스크립트와 노드에서는 주로 비동기를 접한다. 특히 이벤트 리스너를 사용할 때 콜백 함수를 자주 사용함.
 * ES2015부터는 자바스크립트와 노드의 API들이 콜백 대신 프로미스(Promise) 기반으로 재구성되며, 이로인해 콜백 지옥 현상을 극복했다.
 * 프로미스는 반드시 알아둬야 하는 객체!
 */

// 프로미스의 규칙이 있다. 먼저, 프로미스 객체를 생성해야 한다.
const condition = true; // true이면 resolve, false면 reject
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
});
// 다른 코드가 들어갈 수 있음
promise
    .then((message) => {
        console.log(message); // 성공(resolve)한 경우 실행
    })
    .catch((error) => { // 실패(reject)한 경우 실행
        console.error(error);
    })
    .finally(() => { // 끝나고 무조건 실행
        console.log('무조건');
    })

/*
    new Promise로 프로미스를 생성할 수 있으며, 안에 resolve와 reject를 매개변수로 갖는 콜백 함수를 넣는다.
    이렇게 만든 promise 변수에 then과 catch 메서드를 붙일 수 있다.
    프로미스 내부에서 resolve가 호출되면 then이 실행되고, reject가 호출되면 catch가 실행. finally 부분은 성공/실패 여부와 상관없이 실행 됨.

    resolve와 reject에 넣어준 인수는 각각 then과 catch의 매개변수에서 받을 수 있다.
    즉, resolve('성공')이 호출되면 then의 message가 '성공'이 됨. 만약, reject('실패')가 호출되면 catch의 error가 '실패'가 되는 것.(condition을 false로 바꾸면 catch에서 에러가 찍힘)

    프로미스를 쉽게 설명하면, 실행은 바로 하되 결괏값은 나중에 받는 객체. 결괏괎은 실행이 완료된 후 then이나 catch 메서드를 통해 받는다.
    위 예제에서는 new Promise와 promise.then 사이에 다른 코드가 들어갈 수도 있다.
    new Promise는 바로 실행되지만, 결괏값은 then을 붙였을 때 받게 된다.

    then이나 catch에서 다시 다른 then이나 catch를 붙일 수 있다.
    이전 then의 return 값을 다음 then의 매개변수로 넘긴다.
    프로미스를 return한 경우 프로미스가 수행된 후 다음 then이나 catch가 호출 됨.
 */

promise
    .then((message) => {
        return new Promise((resolve, reject) => {
            resolve(message);
        });
    })
    .then((message2) => {
        console.log('2', message2);
        return new Promise((resolve, reject) => {
            resolve(message2);
        });
    })
    .then((message3) => {
        console.log('3', message3);
    })
    .catch((error) => {
        console.error(error);
    });

/*
    처음 then에서 message를 resolve하면 다음 then에서 message2로 받을 수 있다.
    여기서 다시 message2를 resolve한 것을 다음 then에서 message3으로 받는다.(근데 보통 then많이 안붙이고 변수에 담아서 리턴받고 async/await처리로 많이 하는듯...?)
    단, then에서 new Promise를 return해야 다음 then에서 받을 수 있다는 것을 기억할것.
*/

//* 이것을 활용해 콜백을 프로미스로 바꿀 수 있다.
//* 콜백 : 세번 중첩, 콜백 함수가 나올 때마다 코드의 깊이가 깊어짐.
function findAndSaveUser(Users) {
    Users.findOne({}, (err, user) => { // 첫번째 콜백
        if (err) {
            return console.error(err);
        }
        user.name = 'hugo';
        user.save((err) => { // 두번째 콜백
            if (err) {
                return console.error(err);
            }
            Users.findOne({ gender: 'm' }, (err, user) => { // 세 번째 콜백
                //...생략
            });
        });
    });
}

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
/*
    코드의 깊이가 세단계 이상 깊어지지 않는다. 위 코드에서는 then 메서드들은 순차적으로 실행된다.
    콜백에서 매번 따로 처리해야했던 에러도 마지막 catch에서 한 번에 처리할 수 있다.
    하지만! 모든 콜백 함수를 위와 같이 바꿀 수 있는 것은 아니다. 메서드가 프로미스 방식을 지원해야 한다.

    예제의 코드는 findOne과 save 메서드가 내부적으로 프로미스 객체를 갖고 있다고 가정했기에 가능(new Promise가 함수 내부에 구현되어 있어야 함).
*/

//* 프로미스 여러 개를 한 번에 실행하는 법.
//* Promise.all
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2])
    .then((result) => {
        console.log(result); // ['성공1', '성공2']
    })
    .catch((error) => {
        console.error(error);
    });

/*
    Promise.resolve는 즉시 resolve하는 프로미스를 만드는 방법이다. 즉시 reject하는 Promise.reject도 있다.
    프로미스가 여러 개 있을 때 Promise.all에 넣으면 모두 resolve될 때까지 기다렸다가 then으로 넘아간다.
    result 매개변수에 각각의 프로미스 결괏값이 배열로 들어 있다. Promise 중 하나라도 reject가 되면 catch로 넘어간다. 다만, 여러 프로미스 중 어떤 프로미스가 reject 되었는지는 알 수 없음.
*/

//* 어떤 프로미스에서 reject되었는지 알기 위해서는 Promise.all 대신 Promise.allSettled를 사용해야 함.

const promise3 = Promise.resolve('성공3');
const promise4 = Promise.reject('실패4');
const promise5 = Promise.resolve('성공5');
Promise.allSettled([promise3, promise4, promise5])
    .then((result) => {
        console.log(result);
        /**
         * [
         *   { status: 'fulfilled', value: '성공3' },
         *   { status: 'rejected', reason: '실패4' },
         *   { status: 'fulfilled', value: '성공5' }
         * ]
         */
    })
    .catch((error) => {
        console.error(error)
    });
/*
    Promise.allSettled를 사용하면 결괏값이 좀 더 자세해져서 어떤 프로미스가 reject되었는지 status를 통해 알 수 있다.
    실패 이유는 reason에 들어 있다. 따라서 Promise.all 대신 Promise.allSettled를 사용하는 것을 좀 더 권장한다고 함.

    참고: Node16 버전부터는 reject된 Promise에 catch를 달지 않으면 UnhandlePromiseRejection에러가 발생함.(const promise4 = Promise.reject('실패4'));
    에러가 발생하면 다음 코드가 실행되지 않으니 반드시 프로미스에 catch 메서드를 붙이는 것을 권장.
    ex) Promise.reject('에러').catch(() => {}) 이런식으로...
 */