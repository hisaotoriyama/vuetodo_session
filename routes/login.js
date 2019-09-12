let express = require('express')
let router = express.Router()
let db = require('../models/index')

let session = require('express-session')

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000
    }
  }));
  

router.post('/', (req, res) => {
    console.log("HERE");
    console.log(req.session);
    db.user.findOne({
        where:{
            name: req.body.loginName
        }
    }).then((d)=> {console.log(d);
    if(req.body.loginPassword==d.password){
        console.log("OK")
        req.session.name=req.body.loginName
        req.session.password= req.body.loginPassword
        console.log(req.session.name)
        console.log(req.session.password)
        // res.cookie('login',true)
        // res.cookie('name',req.body.loginName)
        console.log("done")
        console.log(req.session)
        res.send(200)
    } else {
        console.log("NG")
        // res.cookie('login',false)
        res.send(200)    
    }
    })
})

module.exports = router