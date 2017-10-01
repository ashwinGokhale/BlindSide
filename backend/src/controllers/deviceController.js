import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import Device from '../models/device';

export const registerDevice = (req, res) => {
	if (!req.body.link || !req.body.id) 
		res.status(400).send('All fields are required');
	else {
		// If user is already registered
		Device.findOneAndUpdate({}, req.body, {upsert:true}, (err, device) => {
			if (err) return res.send(500, { error: err });

			return res.json(req.body);
		});
	}
};

export const proxy = (req, res) => {
	Device.findOne().exec((err, device) => {
		if (err){
			console.error(err);
			res.send(err);
		}
		
		else if(device){
			if (req.body.command == 'open')
				axios.get(device.link+'/openBlind', req.body).then(() => res.json(req.body)).catch((error) => console.error(error));
			else
				axios.get(device.link+'/closeBlind', req.body).then(() => res.json(req.body)).catch((error) => console.error(error));
		}
	
		else
			res.send('No devices registered')
	});
}