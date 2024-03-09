// import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { blue, red } from '@mui/material/colors';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ParticipantsList from './ParticipantsList';
import NavBar from '../Landing/NavBar'
const ExamDetails = () => {
	// const
	const [details, setDetails] = useState({});
	const [participants, setParticipants] = useState([]);
	const state = useLocation().state;
	const Navigate = useNavigate();
	// console.log(state);
	const [isLoading, setIsLoading] = useState(false);
	const examId = state.examId;
	// if(state=)
	// const { id: examId } = useParams();
	// console.log(examId);
	const downloadPaper = async (e) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			const response = await axios.get(
				`${process.env.REACT_APP_BACKEND}/exam/download/${details.file}`,
				{ responseType: 'blob' ,
				headers: {
					"Authorization": "Bearer " + localStorage.getItem('token'), //the token is a variable which holds the token
				  },}
			);
			const file = new Blob([response.data], { type: 'application/pdf' });
			//Build a URL from the file
			const fileURL = URL.createObjectURL(file);
			//Open the URL on new Window
			window.open(fileURL);
			setIsLoading(false);
			// console.log(resp);
		} catch (error) {
			alert(
				'error occured opening file ! Please try again later and make sure you have stable internet connection !'
			);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		const fetchExamDetails = async (examId) => {
			// console.log(`${process.env.REACT_APP_BACKEND}/exam/${examId}`);
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_BACKEND}/applicationform/get-exam-details/${examId}`,{
						
						headers: {
							"Authorization": "Bearer " + localStorage.getItem('token'), //the token is a variable which holds the token
						  },
					}
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
		fetchExamDetails(examId)
			.then((res) => {
				// console.log(res);
				setDetails(res.exam);
				setParticipants(res.participantsList);
				setIsLoading(false);
			})
			.catch((err) => console.error(err));
	}, []);
	return (
		<>
			<NavBar />
			{isLoading && <Loader />}
			{!isLoading && (
				<Box sx={{ width: '100%', maxWidth: 'fit' }}>
					<Typography
						sx={{ mt: 4, mb: 2, ml: 4 }}
						variant='h4'
						component='div'
					>
						Exams Details
					</Typography>
					<List>
						<ListItem>
							<Button
								onClick={() => {
									Navigate('/teacher-dashboard');
								}}
								size='large'
								variant='contained'
							>
								Back
							</Button>
						</ListItem>
						<ListItem>Exam Name: {details.examName}</ListItem>
						<ListItem>Number Of Questions: {details.noOfQuestions}</ListItem>
						<ListItem>
							Exam Time: {new Date(details.testDateTime).toLocaleString()}
						</ListItem>
						<ListItem>Test Duration (in Hours): {details.testTime}</ListItem>
						<ListItem>
							<Button
								variant='contained'
								size='medium'
								onClick={downloadPaper}
								sx={{ m: 0 }}
							>
								view question paper
							</Button>
						</ListItem>
						<ParticipantsList data={participants} />
					</List>
				</Box>
			)}
		</>
		// <h3>Exam Details {state.examId}</h3>
	);
};

export default ExamDetails;
