jest.mock('../models/user');
const User = require('../models/user');
const { follow } = require('./user');

//* 서비스 로직에 관한 테스트
describe('follow', () => {
    test('사용자를 찾아 팔로잉을 추가하고 ok를 반환 함', async () => {
        User.findOne.mockReturnValue({
            addFollowing(id) {
                return Promise.resolve(true);
            }
        });
        const result = await follow(1, 2);
        expect(result).toEqual('ok');
    });

    test('사용자를 못 찾으면 no user를 반환 함', async () => {
        User.findOne.mockReturnValue(null);
        const result = await follow(1, 2);
        expect(result).toEqual('no user');
    });

    test('DB에서 에러가 발생하면 throw', async () => {
        const message = 'DB에러';
        User.findOne.mockReturnValue(Promise.reject(message));
        try {
            await follow(1, 2);
        } catch (err) {
            expect(err).toEqual(message);
            //? 에러와 에러메시지를 toEqual로 비교하면 된다.
        }
    });
    //* req, res, next를 모킹하지 않는다.
});