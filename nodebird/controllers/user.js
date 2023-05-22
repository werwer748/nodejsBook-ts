
//* 서비스로직 분리전 컨트롤러에서 모든것을 처리할 때의 코드
const User = require('../models/user');

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) { // req.user.id가 followerId, req.params.id가 followingId
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};


/*
//* 서비스 로직 분리 후 컨트롤러는 모델에 관해 몰라도 됨 익스프레스 함수만 잘 처리하면 된다.
const { follow } = require('../services/user');

exports.follow = async (req, res, next) => {
  try {
    const result = await follow(req.user.id, req.params.id);
    if (result === 'ok') {
      res.send('success');
    } else if (result === 'no user') {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
*/