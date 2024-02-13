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
import { FormLabel } from '@mui/material';
import { deepPurple, deepOrange } from '@mui/material/colors';
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
					<Container
						component='main'
						maxWidth='xs'
					>
						<CssBaseline />
						<Box
							sx={{
								marginTop: 8,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
								<LockOutlinedIcon />
							</Avatar>
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
												color: deepOrange[800],
												'&.Mui-checked': {
													color: deepOrange[600],
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
										<FormControlLabel
											control={
												<Checkbox
													value='allowExtraEmails'
													color='primary'
												/>
											}
											label='I want to receive inspiration, marketing promotions and updates via email.'
										/>
									</Grid>
								</Grid>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									onClick={handleSubmit}
									sx={{ mt: 3, mb: 2 }}
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
											href='#'
											variant='body2'
										>
											Already have an account? Sign in
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Container>
				</ThemeProvider>
			)}
		</>
	);
}
