// SignUp.jsx

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import { FormLabel, Paper } from '@mui/material';
import { deepPurple, deepOrange, grey, orange, blue } from '@mui/material/colors';
import Loader from '../Loader/Loader';
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignUp() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		role: 'student',
	});

	const handleChange = (event) => {
		// console.log("hi");
		// console.log(event.target);
		const { name, value } = event.target;
		// console.log(name, value);
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(formData);
		try {
			setIsLoading(true);
			axios
				.post(
					`${process.env.REACT_APP_BACKEND}/signup/signup/`,
					formData
				)
				.then(() => {
					console.log('User signed up successfully');
					// Redirect to login or any other page after successful signup
					setIsLoading(false);
					navigate('/login');
				})
				.catch((err) => {
					setIsLoading(false);
					console.error(err);
				});
		} catch (error) {
			setIsLoading(false);
			console.error('Error:', error);
		}
	};

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
						container
						xs={false}
						sm={4}
						md={7}
						direction={'column'}
						justifyContent='center'
						alignItems='center' // Add this line to center the content vertically
						display='flex'
						sx={
							{
								// backgroundRepeat: 'no-repeat',
								backgroundColor: blue[50],
								// backgroundSize: 'cover',
								// backgroundPosition: 'center',
							}
						}
					>
						<Grid
						item>
						<img
							src='/assets/Eye.png'
							alt='gif'
						/></Grid>
						<Grid item>
						<Typography
					variant='h6'
					noWrap
					href='#app-bar-with-responsive-menu'
					sx={{
						mr: 2,
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none',
						fontSize:'3rem',
					}}
				>
					Procto PuLsE
				</Typography>
				</Grid>
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
							
							<Typography
								component='h1'
								variant='h5'
							>
								Sign up
							</Typography>
							<Box
								component='form'
								noValidate
								// onSubmit={handleSubmit}
								sx={{ mt: 3 }}
							>
								<Grid
									container
									spacing={2}
								>
									<Grid
										item
										xs={12}
										sm={6}
									>
										<TextField
											autoComplete='given-name'
											name='firstname'
											required
											fullWidth
											color='secondary'
											id='firstname'
											label='First Name'
											autoFocus
											value={formData.firstname}
											onChange={handleChange}
										/>
									</Grid>
									<Grid
										item
										xs={12}
										sm={6}
									>
										<TextField
											required
											fullWidth
											id='lastname'
											color='secondary'
											label='Last Name'
											name='lastname'
											autoComplete='family-name'
											value={formData.lastname}
											onChange={handleChange}
										/>
									</Grid>
									<Grid
										item
										xs={12}
									>
										<TextField
											required
											fullWidth
											color='secondary'
											id='email'
											label='Email Address'
											name='email'
											autoComplete='email'
											value={formData.email}
											onChange={handleChange}
										/>
									</Grid>
									<Grid
										item
										xs={12}
									>
										<TextField
											required
											fullWidth
											color='secondary'
											name='password'
											label='Password'
											type='password'
											id='password'
											autoComplete='new-password'
											value={formData.password}
											onChange={handleChange}
										/>
									</Grid>
									<Grid
										item
										xs={12}
									>
										<FormLabel>I am a student</FormLabel>
										<Radio
											name='role'
											value='student'
											checked={formData.role == 'student'}
											onChange={handleChange}
											sx={{
												'& .MuiSvgIcon-root': {
													fontSize: 28,
												},
												color: blue[300],
												'&.Mui-checked': {
													color: deepPurple[900],
												},
											}}
										/>
										<br />
										<FormLabel>I am a teacher</FormLabel>
										<Radio
											name='role'
											value='teacher'
											checked={formData.role == 'teacher'}
											onChange={handleChange}
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
										<br />
										{/* <FormControlLabel
											control={
												<Checkbox
													value='allowExtraEmails'
													color='primary'
													style ={{
														color: "black"
													}}
												/>
											}
											label='I want to receive inspiration, marketing promotions and updates via email.'
										/> */}
									</Grid>
								</Grid>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									onClick={handleSubmit}
									sx={{ mt: 3, mb: 2 ,backgroundColor: grey[900]}}
								>
									Sign Up
								</Button>
								<Grid
									container
									justifyContent='flex-end'
								>
									<Grid
										item
										onClick={() => navigate('/login')}
									>
										<Link
											href='/login'
											variant='body2'
											sx={{ color: 'black' }}
										>
											Already have an account? Sign in
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
						</Grid>
					</Grid>
				</ThemeProvider>
			)}
		</>
	);
}
