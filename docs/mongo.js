var express = require('express');
var router = express.Router();

const Model = require('./mongoSchema.js');
/* GET users listing. */
router.post('/', function(req, res, _next) {
    const payload = {
        name: req.body.name,
        svg: req.body.svg
    }
    new Model(payload).save((err, data)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200).send(data);
        }
    });
});

router.get('/', (req, res, _next)=>{
    Model.find({name: req.query.name}, { __v: 0, _id: 0 }).exec((err, data)=>{
        if(err){
            res.sendStatus(500)
        }else{
            res.status(200).send(data[0])
        }
    })
})

module.exports = router;