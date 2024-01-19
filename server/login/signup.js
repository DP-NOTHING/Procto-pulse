const express = require('express');
const router = express.Router();
const { User } = require('../db/schema');
const bcrypt = require('bcryptjs');
const {default : mongoose}= require('mongoose');
router.use(express.json());

router.route('/signup').post(async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body.formData;
    console.log("----------------------------");
    console.log(firstname); console.log("----------------------------");
    console.log(req.body); console.log("----------------------------");
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

  console.log(newUser);
    await newUser.save();
    console.log("hi");
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports.router = router;
