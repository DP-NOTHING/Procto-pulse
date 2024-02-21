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

// export default function TeacherDashboard() {
// 	// useEffect(())
// 	const [isLoading, setIsLoading] = useState(true);
// 	const Navigate = useNavigate();
// 	const [exams, setExams] = useState([]);
// 	const deleteExam = async (e) => {
// 		try {
// 			// console.log(e.currentTarget.id);
// 			setIsLoading(true);
// 			const deletedExamId = e.currentTarget.id;
// 			await axios.delete(
// 				`${process.env.REACT_APP_BACKEND}/exam/${e.currentTarget.id}`
// 			);
// 			setExams(exams.filter((exam) => exam._id != deletedExamId));
// 			setIsLoading(false);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};
// useEffect(() => {
// 	// console.log('jnsdnknsdkxnkdsn');

// 	const fetchExams = async () => {
// 		try {
// 			const response = await axios.get(
// 				`${process.env.REACT_APP_BACKEND}/exam/`
// 			);
// 			return response;
// 		} catch (error) {
// 			console.error('Error fetching data:', error);
// 		}
// 	};

// 	fetchExams()
// 		.then((response) => {
// 			// console.log(response.data);
// 			setExams(response.data);
// 			const exams = response.data;
// 			// console.log(exams);
// 			setIsLoading(false);
// 			// console.log(exams);
// 			// console.log(new Date(exams[1].testDateTime));
// 			// console.log(new Date(exams[0].testDateTime));
// 			// console.log(
// 			// 	new Date(exams[1].testDateTime) <
// 			// 		new Date(exams[0].testDateTime)
// 			// );
// 		})
// 		.catch((res) => {
// 			console.error(res);
// 			setIsLoading(false);
// 		});

// 	return () => {};
// }, []);
// 	return (
// 		<>
// 			{isLoading && <Loader />}
// 			{isLoading || (
// 				<Box sx={{ width: '100%', maxWidth: 'fit' }}>
// 					<Typography
// 						sx={{ mt: 4, mb: 2, ml: 4 }}
// 						variant='h4'
// 						component='div'
// 					>
// 						Student Exams
// 					</Typography>
// 					<Typography
// 						sx={{ mt: 4, mb: 2, ml: 4 }}
// 						variant='h5'
// 						component='div'
// 					>
// 						Upcoming Exams
// 					</Typography>
// 					<List>
// 						{/* <ListItem
// 							disablePadding
// 							secondaryAction={
// 								<IconButton
// 									edge='end'
// 									aria-label='delete'
// 								>
// 									<DeleteIcon />
// 								</IconButton>
// 							}
// 						>
// 							<ListItemButton>
// 								<ListItemIcon>
// 									<InboxIcon />
// 								</ListItemIcon>
// 								<ListItemText primary='Inbox' />
// 							</ListItemButton>
// 						</ListItem>
// 						<ListItem
// 							disablePadding
// 							secondaryAction={
// 								<IconButton
// 									edge='end'
// 									aria-label='delete'
// 								>
// 									<DeleteIcon />
// 								</IconButton>
// 							}
// 						>
// 							<ListItemButton>
// 								<ListItemIcon>
// 									<DraftsIcon />
// 								</ListItemIcon>
// 								<ListItemText primary='Drafts' />
// 							</ListItemButton>
// 						</ListItem> */}
// 						{exams
// 							.filter(
// 								(exam) =>
// 									new Date(exam.testDateTime) > new Date()
// 							)
// 							.map((exam, i) => (
// 								<ListItem
// 									sx={{
// 										m: 1,
// 										':hover': {
// 											backgroundColor: blue[50],
// 										},
// 									}}
// 									key={exam._id.toString()}
// 									disablePadding
// 									secondaryAction={
// 										// <div
// 										// 	onClickCapture={deleteExam}
// 										// 	id={`${exam._id.toString()}`}
// 										// >
// 										<>
// 											<IconButton
// 												id={`${exam._id.toString()}`}
// 												edge='end'
// 												aria-label='edit'
// 												onClick={(e) =>
// 													Navigate('/create-exam', {
// 														state: {
// 															edit: true,
// 															exam: exams.find(
// 																(exam) =>
// 																	exam._id ==
// 																	e
// 																		.currentTarget
// 																		.id
// 															),
// 														},
// 													})
// 												}
// 												sx={{
// 													m: 1,
// 													':hover': {
// 														color: 'black',
// 													},
// 												}}
// 												size='large'
// 											>
// 												<EditIcon />
// 											</IconButton>
// 											<IconButton
// 												id={`${exam._id.toString()}`}
// 												edge='end'
// 												aria-label='delete'
// 												onClick={deleteExam}
// 												sx={{
// 													m: 1,
// 													':hover': {
// 														color: 'black',
// 													},
// 												}}
// 												size='large'
// 											>
// 												<DeleteIcon />
// 											</IconButton>
// 										</>
// 										// </div>
// 									}
// 								>
// 									<ListItemButton
// 										sx={{
// 											p: 2,
// 										}}
// 									>
// 										<ListItemIcon>
// 											<Typography component='div'>
// 												{i + 1}.
// 											</Typography>
// 											{/* <DraftsIcon /> */}
// 										</ListItemIcon>
// 										<ListItemText
// 											primary={`${exam.examName}`}
// 										/>
// 									</ListItemButton>
// 								</ListItem>
// 							))}
// 						<ListItem disablePadding>
// 							<ListItemButton
// 								onClick={() => Navigate('/create-exam')}
// 								sx={{
// 									p: 2,
// 									':hover': { backgroundColor: '#F5EBFF' },
// 								}}
// 							>
// 								<ListItemIcon>
// 									<AddIcon />
// 								</ListItemIcon>
// 								<ListItemText primary='Create New Exam' />
// 							</ListItemButton>
// 						</ListItem>
// 					</List>
// 					<Typography
// 						sx={{ mt: 4, mb: 2, ml: 4 }}
// 						variant='h5'
// 						component='div'
// 					>
// 						Previous Exams
// 					</Typography>
// 					<List>
// 						{exams
// 							.filter(
// 								(exam) =>
// 									new Date(exam.testDateTime) < new Date()
// 							)
// 							.map((exam, i) => (
// 								<ListItem
// 									sx={{
// 										m: 1,
// 										':hover': {
// 											backgroundColor: red[50],
// 										},
// 									}}
// 									key={exam._id.toString()}
// 									disablePadding
// 									secondaryAction={
// 										// <div
// 										// 	onClickCapture={deleteExam}
// 										// 	id={`${exam._id.toString()}`}
// 										// >
// 										<IconButton
// 											id={`${exam._id.toString()}`}
// 											edge='end'
// 											aria-label='delete'
// 											onClick={deleteExam}
// 											sx={{
// 												m: 1,
// 												':hover': { color: 'black' },
// 											}}
// 											size='large'
// 										>
// 											<DeleteIcon />
// 										</IconButton>
// 										// </div>
// 									}
// 								>
// 									<ListItemButton sx={{ p: 2 }}>
// 										<ListItemIcon>
// 											<Typography component='div'>
// 												{i + 1}.
// 											</Typography>
// 											{/* <DraftsIcon /> */}
// 										</ListItemIcon>
// 										<ListItemText
// 											primary={`${exam.examName}`}
// 										/>
// 									</ListItemButton>
// 								</ListItem>
// 							))}
// 					</List>
// 				</Box>
// 			)}
// 		</>
// 	);
// }
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Button from '@mui/material/Button';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import ParticipatedExams from './ParticipatedExams';
import PastExams from './PastExams';

// import { useNavigation } from 'react-router-dom/'
const columns = [
	{ id: 'examName', label: 'Exam Name', align: 'center', minWidth: 170 },
	{
		id: 'teacherEmail',
		label: 'Teacher Name',
		align: 'center',
		minWidth: 100,
	},
	{
		id: 'examDate',
		label: 'Exam Date',
		minWidth: 170,
		align: 'center',
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		id: 'startTime',
		label: 'Start Time',
		minWidth: 170,
		align: 'center',
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		id: 'testTime',
		label: 'Exam Duration (hours)',
		minWidth: 170,
		align: 'center',
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		id: 'participants',
		label: 'Participants',
		minWidth: 170,
		align: 'center',
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		id: 'apply',
		label: 'Apply',
		minWidth: 170,
		align: 'center',
		format: (value) => value.toLocaleString('en-US'),
	},
];

// function createData(examName, teacherEmail, testDateTime, testTime) {
// 	return { examName, teacherEmail, testDateTime, testTime };
// }

// const rows = [
// 	createData('India', 'IN', 1324171354, 3287263),
// 	createData('China', 'CN', 1403500365, 9596961),
// 	createData('Italy', 'IT', 60483973, 301340),
// 	createData('United States', 'US', 327167434, 9833520),
// 	createData('Canada', 'CA', 37602103, 9984670),
// 	createData('Australia', 'AU', 25475400, 7692024),
// 	createData('Germany', 'DE', 83019200, 357578),
// 	createData('Ireland', 'IE', 4857000, 70273),
// 	createData('Mexico', 'MX', 126577691, 1972550),
// 	createData('Japan', 'JP', 126317000, 377973),
// 	createData('France', 'FR', 67022000, 640679),
// 	createData('United Kingdom', 'GB', 67545757, 242495),
// 	createData('Russia', 'RU', 146793744, 17098246),
// 	createData('Nigeria', 'NG', 200962417, 923768),
// 	createData('Brazil', 'BR', 210147125, 8515767),
// ];

export default function StudentDashboards() {
	const Navigate = useNavigate();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [exams, setExams] = React.useState([]);
	const [participatedExams, setParticipatedExams] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const handleRegistration = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		Navigate('/examform', { state: { examId: e.currentTarget.id } });
		// console.log(e.currentTarget.id);
	};
	React.useEffect(() => {
		// console.log('jnsdnknsdkxnkdsn');

		const fetchExams = async () => {
			try {
				/*  shape of exam
                            {
      _id: '65cf820c352960b06da32ae0',
      noOfQuestions: 1,
      testTime: '1',
      testDateTime: '2024-03-02T21:10',
      examName: 'exam1',
      file: 'c0e3fc7cffcb48d54348ee73577b5b3f',
      teacherEmail: 't@t.t',
      __v: 0
    } */
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND}/exam/`
				);
				return response;
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchExams()
			.then((response) => {
				// console.log(response.data);
				setExams(
					response.data
						.filter(
							(e) =>
								!e.participants.includes(
									localStorage.getItem('id')
								)
						)
						.map((e) => {
							// console.log(e.participants.length);
							return {
								...e,
								'participants': e.participants.length,
								'examDate': new Date(e.testDateTime)
									.toLocaleString()
									.split(',')[0],
								'startTime': new Date(e.testDateTime)
									.toLocaleString()
									.split(',')[1],
							};
						})
				);
				setParticipatedExams(
					response.data
						.filter((e) =>
							e.participants.includes(localStorage.getItem('id'))
						)
						.map((e) => {
							// console.log(e.participants.length);
							return {
								...e,
								'participants': e.participants.length,
								'examDate': new Date(e.testDateTime)
									.toLocaleString()
									.split(',')[0],
								'startTime': new Date(e.testDateTime)
									.toLocaleString()
									.split(',')[1],
							};
						})
				);
				const exams = response.data;
				// console.log(Array.isArray(exams[0].participants));
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
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<>
			{isLoading && <Loader />}
			{!isLoading && (
				<>
					<Paper sx={{ width: '100%' }}>
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table
								stickyHeader
								aria-label='sticky table'
							>
								<TableHead>
									<TableRow>
										<TableCell
											align='center'
											colSpan={12}
										>
											<h3>Upcoming Exams</h3>
										</TableCell>
										{/* <TableCell
    										align='center'
    										colSpan={3}
    									>
    										Details
    									</TableCell> */}
									</TableRow>
									<TableRow>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{
													top: 57,
													minWidth: column.minWidth,
												}}
											>
												{column.label != 'Apply' &&
													column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{exams
										.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
										)
										.map((row) => {
											return (
												<TableRow
													hover
													role='checkbox'
													tabIndex={-1}
													key={row._id}
												>
													{columns.map((column) => {
														const value =
															row[column.id];
														return (
															<TableCell
																key={column.id}
																align={
																	column.align
																}
															>
																{column.id !=
																	'apply' &&
																	value}
																{column.id ===
																	'apply' && (
																	<Button
																		id={
																			row._id
																		}
																		onClick={
																			handleRegistration
																		}
																	>
																		apply
																	</Button>
																)}
															</TableCell>
														);
													})}
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component='div'
							count={exams.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Paper>
					<ParticipatedExams />
					<PastExams />
				</>
			)}
		</>
	);
}
