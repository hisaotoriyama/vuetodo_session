// setup application
//まず画面で ブラウザで叩かれたアドレスlogin, user, vuetodoに基づき稼働する最初の画面。
let express = require('express')
let Res = require('express-resource')
let cp = require('cookie-parser')
let path = require('path')
let app = express()

app.use(cp())
app.use(express.json())

let db = require('./models/index')

// register REST controllers
app.resource('vuetodos', require('./controllers/vuetodo'), {id: 'id'})
app.resource('users', require('./controllers/user'), {id: 'id'})
// app.resource('logins', require('./controllers/login'), {id: 'id'})
//POSTだけでいいのでresourceは使わない！
app.post('/login', (req, res) => {
    console.log(req.body);
    db.user.findOne({
        where:{
            name: req.body.loginName
        }
    }).then((d)=> {console.log(d);
    console.log(req.body.loginPassword)
    console.log(d.password)
    if(req.body.loginPassword==d.password){
        console.log("OK")
        res.cookie('login',true)
        res.cookie('Name',req.body.loginName)
        res.send(200)
    } else {
        console.log("NG")
        res.cookie('login',false)
        res.send(200)    
    }
    })
})
app.get('/logout',(req,res)=>{
    res.cookie("login")
    res.redirect("/login.html")
})

let isLogin = (req, res, next) => {
    // console.log(">>"+req.cookies.login)
    if(req.cookies.login == 'true') {
        next();  // これによりapp.use isLoginのあとのexpress.static( path.join( __dirname, '/private' )) に移る。
    } else {
    //windows.alert("NameないしPasswordが異なっています")//→alert使えない。なぜ？？？？
        res.redirect('/login.html')
    }
}

app.use( '/secure', isLogin, express.static( path.join( __dirname, '/private' )) );
app.use( express.static( 'public'));

// start application
app.listen(3020)
