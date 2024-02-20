// server.js
const express = require('express');
const cors = require('cors');
const { Applicationform } = require('../db/schema');
const router = express.Router();
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const fs = require('fs');

let gridfsBucket;
const gfs = Grid(mongoose.connection, mongoose.mongo);
gfs.collection('fs');

const storage = new GridFsStorage({
    url: `${process.env.CONNECTIONSTRING}`,
  });

const upload = multer({ storage });


router.use(express.json());

router.route('/getimage/:studentid').get(async (req, res) => {
	
        console.log("----------------------------------------------------------")
		console.log(req.params.studentid);
        console.log("----------------------------------------------------------")
		// const { studentid } = req.body;/
		// console.log(email, password);
		const {photo} = await Applicationform.findOne({ studentId: req.params.studentid});
        console.log("----------------------------------------------------------")
        console.log(photo);
        const uploadedId = new mongoose.Types.ObjectId(photo);
        const file = await gfs.files.findOne({
			_id: uploadedId,
		});

        const downloadStream = gridfsBucket.openDownloadStream(file._id);
        console.log("----------------------------------------------------------")
        // console.log(readStream);
        var data=[];
        let base64img;
        await new Promise((resolve, reject) => {
            downloadStream.on('data', (chunk) => {
                data.push(chunk);
            });
    
            downloadStream.on('end', () => {
                data = Buffer.concat(data);
                base64img=Buffer.from(data).toString('base64');
                resolve();
            });
    
            downloadStream.on('error', (err) => {
                reject(err);
                return res.status(404).json({ err: 'Image not found' });
            });
        });
        // console.log(base64img)
		return res.send(base64img);
    
});


(async () => {
	// console.log(process.env.CONNECTIONSTRING);
	const conn = await mongoose.connect(process.env.CONNECTIONSTRING);
	gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection, {
		bucketName: 'fs',
	});
	console.log('gfs connected');
})();

module.exports.router = router;
