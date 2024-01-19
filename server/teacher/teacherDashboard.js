const express = require('express');
const router = express.Router();
const { Exam } = require('../db/schema');
const bcrypt = require('bcryptjs');
const {default : mongoose}= require('mongoose');
router.use(express.json());

router.route('/').post(async (req, res) => {
  try {
    const { noOfQuestions,testTime,testDateTime,examName } = req.body;


    const newExam = new Exam({
        noOfQuestions,
        testTime,
        testDateTime,
        examName,
      
    });

  console.log(newExam);
    await newExam.save();
 
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports.router = router;
