// server.js
const express = require('express');
const cors = require('cors');
const { User } = require('../db/schema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(express.json());

router.route('/login').post(async (req, res) => {
	try {
		console.log(req.body);
		const { email, password, role } = req.body;
		console.log(email, password);
		const user = await User.findOne({ email, role });

		if (!user) {
			return res.status(404).json({ message: 'email not found' });
		}

		const isPasswordValid = bcrypt.compareSync(password, user.password);

		if (isPasswordValid) {
			let token = jwt.sign({email:email,role:role}, process.env.JWT_SECRET, {expiresIn: '1h'});
			console.log(token);
			res.status(200).json({
				firstname: user.firstname,
				lastname: user.lastname,
				password: user.password,
				_id: user._id.toString(),
				token: token,
			});
		} else {
			res.status(401).json({ message: 'Incorrect password' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

module.exports.router = router;
