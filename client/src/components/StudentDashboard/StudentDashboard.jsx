import * as React from 'react';
import ParticipatedExams from './ParticipatedExams';
import PastExams from './PastExams';
import NavBar from '../Landing/NavBar';
import UpcomingExams from './UpcomingExams';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

export default function StudentDashboard() {
	const [examType, setExamType] = React.useState(
		localStorage.getItem('examType') ?? 'UpcomingExams'
	);
	const [open, setOpen] = React.useState(false);
	const examTypeMap = {
		upcomingExams: 'UpcomingExams',
		participatedExams: 'ParticipatedExams',
		pastExams: 'PastExams',
	};
	function DropDown() {
		const handleChange = (event) => {
			localStorage.setItem('examType', event.target.value);
			setExamType(event.target.value);
		};

		const handleClose = () => {
			setOpen(false);
		};

		const handleOpen = () => {
			setOpen(true);
		};

		return (
			<div>
				{/* <Button
					sx={{ display: 'block', mt: 2 }}
					onClick={handleOpen}
				>
					Open the select
				</Button> */}
				<FormControl sx={{ m: 6, minWidth: 1000 }}>
					<InputLabel id='demo-controlled-open-select-label'>
						Exam Type
					</InputLabel>
					<Select
						labelId='demo-controlled-open-select-label'
						id='demo-controlled-open-select'
						open={open}
						onClose={handleClose}
						onOpen={handleOpen}
						value={examType}
						label='exam type'
						onChange={handleChange}
					>
						<MenuItem value={'UpcomingExams'}>Upcoming</MenuItem>
						<MenuItem value={'ParticipatedExams'}>Participated</MenuItem>
						<MenuItem value={'PastExams'}>Previously Participated</MenuItem>
					</Select>
				</FormControl>
			</div>
		);
	}
	React.memo(UpcomingExams);
	React.memo(ParticipatedExams);
	React.memo(PastExams);
	return (
		<>
			<NavBar />
			<Grid
				container
				justifyContent={'center'}
				border={'none'}
			>
				<DropDown />
				{examType == examTypeMap.upcomingExams && <UpcomingExams />}
				{examType == examTypeMap.participatedExams && <ParticipatedExams />}
				{examType == examTypeMap.pastExams && <PastExams />}
			</Grid>
		</>
	);
}
