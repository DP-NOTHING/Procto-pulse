// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Countdown from 'react-countdown';
// export default function Bar({ startTime, exam }) {
// 	console.log(startTime, exam);
// 	return (
// 		// <Box sx={{ flexGrow: 1 }}>
// 		<AppBar position='sticky'>
// 			<Toolbar>
// <IconButton
// 	size='large'
// 	edge='start'
// 	color='inherit'
// 	aria-label='menu'
// 	sx={{ mr: 2 }}
// >
// 	<MenuIcon />
// </IconButton>
// <Typography
// 	variant='h6'
// 	component='div'
// 	sx={{ flexGrow: 1 }}
// >
// 	{exam.examName}
// </Typography>
// <Button
// 	color='secondary'
// 	variant='filled'
// >
// 	<span>
// 		Time Left{' '}
// 		<Countdown
// 			renderer={({
// 				completed,
// 				formatted: { days, hours, minutes, seconds },
// 			}) => {
// 				if (!completed)
// 					return hours ? (
// 						<span>
// 							{hours} : {minutes} : {seconds}
// 						</span>
// 					) : (
// 						<span>
// 							{minutes} : {seconds}
// 						</span>
// 					);
// 			}}
// 			date={
// 				startTime +
// 				exam.testTime *
// 					60 *
// 					60 *
// 					1000 /* as exam.testTime is number of hours and startTime is time at which student started exam */
// 			}
// 		/>
// 	</span>
// </Button>
// 			</Toolbar>
// 		</AppBar>
// 		// </Box>
// 	);
// }
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Countdown from 'react-countdown';
import Button from '@mui/material/Button';
import QuizIcon from '@mui/icons-material/Quiz';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuestionPaper from './QuestionPaper';
import ResponseArea from './ResponseArea';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import AlertDialog from './AlertDialog';

const drawerWidth = 240;

export default function Bar(props) {
	const [isLoading, setIsLoading] = React.useState(false);
	const Navigate = useNavigate();
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const buttonProps = (value) => ({
		selected: selectedIndex === value,
		onClick: () => setSelectedIndex(value),
	});
	const [dialog, setDialog] = React.useState(null);
	const { window, startTime, exam, setShowResponse, showResponse } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [isClosing, setIsClosing] = React.useState(false);
	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};
	const submitResponse = async (confirm) => {
		if (confirm) {
			const studentId = localStorage.getItem('id');
			const examId = exam._id;
			setIsLoading(true);
			axios
				.post(`${process.env.REACT_APP_BACKEND}/exam-response`, {
					response: localStorage.getItem('content'),
					examId,
					studentId,
				})
				.then((res) => {
					// console.log(res.data);
					localStorage.removeItem('content');
					Navigate('/submit-response');
					setDialog(null);
					setIsLoading(false);
				})
				.catch((err) => {
					alert(err);
					setDialog(null);
					setIsLoading(false);
				});
		} else {
			setDialog(null);
			setIsLoading(false);
		}
	};
	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				{['Question Paper', 'Response' /* , 'Send email', 'Drafts' */].map(
					(text, index) => (
						<ListItem
							key={text}
							id={text}
							sx={{ p: 1 }}
							// disablePadding
							onClick={(e) => {
								e.currentTarget.id == 'Question Paper'
									? setShowResponse(false)
									: setShowResponse(true);
								// console.log(e.currentTarget.id);
							}}
						>
							<ListItemButton {...buttonProps(index)}>
								<ListItemIcon>
									{index % 2 === 0 ? <QuizIcon /> : <QuestionAnswerIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					)
				)}
			</List>
			<Divider />
			{/* <List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem
						key={text}
						disablePadding
					>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List> */}
			<Button
				variant='outlined'
				color='success'
				sx={{ m: 1, mb: -150 }}
				onClick={() =>
					setDialog('sure you want to submit the response and end the exam?')
				}
			>
				submit response and end the exam
			</Button>
		</div>
	);

	// Remove this const when copying and pasting into your project.
	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<>
			{isLoading && <Loader />}
			{!isLoading && (
				<Box sx={{ display: 'flex' }}>
					<CssBaseline />
					<AppBar
						position='fixed'
						sx={{
							width: { sm: `calc(100% - ${drawerWidth}px)` },
							ml: { sm: `${drawerWidth}px` },
						}}
					>
						<Toolbar>
							<IconButton
								color='inherit'
								aria-label='open drawer'
								edge='start'
								onClick={handleDrawerToggle}
								sx={{ mr: 2, display: { sm: 'none' } }}
							>
								<MenuIcon />
							</IconButton>
							{/* <Typography
						variant='h6'
						noWrap
						component='div'
					>
						Responsive drawer
					</Typography> */}
							{/* <IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton> */}
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
											/* else autosubmit on timout */ else submitResponse();
											// Navigate('/submit-response', {
											// 	state: {
											// 		examId: exam._id,
											// 		studentId: localStorage.getItem('id'),
											// 	},
											// });
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
					<Box
						component='nav'
						sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
						aria-label='mailbox folders'
					>
						{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
						<Drawer
							container={container}
							variant='temporary'
							open={mobileOpen}
							onTransitionEnd={handleDrawerTransitionEnd}
							onClose={handleDrawerClose}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
							sx={{
								display: { xs: 'block', sm: 'none' },
								'& .MuiDrawer-paper': {
									boxSizing: 'border-box',
									width: drawerWidth,
								},
							}}
						>
							{drawer}
						</Drawer>
						<Drawer
							variant='permanent'
							sx={{
								display: { xs: 'none', sm: 'block' },
								'& .MuiDrawer-paper': {
									boxSizing: 'border-box',
									width: drawerWidth,
								},
							}}
							open
						>
							{drawer}
						</Drawer>
					</Box>
					<Box
						component='main'
						sx={{
							flexGrow: 1,
							p: 3,
							width: { sm: `calc(100% - ${drawerWidth}px)` },
						}}
					>
						<Toolbar />
						<Typography paragraph>
							<QuestionPaper
								exam={exam}
								show={!showResponse}
							/>
						</Typography>
						<Typography paragraph>
							<ResponseArea show={showResponse} />
						</Typography>
						{/* <Typography paragraph>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
					dolor purus non enim praesent elementum facilisis leo vel. Risus at
					ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
					quisque non tellus. Convallis convallis tellus id interdum velit
					laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
					adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
					integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
					eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
					quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
					vivamus at augue. At augue eget arcu dictum varius duis at consectetur
					lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
					faucibus et molestie ac.
				</Typography>
				<Typography paragraph>
					Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
					ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
					elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
					sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
					mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
					risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
					purus viverra accumsan in. In hendrerit gravida rutrum quisque non
					tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
					morbi tristique senectus et. Adipiscing elit duis tristique
					sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
					eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
					posuere sollicitudin aliquam ultrices sagittis orci a.
				</Typography> */}
					</Box>
				</Box>
			)}{' '}
			{dialog && (
				<AlertDialog
					dialogContent={dialog}
					type={'Confirm Submission'}
					handler={submitResponse}
				/>
			)}
		</>
	);
}

Bar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * Remove this when copying and pasting into your project.
	 */
	window: PropTypes.func,
};
