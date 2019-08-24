// @file users.js <controllers>
// load ORM nmodule
let db = require('../models/index')

// REST controller definitions
module.exports = {
    //public/main.jsのPOSTの機能として、Controllerが引っ張られてきている。
    // Sequlizeを使ってLoginNameを取り出し
    //createなんだけどCookieをCreateしている感じなんだろうか
    //何れにしてもここはpublic/main.jsの一部機能でしかない。
    
    create: (req, res) => {
            // console.log(req.body);
            db.user.findOne({
                where:{
                    name: req.body.loginName
                }
            }).then((d)=> {
                // console.log(d);
            // console.log(req.body.loginPassword)
            // console.log(d.password)
            if(req.body.loginPassword==d.password){
                // console.log("OK")
                res.cookie('login',true)
                res.send(200)
            } else {
                // console.log("NG")
                res.cookie('login',false)
                res.send(200)    
            }
            })
        }
    }
    