// @file vuetodo.js <controllers>
// load ORM nmodule
let db = require('../models/index')

// REST controller definitions
module.exports = {
    index: (req, res) => {
            db.vuetodotable.findAll({
                where:{
                    name: req.query.name
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
    new: (req, res) => {
        res.send("new forum");
    },
    // create: (req, res) => {
    //     res.send("Rest posted!!");
    // },
    create: (req, res) => {
        let data = {
        name:req.body.name,
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
    // show: (req, res) => {
    //     res.send("show forum " + req.params.forum);
    // },
    // edit: (req, res) => {
    //     res.send("edit forum " + req.params.forum);
    // },
    update: (req, res) => {
        res.send("update forum " + req.params.forum);
    },
    // destroy: (req, res) => {
    //    res.send("destroy forum " + req.params.forum);
    // },
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