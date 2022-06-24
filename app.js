import express from 'express';
import { api } from './config/Config.js';
import user from './router/user.js';
import fathers from './router/fathers.js';
import sons from './router/sons.js';
import image from './router/imagenes.js'
import cors from 'cors';

const app = express();

app.use('/api_v1/user', user);
app.use('/api_v1/fathers', fathers);
app.use('/api_v1/sons',sons);
app.use('/api_v1/image',image);


app.use(cors({origin: true, credentials: true}));

app.listen(api.port, () => {
    console.log('server running on port =>', api.port);
});