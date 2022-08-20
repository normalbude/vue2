const express = require('express')

const app = express()

let bodyParser = require('body-parser')
//只要加入这个配置，在req请求对象上会多出来一个属性
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())
//引入jwt
const jwt = require('jsonwebtoken');

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})


app.use((request, response, next) => {
    console.log('有人请求服务器1了')
    console.log('请求的资源是:', request.url)
    console.log('请求来自于:', request.get('Host'))
    next()
})
//轮播图
app.get('/api/slider', (request, response) => {
    const slider = {
        err: 0,
        data: [{ url: "http://www.javascriptpeixun.cn/files/system/2018/09-18/111926eb7fd8309596.png?version=8.3.6" },
        { url: "http://www.javascriptpeixun.cn/files/system/2018/09-21/1154091603c0186386.png?version=8.3.6" },
        { url: "http://www.javascriptpeixun.cn/files/system/2018/09-21/115355363dbc278291.png?version=8.3.6" }]
    }

    response.send(slider)
    response.end()
})
//登录
app.post('/user/login', (request, response) => {
    let payload = request.body;//获得请求体
    let secret = payload.username//用该字段（secret）和登录信息（payload）生成token
    let username = payload.username
    let token = jwt.sign(payload, secret);//生成token
    let authList = []
    if (username == 'admin') {
        authList = [{ auth: 'lesson', name: '课程管理', path: '/profile/lesson-manager' },
        { auth: 'student', name: '学院管理', path: '/profile/student-manager' },]
    } else {
        authList = [{ auth: 'points', name: '积分查看', path: '/profile/points' },
        { auth: 'collect', name: '收藏列表', path: '/profile/collect' },]
    }
    let userInfo = { err: 0, data: { username, token, authList, } }

    response.send(userInfo)
    response.end()
})

app.get('/user/validate', (request, response) => {
    let token = request.headers.authorization//获取请求头的权限字段(token)
    // const decoded = jwt.verify(token, '123')
    const decoded = jwt.verify(token, 'admin')//根据生成时的字段（secret）解码
    let username = decoded.username
    let authList
    if (username == 'admin') {
        authList = [{ auth: 'lesson', name: '课程管理', path: '/profile/lesson-manager' },
        { auth: 'student', name: '学院管理', path: '/profile/student-manager' },]
    } else {
        authList = [{ auth: 'points', name: '积分查看', path: '/profile/points' },
        { auth: 'collect', name: '收藏列表', path: '/profile/collect' },]
    }
    let userInfo = { err: 0, data: { username: username, token, authList, } }
    response.send(userInfo)
    response.end()
})

app.listen(7001, (err) => {
    if (!err) console.log('服务器1启动成功,请求的地址为: http://localhost:7001\n')
})
