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
import NavBar from '../Landing/NavBar'
export default function TeacherDashboard() {
	// useEffect(())
	const [isLoading, setIsLoading] = useState(true);
	const Navigate = useNavigate();
	const [exams, setExams] = useState([]);
	const deleteExam = async (e) => {
		try {
			// console.log(e.currentTarget.id);
			setIsLoading(true);
			const deletedExamId = e.currentTarget.id;
			await axios.delete(
				`${process.env.REACT_APP_BACKEND}/exam/${e.currentTarget.id}`,{
					headers: {
						"Authorization": "Bearer " + localStorage.getItem('token'), //the token is a variable which holds the token
					  },
				}
			);
			setExams(exams.filter((exam) => exam._id != deletedExamId));
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};
	const handleExamDetails = async (e) => {
		e.preventDefault();
		// console.log(e.currentTarget.id);
		setIsLoading(true);
		Navigate('/examdetails', { state: { examId: e.currentTarget.id } });
		setIsLoading(false);
	};
	useEffect(() => {
		// console.log('jnsdnknsdkxnkdsn');

		const fetchExams = async () => {
			try {
				const response = await axios.get(
					`${
						process.env.REACT_APP_BACKEND
					}/exam/${localStorage.getItem('email')}`,{
						headers: {
							"Authorization": "Bearer " + localStorage.getItem('token'), //the token is a variable which holds the token
						  },
					}
				);

				return response;
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchExams()
			.then((response) => {
				// console.log(response.data);
				setExams(response.data);
				const exams = response.data;
				// console.log(exams);
				setIsLoading(false);
				// console.log(exams);
				// console.log(new Date(exams[1].testDateTime));
				// console.log(new Date(exams[0].testDateTime));
				// console.log(
				// 	new Date(exams[1].testDateTime) <
				// 		new Date(exams[0].testDateTime)
				// );
			})
			.catch((res) => {
				console.error(res);
				setIsLoading(false);
			});

		return () => {};
	}, []);
	return (
		<>
			<NavBar />
			{isLoading && <Loader />}
			{isLoading || (
				<Box sx={{ width: '100%', maxWidth: 'fit' }}>
					<Typography
						sx={{ mt: 4, mb: 2, ml: 4 }}
						variant='h4'
						component='div'
					>
						Exams
					</Typography>
					<Typography
						sx={{ mt: 4, mb: 2, ml: 4 }}
						variant='h5'
						component='div'
					>
						Upcoming Exams
					</Typography>
					<List>
						{/* <ListItem
							disablePadding
							secondaryAction={
								<IconButton
									edge='end'
									aria-label='delete'
								>
									<DeleteIcon />
								</IconButton>
							}
						>
							<ListItemButton>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary='Inbox' />
							</ListItemButton>
						</ListItem>
						<ListItem
							disablePadding
							secondaryAction={
								<IconButton
									edge='end'
									aria-label='delete'
								>
									<DeleteIcon />
								</IconButton>
							}
						>
							<ListItemButton>
								<ListItemIcon>
									<DraftsIcon />
								</ListItemIcon>
								<ListItemText primary='Drafts' />
							</ListItemButton>
						</ListItem> */}
						{exams
							.filter(
								(exam) =>
									new Date(exam.testDateTime) > new Date()
							)
							.map((exam, i) => (
								<ListItem
									sx={{
										m: 1,
										':hover': {
											backgroundColor: blue[50],
										},
									}}
									key={exam._id.toString()}
									disablePadding
									secondaryAction={
										// <div
										// 	onClickCapture={deleteExam}
										// 	id={`${exam._id.toString()}`}
										// >
										<>
											<Button
												id={`${exam._id.toString()}`}
												onClick={handleExamDetails}
											>
												details
											</Button>
											<IconButton
												id={`${exam._id.toString()}`}
												edge='end'
												aria-label='edit'
												onClick={(e) =>
													Navigate('/create-exam', {
														state: {
															edit: true,
															exam: exams.find(
																(exam) =>
																	exam._id ==
																	e
																		.currentTarget
																		.id
															),
														},
													})
												}
												sx={{
													m: 1,
													':hover': {
														color: 'black',
													},
												}}
												size='large'
											>
												<EditIcon />
											</IconButton>
											<IconButton
												id={`${exam._id.toString()}`}
												edge='end'
												aria-label='delete'
												onClick={deleteExam}
												sx={{
													m: 1,
													':hover': {
														color: 'black',
													},
												}}
												size='large'
											>
												<DeleteIcon />
											</IconButton>
										</>
										// </div>
									}
								>
									<ListItemButton
										sx={{
											p: 2,
										}}
									>
										<ListItemIcon>
											<Typography component='div'>
												{i + 1}.
											</Typography>
											{/* <DraftsIcon /> */}
										</ListItemIcon>
										<ListItemText
											primary={`${exam.examName}`}
										/>
									</ListItemButton>
								</ListItem>
							))}
						<ListItem disablePadding>
							<ListItemButton
								onClick={() => Navigate('/create-exam')}
								sx={{
									p: 2,
									':hover': { backgroundColor: '#F5EBFF' },
								}}
							>
								<ListItemIcon>
									<AddIcon />
								</ListItemIcon>
								<ListItemText primary='Create New Exam' />
							</ListItemButton>
						</ListItem>
					</List>
					<Typography
						sx={{ mt: 4, mb: 2, ml: 4 }}
						variant='h5'
						component='div'
					>
						Previous Exams
					</Typography>
					<List>
						{exams
							.filter(
								(exam) =>
									new Date(exam.testDateTime) < new Date()
							)
							.map((exam, i) => (
								<ListItem
									sx={{
										m: 1,
										':hover': {
											backgroundColor: red[50],
										},
									}}
									key={exam._id.toString()}
									disablePadding
									secondaryAction={
										// <div
										// 	onClickCapture={deleteExam}
										// 	id={`${exam._id.toString()}`}
										// >
										<>
										<Button
												id={`${exam._id.toString()}`}
												onClick={handleExamDetails}
											>
												details
											</Button>
										
										<IconButton
											id={`${exam._id.toString()}`}
											edge='end'
											aria-label='delete'
											onClick={deleteExam}
											sx={{
												m: 1,
												':hover': { color: 'black' },
											}}
											size='large'
										>
											<DeleteIcon />
										</IconButton>
										</>
									}
								>
									<ListItemButton sx={{ p: 2 }}>
										<ListItemIcon>
											<Typography component='div'>
												{i + 1}.
											</Typography>
											{/* <DraftsIcon /> */}
										</ListItemIcon>
										<ListItemText
											primary={`${exam.examName}`}
										/>
									</ListItemButton>
								</ListItem>
							))}
					</List>
				</Box>
			)}
		</>
	);
}
