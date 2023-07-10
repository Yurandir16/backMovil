import { Router } from 'express';
import { getUsers } from '../model/Users.js';

const router = Router();

router.get('/all_users_orm', async function (req, res) {
    getUsers.findAll({ 
        attributes: ['name','lastName','email','password','phone_number'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/create_users_orm', async function (req, res) {
    const { name, lastName, email, password, phone_number } = req.query;

    getUsers.create({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        phone_number: phone_number
    })
        .then(users => {
            res.send(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error creating user')
        });
});

router.put('/update_users_orm', async function (req, res) {
    const id = req.params.id;
    const { name, lastName, email, password, phone_number } = req.params;

    getUsers.update(
        {
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            phone_number: phone_number
        },
        {
            where: { id: id }
        }
    )
        .then(() => {
            res.send('Usuario actualizado');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error updating user');
        });
});

router.delete('/destroy_users_orm', async function (req, res) {
    let id = req.query.id

    getUsers.destroy({
        where: { id: id }
    }).then(() => {
        res.send('persona eliminada')
    })
});

export default router;

