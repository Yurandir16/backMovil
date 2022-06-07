import { Router } from 'express';
import { success as _success } from '../../../network/response.js';
import  getConnection  from '../../../model/db.js';

const router = Router();

import cors from 'cors';
var allowlist = ['http://localhost:3000',''];

var corsOptionsDelegate = function (req, callback){
    var corOptions;
    if (allowlist.indexOf(req.header('Origin'))!==-1){
        corOptions = { origin:true }
    } else {
        corOptions ={ origin:false }
    }
    callback(null, corOptions)
}

router.get('/readme',cors(corsOptionsDelegate), async function (req, res){
    const client = await getConnection();
    
    const query_request ={
        text:'SELECT * FROM tbl_usersdb'
    }

    client.query(query_request)
    .then(r => { console.log('true'); _success(req, res, r, 200); })
    .catch(e => { console.log('false'); _success(req, res, e.stack, 200); })
})

router.post('/register', async function (req, res) {
    const client = await getConnection();

    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: 'INSERT INTO tbl_usersdb(username, email, password, phone_number)VALUES($1 ,$2, $3, $4)',
        values: [username, email, password, phone_number]
    };

    client.query(query_request)
        .then(r => { console.log('true'); _success(req, res, r, 200); })
        .catch(e => { console.log('false'); _success(req, res, e.stack, 200); })

});

router.delete('/delete', async function (req, res) {
    const client = await getConnection();

    let id = req.query.id;

    const query_request = {
        text: `DELETE FROM tbl_usersdb WHERE id=${id}`,
    }

    client.query(query_request)
        .then(r => { console.log('true'); _success(req, res, r, 200); })
        .catch(e => { console.log('false'); _success(req, res, e.stack, 400); })

})

router.put('/update', async function (req, res) {
    const client = await getConnection();

    let id = req.query.id;
    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: `UPDATE tbl_usersdb SET username=$1, email=$2, password=$3, phone_number=$4 WHERE id=${id}`,
        values: [username, email, password, phone_number]

    };

    client.query(query_request)
        .then(r => { _success(req, res, r, 200); })
        .catch(e => { _success(req, res, e.stack,400);})
})

router.post('/login', function (req, res) {
    let username = req.query.username;
    let password = req.query.password;
    res.send(
        {
            username,
            password,
            token: 'token',
            id_user: 'id_uder',
            success: 'ok'
        }
    )
})


export default router;

