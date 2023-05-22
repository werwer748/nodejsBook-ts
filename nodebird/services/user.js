// 라우트, 서비스, 컨트롤러를 분리하면 테스트에 더 유리함.
//* 이 경우 서비스는 req, res, next에관해 알지 못한다.
//* 반대로 컨트롤러는 User와 같은 모델에 대해 알지 못한다.

/*
* 컨트롤러와 서비스를 분리하는 주된 이유는 비즈니스로직에 더 집중하기 위해서다.
*/

const User = require('../models/user');

exports.follow = async (userId, followingId) => {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
        await user.addFollowing(parseInt(followingId, 10));
        return 'ok';
    } else {
        return 'no user';
    }
};