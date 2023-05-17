const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { Domain } = require('../models');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
}

exports.verifyToken = (req, res, next) => {
    try {
        res.locals.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // 유효 기간 초과
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.',
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.'
        });
    }
};

exports.apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1분 - 기준시간
    max: 10, // 허용 횟수
    handler(req, res) { // 제한 초과 시 콜백 함수
        res.status(this.statusCode).json({
            code: this.statusCode, // 기본값 429
            message: '1분에 열 번만 요청할 수 있습니다.'
        });
    },
});

exports.deprecated = (req, res) => {
    res.status(410).json({
        code: 410,
        message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.'
    });
};

/*
* 클라이언트로 보내는 응답코드를 정리해두면 좋다. ㄹㅇㄹㅇㄹㅇ
*/

exports.corsWhenDomainMatches = async (req, res, next) => {
    const domain = await Domain.findOne({
        where: { host: new URL(req.get('origin')).host }, // 클라이언트의 도메인과 호스트가 일치하는 것이 있는지 체크
        //? http나 https 같은 프로토콜을 떼어낼 때 주소를 URL 객체로 만들어 host 속성을 사용한다.
    });
    if (domain) {
        cors({
            origin: req.get('origin'), // 여러개의 도메인을 허용하고 싶다면 배열을 이용
            credentials: true,
        })(req, res, next); // 미들웨어의 작동 방식을 커스터마이징하고 싶을 때 사용하는 방법
    } else {
        next();
    }
};

/*
    router.use(cors());

    router.use((req, res, next) => {
        cors()(req, res, next);
    });

    * 두 방식 모두 사용가능 함, 다양하게 활용 가능하다.
*/