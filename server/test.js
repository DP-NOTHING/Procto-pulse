const dotenv = require('dotenv');
dotenv.config('./../.env');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
router.use(express.json());
let gridfsBucket;
const gfs = Grid(mongoose.connection, mongoose.mongo);
gfs.collection('media');
const storage = new GridFsStorage({
	url: `${process.env.CONNECTIONSTRING}`,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			resolve({ bucketName: 'abcs' });
		});
	},
});
const upload = multer({ storage });
router.route('/').post(upload.single('photo'), async (req, res) => {
	console.log(req.file);
	return res.status(200).end('uploaded successfully');
});
module.exports.router = router;
