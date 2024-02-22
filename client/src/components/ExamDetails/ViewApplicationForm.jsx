// // import * as React from 'react';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import Typography from '@mui/material/Typography';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import IconButton from '@mui/material/IconButton';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Loader from '../Loader/Loader';
// import { useNavigate } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
// import { blue, red } from '@mui/material/colors';
// import { Button } from '@mui/material';
// import { useLocation } from 'react-router-dom';
// import ParticipantsList from './ParticipantsList';

// const ViewApplicationForm = () => {
// const [details, setDetails] = useState({});
// const [participants, setParticipants] = useState([]);
// const state = useLocation().state;
// // const examId = state.examId;
// // const studentId = state.studentId;
// const [isLoading, setIsLoading] = useState(true);
// 	// if(state=)
// 	// const { id: examID } = useParams();
// 	// console.log(state);
// 	// const downloadPaper = async (e) => {
// 	// 	try {
// 	// 		e.preventDefault();
// 	// 		setIsLoading(true);
// 	// 		const response = await axios.get(
// 	// 			`${process.env.REACT_APP_BACKEND}/exam/download/${details.file}`,
// 	// 			{ responseType: 'blob' }
// 	// 		);
// 	// 		const file = new Blob([response.data], { type: 'application/pdf' });
// 	// 		//Build a URL from the file
// 	// 		const fileURL = URL.createObjectURL(file);
// 	// 		//Open the URL on new Window
// 	// 		window.open(fileURL);
// 	// 		setIsLoading(false);
// 	// 		// console.log(resp);
// 	// 	} catch (error) {
// 	// 		alert(
// 	// 			'error occured opening file ! Please try again later and make sure you have stable internet connection !'
// 	// 		);
// 	// 		setIsLoading(false);
// 	// 	}
// 	// };
// useEffect(() => {
// 	const fetchApplicationFormDetails = async (examId, studentId) => {
// 		// console.log(`${process.env.REACT_APP_BACKEND}/exam/${examID}`);
// 		try {
// 			const res = await axios.get(
// 				`${process.env.REACT_APP_BACKEND}/applicationform/${examId}/${studentId}`
// 			);
// 			// console.log(res.data);
// 			/* {
// 				_id: '65cf820c352960b06da32ae0',
// 				noOfQuestions: 1,
// 				testTime: '1',
// 				testDateTime: '2024-03-02T21:10',
// 				examName: 'exam1',
// 				file: 'c0e3fc7cffcb48d54348ee73577b5b3f',
// 				teacherEmail: 't@t.t',
// 				__v: 0,
// 				participants: [ '65d5efc5542a89fe1e88803f', '65d621ff542456a689208383' ]
// 			  } */
// 			return res.data;
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};
// 	setIsLoading(true);
// 	fetchApplicationFormDetails(state.examId, state.studentId)
// 		.then((res) => {
// 			console.log(res);
// 			setDetails(res);
// 			setIsLoading(false);
// 		})
// 		.catch((err) => {
// 			console.error(err);
// 			setIsLoading(false);
// 		});
// }, []);
// 	return (
// 		<>
// 			{isLoading && <Loader />}
// 			{!isLoading && (
// 				<Box sx={{ width: '100%', maxWidth: 'fit' }}>
// 					<Typography
// 						sx={{ mt: 4, mb: 2, ml: 4 }}
// 						variant='h4'
// 						component='div'
// 					>
// 						Application Details
// 					</Typography>
// 					{/* <List>
// 						<ListItem>Exam Name: {details.examName}</ListItem>
// 						<ListItem>
// 							Number Of Questions: {details.noOfQuestions}
// 						</ListItem>
// 						<ListItem>
// 							Exam Time:{' '}
// 							{new Date(details.testDateTime).toLocaleString()}
// 						</ListItem>
// 						<ListItem>
// 							Test Duration (in Hours): {details.testTime}
// 						</ListItem>
// 						<ListItem>
// 							<Button
// 								variant='contained'
// 								size='medium'
// 								onClick={downloadPaper}
// 								sx={{ m: 0 }}
// 							>
// 								view question paper
// 							</Button>
// 						</ListItem>
// 						<ParticipantsList data={participants} />
// 					</List> */}
// 				</Box>
// 			)}
// 		</>
// 		// <h3>Exam Details {state.examId}</h3>
// 	);
// };

// export default ViewApplicationForm;
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, List, ListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const bull = (
	<Box
		component='span'
		sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
	>
		•
	</Box>
);
/* {
  _id: new ObjectId("65d61cabab44f9d963c02f5d"),
  firstname: 'dm',
  lastname: 'dm',
  studentId: '65d5efc5542a89fe1e88803f',
  examId: '65cf820c352960b06da32ae0',
  address: 's',
  city: 'ss',
  state: 's',
  zip: 111111,
  country: 'coun',
  university: 'uni',
  personalEmail: 's@s.s',
  schoolEmail: 'school@school.com',
  degree: 'B.tech pursuing',
  branch: 'Computer Science',
  graduationDate: 2024-03-02T00:00:00.000Z,
  cpi: new Decimal128("5"),
  photo: '65d61ca75b44d71f086017e6',
  idProof: '65d61ca75b44d71f086017e7',
  __v: 0 */
export default function ViewApplicationForm() {
	const [details, setDetails] = useState({});
	const [participants, setParticipants] = useState([]);
	const state = useLocation().state;
	const Navigate = useNavigate();
	// const examId = state.examId;
	// const studentId = state.studentId;
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchApplicationFormDetails = async (examId, studentId) => {
			// console.log(`${process.env.REACT_APP_BACKEND}/exam/${examID}`);
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_BACKEND}/applicationform/${examId}/${studentId}`
				);
				// console.log(res.data);
				/* {
					_id: '65cf820c352960b06da32ae0',
					noOfQuestions: 1,
					testTime: '1',
					testDateTime: '2024-03-02T21:10',
					examName: 'exam1',
					file: 'c0e3fc7cffcb48d54348ee73577b5b3f',
					teacherEmail: 't@t.t',
					__v: 0,
					participants: [ '65d5efc5542a89fe1e88803f', '65d621ff542456a689208383' ]
				  } */
				return res.data;
			} catch (error) {
				console.error(error);
			}
		};
		setIsLoading(true);
		fetchApplicationFormDetails(state.examId, state.studentId)
			.then((res) => {
				// console.log(Object.entries(res));
				setDetails(res);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setIsLoading(false);
			});
	}, []);
	return (
		<>
			{!isLoading && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Card sx={{ minWidth: 600, maxWidth: 1000 }}>
						<CardContent sx={{ p: 6 }}>
							<Typography
								variant='h3'
								gutterBottom
							>
								Student Details
							</Typography>
							<Typography
								variant='h4'
								component='div'
							>
								{}
							</Typography>
							<CardActions>
								<Button
									size='large'
									variant='contained'
									onClick={() =>
										Navigate('/examdetails', {
											state: { examId: details.examId },
										})
									}
								>
									Back
								</Button>
							</CardActions>
							{/* <Typography
    						sx={{ mb: 1.5 }}
    						color='text.secondary'
    					>
    						describes the heading
    					</Typography> */}
							<Typography variant='body1'>
								<List>
									{Object.entries(details).map(
										([attribute, val]) => {
											return (
												<>
													{/* {attribute != 'cpi' && ( */}
													<ListItem>
														{attribute ==
															'graduationDate' &&
															`${attribute}: ${new Date(
																val
															).toLocaleString()}`}
														{(attribute != '_id' &&
															attribute !=
																'studentId' &&
															attribute !=
																'examId' &&
															attribute !=
																'__v' &&
															attribute !=
																'graduationDate' &&
															attribute !=
																'idProof' &&
															attribute !=
																'photo' &&
															attribute !=
																'cpi' &&
															`${attribute}: ${val}`) ||
															(attribute ==
																'cpi' &&
																`${attribute}: ${val['$numberDecimal']}`)}
													</ListItem>
													{/* )}
    										{attribute == 'cpi' && (
    											<ListItem>hello</ListItem>
    										)} */}
												</>
											);
										}
									)}
								</List>
							</Typography>
						</CardContent>
						<Box
							component='img'
							// style={{
							// 	maxWidth: '100%',
							// 	height: 'auto',
							// 	padding: 0,
							// 	margin: 0,
							// }}
							sx={{
								height: 233,
								width: 350,
								maxHeight: { xs: 233, md: 167 },
								maxWidth: { xs: 350, md: 250 },
							}}
							alt='photo'
							src={`${process.env.REACT_APP_BACKEND}/applicationform/get-photo/${details.examId}/${details.studentId}/${details.photo}`}
						/>
						<br />
						<Box
							component='img'
							// style={{
							// 	maxWidth: '100%',
							// 	height: 'auto',
							// 	padding: 0,
							// 	margin: 0,
							// }}
							sx={{
								height: 233,
								width: 350,
								maxHeight: { xs: 233, md: 167 },
								maxWidth: { xs: 350, md: 250 },
							}}
							alt='id proof'
							src={`${process.env.REACT_APP_BACKEND}/applicationform/get-idProof/${details.examId}/${details.studentId}/${details.idProof}`}
						/>
					</Card>
				</div>
			)}
		</>
	);
}
