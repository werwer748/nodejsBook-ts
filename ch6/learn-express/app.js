const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();
const app = express(); // express 내부에 http 모듈이 내장되어 있어서 서버의 역할을 할 수 있다.
app.set('port', process.env.PORT || 3000); //? 서버가 실행될 포트 설정

app.use(morgan('dev'));
//? morgan: dev 외에 common, combined, short, tiny 등을 넣을 수 있다. 주로 개발시는 dev, 배포시는 combined사용
app.use('/', express.static(path.join(__dirname, 'public')));
//? express.static: 정적 파일 제공. 서버 폴더에는 public이 있지만 요청 주소에는 없다면 외부인이 서버 구조를 파악하기 어려워 지기 때문에 보안에 도움이 된다.
//? 정적 파일들을 알아서 제공해 주므로, fs.readFile로 파일을 직접 읽어서 전송할 필요가 없다
//? 해당 경로에 요청파일이 없으면 알아서 next를 호출. 파일을 발견하면 다음 미들웨어가 실해오디지 않음. 응답으로 파일을 보내고 next를 호출하지 않기 때문에

/* body-parser */
/*
 * 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어.
 * 보통 폼 데이터나 AJAX 요청의 데이터를 처리한다.
 * 단, 멀티파트 (이미지, 동영상, 파일) 데이터는 처리하지 못한다.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//* body-parser 미들웨어의 일부기능이 익스프레스에 내장되었기 때문에 지금처럼 사용해도 되지만 버퍼나 텍스트 요청을 처리할 필요가 있다면 body-parser를 설치하고 다음을 추가
//const bodyParser = require('body-parser'); <- 임포트하고
app.use(bodyParser.raw());
app.use(bodyParser.text());
/*
? 요청 데이터의 종류
JSON: JSON 형식의 데이터 전달 방식
URL-encoded: 주소 형식으로 데이터를 보내는 방식(폼 전송이 주로 사용)
{ extends: false }옵션이 false면 노드의 querystring 모듈을 사용해 쿼리스트링을 해석하고, true면 qs(내장모듈 X npm패키지 => querystring모듈의 기능을 좀 더 확장한 모듈) 모듈을 사용해 쿼리스트링을 해석함
*/
/** body-parser를 사용하면 req.on('data'), req.on('end')를 쓸 필요 없음. 패키지가 내부적으로 스티림을 처리해 req.body에 추가하기 떄문. */

/* cookie-parser */
/*
 * 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만든다.
 * cookieParser(비밀키) 형식으로 사용, 유효기간이 지난 쿠키는 알아서 걸러냄
 * 첫 번째 인수로 비밀 키를 넣어줄 수 있다. 서명된 쿠키가 있는 경우, 제공한 비밀 키를 통해 해당 쿠키가 내 서버가 만든 쿠키임을 검증한다.
 * 쿠키는 위조하기 쉽기 때문에 비밀키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙임
 * 서명이 붙으면 name=hugoK.sign과 같은 모양이 되고 서명된 쿠키는 req.cookies 대신 req.signedCookies 객체에 들어있다.
 * cookie-parser가 쿠키를 생성할 때 쓰이는 것은 아니다. 쿠키를 생성/제거하려면 res.cookie, res.clearCookie 메서드를 사용해야 한다.
 * res.cookie(키, 값, 옵션) 형식으로 사용한다. 옵션은 domain, expires, httpOnly, maxAge, path, secure 등이 있다.
 * 
 * res.cookie('name', 'hugoK', {
 *  expires: new Date(Date.now() + 900000),
 *  httpOnly: true,
 *  secure: true,
 * });
 * res.clearCookie('name', 'hugoK', { httpOnly: true, secure: true });
 * 쿠키를 지우려면, 키와 값 외에 옵션도 정확히 일치해야 쿠키가 지워진다. 단, expires나 maxAge옵션은 일치할 필요가 없다.
 * 
 * 옵션 중 signed라는 옵션이 있는데, 이를 true로 설정하면 쿠키 뒤에 서명이 붙는다.
 * 내 서버가 쿠키를 만들었다는 검증을 할 수 있으므로 대부분의 경우 서명 옵션을 켜두는 것이 좋다.
 * 비밀 키는 cookieParser 미들웨어에 인수로 넣은 process.env.COOKIE_SECRET이 된다.
*/
app.use(cookieParser(process.env.COOKIE_SECRET));

/* express-session */
/*
 * 세션 관리용 미들웨어.
 * 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 매우 유용하다.
 * 세션은 사용자별로 req.session 객체 안에 유지됨.
 * 예전 버전(1.5 기준 이전)에는 내부적으로 cookie-parser를 사용하고 있어서 cookie-parser 미들웨어보다 뒤에 둬야했지만 지금은 순서가 상관 없어짐
 * 그래도 불안하다면 cookie-parser 미들웨어보다 뒤에 두고 사용할 것!
 * 
 * express-session은 인수로 세션에 대한 설정을 받는다.
 * resave: 요쳥이 올 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 설정하는 것
 * saveUninitialized: 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것.
 * 
 * express-session은 세션 관리 시 클라이언트에 쿠키를 보낸다.
 * 안전하게 쿠키를 전송하려면 쿠키에 서명을 추가해야 하고, 쿠키를 서명하는데 secret의 값이 필요하다. cookie-parser의 secret과 같게 설정하는 것이 좋음.
 * 세션 쿠키의 이름은 name 옵션으로 설정한다. 기본 이름은 connect.sid
 * cookie 옵션은 세션 쿠키에 대한 설정. maxAge, domain, path, expires, sameSite, httpOnly, secure 등 일반적인 쿠키 옵션이 모두 제공 된다.
 * 
 * store라는 옵션도 존재하는데 현재는 서버를 재시작 했을 경우 메모리가 초기화 되어 세션이 사라짐.
 * 하지만 배포 시에 store에 데이터베이스를 연결해 세션을 유지하는 것이 좋다. 보통 레디스가 자주 쓰임.
 * 
 * req.session.name = 'hugoK'; -> 세션 등록
 * req.sessionID; -> 세션 아이디 확인
 * req.session.destroy(); -> 세션 모두 제거
 * req.session 객체에 값을 대입하거나 삭제해서 세션을 변경할 수 있다.
 * req.session.save -> 세션을 강제로 저장하기 위한 메서드지만 일반적으로 요청이 끝날 때 자동으로 호출되므로 호출할 일이 거의 없음
 * 
 * express-session에서 서명한 쿠키 앞에는 s:이 붙는다. 실제로는 encodedURIComponent 함수가 실행되어 s%3A가 된다.
 * s%3A의 뒷부분이 실제 암호화된 쿠키 내용인데 s%3A가 붙은 경우 이 쿠키가 express-session 미들웨어에 의해 암호화된 것이라고 생각하면 됨
*/
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // 클라이언트에서 쿠키 확인 못하도록
        secure: false, // https가 아닌 환경에서도 사용할 수 있도록, 배포 시에는 https를 적용하고 secure도 true로 설정할 것.
    },
    name: 'session-cookie',
}));

/*
 * 미들웨어
 * 1. 익스프레스의 핵심!
 * 2. 요청과 응답의 중간에 위치하기 때문에 미들웨어 라고 부름
 * 3. 미들웨어는 요청과 응답을 조작해 기능을 추가하기도 하고, 나쁜 요청을 걸러내기도 한다.
 * 4. 미들웨어는 app.use와 함께 사용됨. app.use(미들웨어) 꼴이다.
*/
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
});

// app.get('/', (req, res) => {
// //* app.get(주소, 라우터): 주소에 대한 GET 요청이 올 때 어떤 동작을 할지 적는 부분.
//     // res.send('Hello, Express!');
//     //? express에서는 res.wirte나 res.end 대신 res.send를 사용하면 된다.
//     res.sendFile(path.join(__dirname, '/index.html'));
//     //? html파일 서빙할 경우 res.sendFile사용
// });
app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next(); // 미들웨어 연결시 next를 호출해야 다음 미들웨어로 넘어 간다.
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

app.use((err, req, res, next) => {
    //? 에러처리 미들웨어는 매개변수가 네개다.(반드시 네 개여야 함.)
    console.error(err);
    res.status(500).send(err.message);
    //? res.status메서드로 HTTP 상태 코드를 지정할 수 있다.(기본값은 200)
    //* 익스프레스가 기본적으로 에러를 처리하지만 실무에서는 직접 에러 처리 미들웨어를 연결해 주는 것이 좋다.
    //* 특별한 경우가 아니라면 에러처리 미들웨어의 위치는 코드 가장 아래에 위치하도록 한다.
});

app.listen(app.get('port'), () => {
//? listen부는 http 웹 서버와 동일함.
    console.log(app.get('port'), '번 포트에서 대기 중')
});