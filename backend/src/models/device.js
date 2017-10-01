import mongoose from 'mongoose';

let DeviceSchema = new mongoose.Schema({
	link: {
	  type: String,
	  unique: true,
	  trim: true,
	  required: true
	},
	id: {
	  type: String,
	  required: true,
	  trim: true,
	  required: true
	}
});

export default mongoose.model('Device', DeviceSchema);

