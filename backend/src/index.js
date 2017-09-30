import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import jsonwebtoken from 'jsonwebtoken';
import { register, login, loginRequired, proxy } from './controllers/userController'

const app = express();
require('dotenv').config();
mongoose.Promise = global.Promise;

const port = process.env.PORT || 8080;
let url = process.env.MONGO_URL;
let db = mongoose.connect(url, {user:process.env.MONGO_USER, pass: process.env.MONGO_PASS, useMongoClient: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
	if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
	  jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'BlindSide', (err, decode) => {
		if (err) req.user = undefined;
		req.user = decode;
		next();
	  });
	} else {
	  req.user = undefined;
	  next();
	}
  });

app.route('/auth/register').post(register);

app.route('/auth/login').post(login);

app.route('/proxy').post(loginRequired, proxy)

app.listen(port, () => console.log(`Listening on port ${port}`));