// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import gif from '../../images/Exams.gif';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { deepPurple, deepOrange } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { FormLabel } from '@mui/material';
import Loader from '../Loader/Loader';

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{'Copyright © '}
			<Link
				color='inherit'
				href='https://mui.com/'
			>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [valerror, setvalerror] = useState('');
	const [role, setRole] = useState('student');
	const [isLoading, setIsLoading] = useState(false);
	const Navigate = useNavigate();
	// const { setToken } = useAuth();
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email);
		console.log(password);

		if (email == '') {
			setvalerror('please enter a username');
		} else if (password == '') {
			setvalerror('please enter a password');
		} else if (role == '') {
			setvalerror('please choose appropriate role');
		} else {
			console.log(process.env.REACT_APP_BACKEND);
			setIsLoading(true);
			axios
				.post(`${process.env.REACT_APP_BACKEND}/login/login`, {
					email,
					password,
					role,
				})
				.then((res) => {
					localStorage.setItem('email', email);
					localStorage.setItem('token', res.data.token);
					localStorage.setItem('role', role);	
					setIsLoading(false);
					// setToken(res.data.token);
					// console.log('----------');
					// console.log(res.response.status);
					// setIsLogged(true);
					Navigate('/home', {
						state: {
							email,
						},
					});
				})
				.catch((res) => {
					// console.log(res.response.data);
					// alert(res.response.data.message);
					setvalerror(res.response.data.message);
				});
		}
	};
	useEffect(() => {
		if (valerror) {
			setIsLoading(false);
			alert(valerror);
			setvalerror('');
		}
	}, [valerror]);
	return (
		<>
			{isLoading && <Loader />}

			{isLoading || (
				<ThemeProvider theme={defaultTheme}>
					<Grid
						container
						component='main'
						justifyContent='center'
						sx={{ height: '100vh' }}
					>
						<CssBaseline />
						<Grid
							item
							xs={false}
							sm={4}
							md={7}
							justifyContent='center'
							alignItems='center' // Add this line to center the content vertically
							display='flex'
							sx={
								{
									// backgroundRepeat: 'no-repeat',
									// backgroundColor: (t) =>
									//   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
									// backgroundSize: 'cover',
									// backgroundPosition: 'center',
								}
							}
						>
							<img
								src={gif}
								alt='gif'
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sm={8}
							md={5}
							component={Paper}
							elevation={6}
							square
						>
							<Box
								sx={{
									my: 8,
									mx: 4,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<Avatar
									sx={{ m: 1, bgcolor: 'secondary.main' }}
								>
									<LockOutlinedIcon />
								</Avatar>
								<Typography
									component='h1'
									variant='h5'
								>
									Sign in
								</Typography>
								<Box
									component='form'
									noValidate
									// onSubmit={handleSubmit}
									sx={{ mt: 1 }}
								>
									<TextField
										margin='normal'
										required
										fullWidth
										id='email'
										label='Email Address'
										name='email'
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										autoComplete='email'
										autoFocus
									/>
									<TextField
										margin='normal'
										required
										fullWidth
										name='password'
										label='Password'
										type='password'
										id='password'
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										autoComplete='current-password'
									/>
									{/* <RadioGroup onChange={(i) => console.log(i)}> */}
									<FormLabel>student</FormLabel>
									<Radio
										value='student'
										checked={role == 'student'}
										onChange={(i) =>
											setRole(i.target.value)
										}
										sx={{
											'& .MuiSvgIcon-root': {
												fontSize: 28,
											},
											color: deepOrange[800],
											'&.Mui-checked': {
												color: deepOrange[600],
											},
										}}
									/>
									<FormLabel>teacher</FormLabel>
									<Radio
										value='teacher'
										checked={role == 'teacher'}
										onChange={(i) =>
											setRole(i.target.value)
										}
										sx={{
											'& .MuiSvgIcon-root': {
												fontSize: 28,
											},
											color: deepPurple[800],
											'&.Mui-checked': {
												color: deepPurple[600],
											},
										}}
									/>
									{/* </RadioGroup> */}
									<br />
									<FormControlLabel
										control={
											<Checkbox
												value='remember'
												color='primary'
											/>
										}
										label='Remember me'
									/>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{ mt: 3, mb: 2 }}
										onClick={handleSubmit}
									>
										Sign In
									</Button>
									<Grid container>
										<Grid
											item
											xs
										>
											<Link
												href='#'
												variant='body2'
											>
												Forgot password?
											</Link>
										</Grid>
										<Grid
											item
											onClick={() => {
												Navigate('/signup');
											}}
										>
											<Link
												href='#'
												variant='body2'
											>
												{
													"Don't have an account? Sign Up"
												}
											</Link>
										</Grid>
									</Grid>
									<Copyright sx={{ mt: 5 }} />
								</Box>
							</Box>
						</Grid>
					</Grid>
				</ThemeProvider>
			)}
		</>
	);
}