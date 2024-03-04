// db/schema.js
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	firstname: {
		type: String,
		require: true,
	},
	lastname: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	role: {
		type: String,
		require: true,
	},
});

const ApplicationFormSchema = new mongoose.Schema({
	studentId: {
		type: String,
		require: true,
		// unique: true,
	},
	examId: {
		type: String,
		require: true,
	},
	firstname: {
		type: String,
		require: true,
	},
	lastname: {
		type: String,
		require: true,
	},
	address: {
		type: String,
		require: true,
	},
	city: {
		type: String,
		require: true,
	},
	state: {
		type: String,
		require: true,
	},
	zip: {
		type: Number,
		require: true,
	},
	country: {
		type: String,
		require: true,
	},
	university: {
		type: String,
		require: true,
	},
	personalEmail: {
		type: String,
		require: true,
		// minLength: 7,
		// maxLength: 254,
	},
	schoolEmail: {
		type: String,
		require: true,
		// minLength: 7,
		// maxLength: 254,
	},
	degree: {
		type: String,
		require: true,
	},
	branch: {
		type: String,
		require: true,
	},
	graduationDate: {
		type: Date,
		require: true,
	},
	cpi: {
		type: mongoose.Types.Decimal128,
		require: true,
	},
	photo: {
		type: String,
		require: true,
	},
	idProof: {
		type: String,
		require: true,
	},
});

const User = mongoose.model('User', UserSchema);

const examSchema = new mongoose.Schema({
	noOfQuestions: {
		type: Number,
		require: true,
	},

	testTime: {
		type: String,
		require: true,
	},

	testDateTime: { type: String, require: true },

	examName: { type: String, require: true },

	file: {
		type: String,
		require: true,
	},
	teacherEmail: {
		type: String,
		require: true,
	},
	participants: { type: [mongoose.Schema.Types.ObjectId] },
});
const responsesSchema = new mongoose.Schema({
	examId: { type: String },
	studentId: { type: String },
	response: { type: String },
	score: { type: String },
	multiplePerson:{type:Number},
	differentPerson:{type:Number},
	zeroPerson:{type:Number},
});
const Responses = mongoose.model('Responses', responsesSchema);
const Exam = mongoose.model('Exam', examSchema);
const Applicationform = mongoose.model(
	'Applicationform',
	ApplicationFormSchema
);
module.exports = { Exam, User, Applicationform, Responses };
