import { Router } from 'express';
import { getUser } from '../model/Users.js';


const router = Router();

import cors from 'cors';

var allowlist = ['http://localhost:3000', ''];

var corsOptionsDelegate = function (req, callback) {
    var corOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corOptions = { origin: true }
    } else {
        corOptions = { origin: false }
    }
    callback(null, corOptions)
}

router.get('/all_users_orm', async function (req, res) {
    getUser.findAll({ attributes: ['name'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/create_users_orm', async function (req, res) {

    getUser.create({
        name: req.query.name,
        lastName:req.query.lastName,
        email: req.query.email,
        password: req.query.password,
        phone_number: req.query.phone_number
    })
        .then(users => {
            res.send(users);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.put('/update_users_orm', async function (req, res) {
    let id = req.query.id;
    let newDato = req.query;
    getUser.findOne({
        where: { id: id },
    })
        .then(users => {
            users.update(newDato)
                .then(newuser => {
                    res.send(newuser)
                })
        })
});

router.delete('/destroy_users_orm', async function (req, res) {
    let id = req.query.id

    getUser.destroy({
        where: { id: id }
    }).then(() => {
        res.send('persona eliminada')
    })
});

export default router;

