let express = require('express')
let router = express.Router()
let db = require('../models/index')

router.get('/', (req,res)=>{
    // res.cookie("login")
    req.session.name=""
    req.session.password=""
    res.redirect("/login.html")
})

module.exports = router