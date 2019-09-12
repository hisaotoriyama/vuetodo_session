// @file vuetodo.js <controllers>
// load ORM nmodule
let db = require('../models/index')

// REST controller definitions
module.exports = {
    index: (req, res) => {
      console.log("main page index")
      console.log(req.session)
            db.vuetodotable.findAll({
                where:{
                    name: req.session.name
                }
            }).then((d) => {
                let data = d.map((p) => {
                     return {
                        id: p.id,
                        name: p.name,
                        email: p.email,
                        item: p.item,
                        isDone: p.isDone
                    }
                })
                res.json(data)
            })
    },

    create: (req, res) => {
        let data = {
        name:req.session.name,//ここでnameを入れた。sessionの場合の対応。
        email:req.body.email,
        item:req.body.item
        }
        db.vuetodotable.create(data).then((p)=>{
          res.json({
              id: p.id,
              name: p.name,
              email: p.email,
              item: p.item
            })
        })
    },

    update: (req, res) => {
        db.vuetodotable.update({
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
        db.vuetodotable.destroy({
            where: {
             id:req.params.id
            }
        }).then(() => {
            res.send({})
        })
 }


}