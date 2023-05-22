
/*
 jest.mock('../services/user.js');
 const { follow } = require('./user');
 const { follow: followService } = require('../services/user');
//* 컨트롤러와 서비스를 분리했을 때 테스트
describe('follow', () => {
    const req = {
        user: { id: 1 },
        params: { id: 2 },
    };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };
    const next = jest.fn();

    test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', async () => {
        followService.mockReturnValue('ok');
        await follow(req, res, next);
        expect(res.send).toBeCalledWith('success');
    });

    test('사용자를 못 찾으면 res.status(404).send(no user)를 호출함', async () => {
        followService.mockReturnValue('no user');
        await follow(req, res, next);
        expect(res.status).toBeCalledWith(404);
        expect(res.send).toBeCalledWith('no user');
    });

    test('DB에서 에러가 발생하면 next(error)를 호출함', async () => {
        const message = 'DB에러';
        followService.mockReturnValue(Promise.reject(message));
        await follow(req, res, next);
        expect(next).toBeCalledWith(message);
    });
});
*/

//* 컨트롤러와 서비스를 분리하지 않았을 때의 테스트
jest.mock('../models/user'); // User모델을 jest로 모킹함 => 해당 모듈의 메서드는 전부 가짜가 된다.
// 가짜 메서드에는 mockReturnValue 등의 메서드가 생성된다.
const User = require('../models/user');
const { follow } = require('./user');

describe('follow', () => {
    const req = {
        user: { id: 1 },
        params: { id: 2 },
    };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };
    const next = jest.fn();

    test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', async () => {
        User.findOne.mockReturnValue({
        //? User.findOne.mockReturnValue => User.findOne의 가짜 반환값을 지정할 수 있다.
            addFollowing(id) {
                return Promise.resolve(true);
            }
        });
        await follow(req, res, next);
        expect(res.send).toBeCalledWith('success');
    });

    test('사용자를 못 찾으면 res.status(404).send(no user)를 호출함', async () => {
        User.findOne.mockReturnValue(null);
        await follow(req, res, next);
        expect(res.status).toBeCalledWith(404);
        expect(res.send).toBeCalledWith('no user');
    });

    test('DB에서 에러가 발생하면 next(error)를 호출함', async () => {
        const message = 'DB에러';
        User.findOne.mockReturnValue(Promise.reject(message));
        await follow(req, res, next);
        expect(next).toBeCalledWith(message);
    });
});


/*
User모델이 없어서 테스트가 실패함. => User모델도 모킹해야 한다.
describe('follow', () => {
    const req = {
        user: { id: 1 },
        params: { id: 2 },
    };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };
    const next = jest.fn();

    test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', async () => {
        await follow(req, res, next);
        expect(res.send).toBeCalledWith('success');
    });

    test('사용자를 못 찾으면 res.status(404).send(no user)를 호출함', async () => {
        await follow(req, res, next);
        expect(res.status).toBeCalledWith(404);
        expect(res.send).toBeCalledWith('no user');
    });

    test('DB에서 에러가 발생하면 next(error)를 호출함', async () => {
        const message = 'DB에러';
        await follow(req, res, next);
        expect(next).toBeCalledWith(message);
    });
});
*/