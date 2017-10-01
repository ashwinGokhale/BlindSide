import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let UserSchema = new mongoose.Schema({
	email: {
	  type: String,
	  unique: true,
	  lowercase: true,
	  trim: true,
	  required: true
	},
	hash_password: {
	  type: String,
	  required: true
	},
	devices: {
		type: Array
	}
});

UserSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.hash_password);
};

export default mongoose.model('User', UserSchema);

