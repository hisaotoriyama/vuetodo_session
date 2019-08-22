// setup application
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
        res.send(200)
    } else {
        console.log("NG")
        res.cookie('login',false)
        res.send(200)    
    }
    })
})

let isLogin = (req, res, next) => {
    console.log(">>"+req.cookies.login)
    if(req.cookies.login == 'true') {
        next();  // これでページの表示の制御ができる
    } else {
        //next();
        console.log("here")
        res.redirect('/login.html')
    }
}

app.use( '/secure', isLogin, express.static( path.join( __dirname, '/private' )) );
app.use( express.static( 'public'));

// start application
app.listen(3020)
