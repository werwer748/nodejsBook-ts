const axios = require('axios');

const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.ORIGIN;
//origin 헤더 추가
//? 요청이 요청을 보냈는지 파악하기 위해서

// exports.test = async (req, res, next) => { // 토큰 테스트 라우터
//     try {
//         if (!req.session.jwt) {
//             const tokenResult = await axios.post('http://localhost:8002/v1/token', {
//                 clientSecret: process.env.CLIENT_SECRET,
//             });
//             if (tokenResult.data?.code === 200) { // 토큰 발급 성공
//                 req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
//             } else {
//                 return res.json(tokenResult.data);
//             }
//         }
//         // 발급받은 토큰 테스트
//         const result = await axios.get('http://localhost:8002/v1/test', {
//             headers: { authorization: req.session.jwt },
//         });
//         return res.json(result.data);
//     } catch (error) {
//         console.error(error);
//         if (error.response?.status === 419) { // 토큰 만료시
//             return res.json(error.response.data);
//         }
//         return next(error);
//     }
// };

const request = async (req, api) => { // NodeBird API에 직접 요청을 보내는 함수.
    try {
        if (!req.session.jwt) { // 세션에 토큰이 없을 경우
            const tokenResult = await axios.post(`${URL}/token`, {
                clientSecret: process.env.CLIENT_SECRET,
            });
            req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
        }
        return await axios.get(`${URL}${api}`, {
            headers: { authorization: req.session.jwt },
        });
    } catch (error) {
        if (error.response?.status === 419) { // 토큰 만료시 재발급
            delete req.session.jwt; //세션에 jwt제거
            return request(req, api);
        } 
        return error.response;// 419 외의 에러일 경우

        //! 결과값을 명확히 - 성공여부를 알 수 있고, 실패해도 실패의 종류를 알 수 있다.
    }
}

exports.getMyPosts = async (req, res, next) => {
    try {
        const result = await request(req, '/posts/my');
        res.json(result.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.searchByHashtag = async (req, res, next) => {
    try {
        const result = await request(req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`);
        res.json(result.data);
    } catch (error) {
        if (error.code) {
            console.error(error);
            next(error);
        }
    }
};