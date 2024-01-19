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
		unique:true,
	}
	
});
const User = mongoose.model('User', UserSchema);





 const examSchema = new mongoose.Schema({

   noOfQuestions: {
	type:Number,
	require:true,},

  testTime: {
	type:String,
	require:true,},

  testDateTime: {type:String,
	require:true,},

  examName: {type:String,
	require:true,},

  
 });

 const Exam = mongoose.model('Exam', examSchema);

 module.exports = {Exam,User};