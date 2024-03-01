import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
	const { dialogContent, handler, type } = props;
	// if(props)
	// console.log(props.handler);
	const confirmSubmission = type == 'Confirm Submission';
	const [open, setOpen] = React.useState(true);
	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };
	const handleYes = () => {
		handler(true);
		setOpen(false);
	};
	const handleClose = () => {
		if (!confirmSubmission) document.documentElement.requestFullscreen();
		setOpen(false);
		handler(null);
	};
	const beep =
		'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3';
	// console.log(confirmSubmission);
	if (!confirmSubmission) new Audio(beep).play();
	return (
		<>
			{/* <Button
				variant='outlined'
				onClick={handleClickOpen}
			>
				Open alert dialog
			</Button> */}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{type}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						{dialogContent}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{/* <Button onClick={handleClose}>Disagree</Button> */}
					{!confirmSubmission && (
						<Button
							onClick={handleClose}
							autoFocus
						>
							Okay
						</Button>
					)}
					{confirmSubmission && (
						<>
							{' '}
							<Button onClick={handleYes}>Yes</Button>
							<Button onClick={handleClose}>No</Button>{' '}
						</>
					)}
				</DialogActions>
			</Dialog>
		</>
	);
}
