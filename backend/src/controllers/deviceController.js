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
		Device.find().exec((err, device) => {
			if (err){
				console.error(err);
				res.send(err);
			}
			else if(!device){
				res.send(`Theres is already a device running on: ${req.body.link}`);
			}
			else {
				let newDevice = new Device(req.body);
				newDevice.save((err, dev) => {
					if (err) 
						return res.status(400).send({message: err});
					else
						return res.json(dev);
				});
			}
		});
	}
};

export const proxy = (req, res) => {
	Device.find().exec((err, device) => {
		if (err){
			console.error(err);
			res.send(err);
		}
		else if(device)
			axios.post(device.link, req.body).then(() => res.json(req.body));
		
		else
			res.send('No devices registered')
	});
}