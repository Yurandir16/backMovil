import express from 'express';
import { api } from './config/Config.js';
import user from './router/user.js';
import image from './router/local.js'
import login from './router/login.js'
import recovery from './router/recoverypass.js'
import cors from 'cors';

const app = express();

app.use('/api_v1/user', user);
app.use('/api_v1/local',image);
app.use('/api_v1/login',login)
app.use('/api_v1/recovery',recovery);
app.use(cors({origin: true, credentials: true}));

app.listen(api.port, () => {
    console.log('server running on port =>', api.port);
});