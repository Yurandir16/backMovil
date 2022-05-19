const express = require ('express');
//const req = require('express/lib/request');
//const config = require('../../')
const router = express.Router();
const response = require('../../../network/response');



router.get('/', function (req, res) {
    //return 'hola get';
    // res.send(
    //     {
    //         success:'success 1',
    //     }
    // )
    response.success(req,res,'',200)

})

router.post('/login',function(req, res){
    let username = req.query.username;
    let password = req.query.password;
    //console.log(req.query);
    res.send(
        {
           username,
           password,
           token:'token',
           id_user:'id_uder',
           success:'ok'
        }
    )
})

router.post('/register',function(req,res){
    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let nomber_phone = req.query.nomber_phone;
    //console.log(req.query);
    res.send(
        {
            username,
            email,
            password,
            nomber_phone,
            token:'token',
            success:'success 1',
            id_user:'2'
        }
    )
})

module.exports = router;
