import { Router } from 'express';
import { getUsers } from '../model/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

// Ruta de inicio de sesión
router.post('/ok_login', async (req, res) => {
  const { email, password } = req.query;

  try {
    const user = await getUsers.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_secret_key');

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;
