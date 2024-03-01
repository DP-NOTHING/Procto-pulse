const express = require('express');
const mongoose = require('mongoose');
const { Responses } = require('../db/schema');
const router = express.Router();
router
	.route('/')
	.post(async (req, res) => {
		// console.log(req.body, 'response posted!');
		try {
			const exists = await Responses.exists({
				studentId: req.body.studentId,
				examId: req.body.examId,
			});
			// console.log(exists);
			if (exists == null) {
				await new Responses(req.body).save();
				res.status(200).json({ success: true });
			} else res.status(200).json({ success: false });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	})
	.get(async (req, res) => {
		try {
			const { studentId, examId } = req.query;
			const response = await Responses.findOne(
				{ examId, studentId },
				{ response: 1, _id: 0 }
			);
			// console.log(response);
			res.status(200).json(
				response ?? {
					response:
						'[{"type":"heading-one","children":[{"text":" no response to show "}]}]',
				}
			);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
		// console.log(req.query);
	});
router
	.route('/score')
	.post(async (req, res) => {
		try {
			const { studentId, examId, score } = req.body;
			// const response = await Responses.findOne(
			// 	{ examId, studentId },
			// 	{ response: 1, _id: 0 }
			// );
			await Responses.findOneAndUpdate({ examId, studentId }, { score });
			res.status(200).json({ success: true });
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	})
	.get(async (req, res) => {
		try {
			const { studentId, examId } = req.query;
			// const response = await Responses.findOne(
			// 	{ examId, studentId },
			// 	{ response: 1, _id: 0 }
			// );
			const score = await Responses.findOne(
				{ examId, studentId },
				{ score: 1, _id: 0 }
			);
			res.status(200).json(score);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	});
module.exports.router = router;
