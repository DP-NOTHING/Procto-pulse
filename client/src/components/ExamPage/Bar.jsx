import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Countdown from 'react-countdown';
export default function Bar({ startTime, exam }) {
	console.log(startTime, exam);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}
					>
						{exam.examName}
					</Typography>
					<Button
						color='secondary'
						variant='filled'
					>
						<span>
							Time Left{' '}
							<Countdown
								renderer={({
									completed,
									formatted: { days, hours, minutes, seconds },
								}) => {
									if (!completed)
										return hours ? (
											<span>
												{hours} : {minutes} : {seconds}
											</span>
										) : (
											<span>
												{minutes} : {seconds}
											</span>
										);
								}}
								date={
									startTime +
									exam.testTime *
										60 *
										60 *
										1000 /* as exam.testTime is number of hours and startTime is time at which student started exam */
								}
							/>
						</span>
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
