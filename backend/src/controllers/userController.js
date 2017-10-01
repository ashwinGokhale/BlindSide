import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';

export const register = (req, res) => {
	if (!req.body.email || !req.body.password) 
		res.status(400).send('All fields are required');
	else {
		// If user is already registered
		User.findOne({email: req.body.email}).exec((err, user) => {
			if (err){
				console.error(err);
				res.send(err);
			}
			else if(user){
				res.send(`Theres is already a user with an email of: ${req.body.email}`);
			}
			else {
				let newUser = new User(req.body);
				newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
				newUser.save((err, user) => {
					if (err) {
						return res.status(400).send({
							message: err
						});
					} else {
						user.hash_password = undefined;
						return res.json(user);
					}
				});
			}
		});
	}
};

export const login = (req, res) => {
	User.findOne({email: req.body.email}, (err, user) => {

		if (err) throw err;
		if (!user || !user.comparePassword(req.body.password))
			return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
	
		return res.json({ token: jwt.sign({ email: user.email, _id: user._id }, 'BlindSide') });
	});
};

export const loginRequired = (req, res, next) => {
	if (req.user)
		next();

	else 
		return res.status(401).json({ message: 'Unauthorized user!' });
};