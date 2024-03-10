import React from 'react';
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
export default function UpcomingExams() {
	const Navigate = useNavigate();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [exams, setExams] = React.useState([]);
	// const [participatedExams, setParticipatedExams] = React.useState([]);
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
				console.log('herrry');
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND}/exam/`,
					{
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
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
				setExams(
					response?.data
						.filter(
							(e) =>
								!e.participants.includes(localStorage.getItem('id')) &&
								new Date(e.testDateTime) > new Date()
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
				// setParticipatedExams(
				// 	response.data
				// 		.filter((e) => e.participants.includes(localStorage.getItem('id')))
				// 		.map((e) => {
				// 			// console.log(e.participants.length);
				// 			return {
				// 				...e,
				// 				'participants': e.participants.length,
				// 				'examDate': new Date(e.testDateTime)
				// 					.toLocaleString()
				// 					.split(',')[0],
				// 				'startTime': new Date(e.testDateTime)
				// 					.toLocaleString()
				// 					.split(',')[1],
				// 			};
				// 		})
				// );
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
					{exams.length == 0 && (
						<Table
							stickyHeader
							aria-label='sticky table'
							sx={{ border: 'none' }}
						>
							<TableHead sx={{ border: 'none' }}>
								<TableRow sx={{ border: 'none' }}>
									<TableCell
										align='center'
										colSpan={12}
										sx={{ border: 'none' }}
									>
										<h3>nothing to show</h3>
									</TableCell>
								</TableRow>
							</TableHead>
						</Table>
					)}
					{exams.length != 0 && (
						<Paper
							sx={{ width: '100%' }}
							elevation={false}
						>
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
												<h3></h3>
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
													{column.label != 'Apply' && column.label}
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
															const value = row[column.id];
															return (
																<TableCell
																	key={column.id}
																	align={column.align}
																>
																	{column.id != 'apply' && value}
																	{column.id === 'apply' && (
																		<Button
																			id={row._id}
																			onClick={handleRegistration}
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
					)}
				</>
			)}
		</>
	);
}
