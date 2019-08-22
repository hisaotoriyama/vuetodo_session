// @file users.js <controllers>
// load ORM nmodule
let db = require('../models/index')

// REST controller definitions
module.exports = {
    index: (req, res) => {
            db.user.findAll({
                where:{
                    name: req.query.name
                }
            }).then((d) => {
                let data = d.map((p) => {
                     return {
                        id: p.id,
                        name: p.name,
                        email: p.email,
                        password: p.password                    }
                })
                res.json(data)
            })
    },

    create: (req, res) => {
        let data = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
        }
        db.user.create(data).then((p)=>{
          res.json({
              id: p.id,
              name: p.name,
              email: p.email,
              password: p.password
            })
        })
    },

    update: (req, res) => {
        db.user.update({
          item:req.body.item
        },{
          where:{
            id:req.params.id
          }
        }).then((p)=>{
          let data = p
          res.json(data)
        })},

    //（重要論点）Sequlize上ではdestroy。でもhttp上ではdeleteとする。
    destroy: (req, res) => {
        db.user.destroy({
            where: {
             id:req.params.id
            }
        }).then(() => {
            res.send({})
        })
 }


}