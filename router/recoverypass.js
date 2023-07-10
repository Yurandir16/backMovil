import { Router } from "express";
import { getUsers } from "../model/Users.js";
const router = Router();

router.put('/update_password_orm', async function (req, res) {
    const { name, email, password } = req.query;

    getUsers.findOne({
        where: { name: name, email: email }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found');
            }

            user.password = password;
            user.save()
                .then(updatedUser => {
                    res.send(updatedUser);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send('Error updating password');
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error finding user');
        });
});

export default router;
