//* 첫번째인수는 테스트에 대한 설명, 두 번째 인수인 함수에는 태스트 내용
/*
test('1 + 1은 2입니다.', () => {
    expect(1+1).toEqual(3);
    //* expect: 실제 코드, toEqual: 예상되는 결괏값
});
*/

//* 실제 작성해놓은 함수로 테스트
const { isLoggedIn, isNotLoggedIn } = require('./');


//? describe?: 테스트를 그룹화 해준다. 첫 번째 인수는 설명, 두번째 인수인 함수는 그룹에 대한 내용
//* 테스트시 익스프레스가 제공해주는 req, res, next(가짜 객체, 가짜 함수)를 직접 작성해야한다. 이런 행위를 모킹이라고 한다.
describe('isLoggedIn', () => {
    // 재활용이 가능한 객체, 함수는 바깥에
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };
    const next = jest.fn();

    test('로그인되어 있으면 isLoggedIn이 next를 호출해야 함', () => {
        //테스트당 모양이 정해진 객체나 함수는 내부에
        const req = {
            isAuthenticated: jest.fn(() => true),
        };
        isLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1); // 몇번 호출되었는지를 체크하는 메서드
    });

    test('로그인되어 있지 않으면 isLoggedIn이 에러를 응답해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => false)
        };
        isLoggedIn(req, res, next);
        expect(res.status).toBeCalledWith(403); // 특정인수와 함께 호출되었는지 체크하는 메서드
        expect(res.send).toBeCalledWith('로그인 필요');
    });
});

describe('isNotLoggedIn', () => {
    const res = {
        redirect: jest.fn(),
    };
    const next = jest.fn();
    test('로그인되어 있으면 isNotLoggedIn이 에러를 응답해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => true),
        };
        isNotLoggedIn(req, res, next);
        const message = encodeURIComponent('로그인한 상태입니다.');
        expect(res.redirect).toBeCalledWith(`/?error=${message}`);
    });

    test('로그인되어 있지 않으면 isNotLoggedIn이 next를 호출해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => false),
        };
        isNotLoggedIn(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });
    //작은 단위의 함수나 모듈이 의도된 대로 정확히 작동하는지 테스트하는것: 유닛(단위) 테스트
});