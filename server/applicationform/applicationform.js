const express = require('express');
const { Applicationform } = require('../db/schema');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const router = express.Router();
router.use(express.json());


const gfs = Grid(mongoose.connection, mongoose.mongo);
gfs.collection('File');

const storage = new GridFsStorage({
    url: `${process.env.CONNECTIONSTRING}`,
  });

const upload = multer({ storage });

router.route('/').post(upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'idProof', maxCount: 1 }]),async (req, res) => {
	
		// console.log(req.body);
        console.log(req.files);
        console.log("hi");
		const newForm = new Applicationform(
			req.body.data,
		);

		await newForm.save();
        res.json({ success: 'dfdf' });
});

module.exports.router = router;
