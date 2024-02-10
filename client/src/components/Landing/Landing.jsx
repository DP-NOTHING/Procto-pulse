import * as React from 'react';
import NavBar from './NavBar';
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
import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme, textAlign }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign,
	color: theme.palette.text.secondary,
}));

export default function Landing() {
	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	const data = new FormData(event.currentTarget);
	// 	console.log({
	// 		email: data.get('email'),
	// 		password: data.get('password'),
	// 	});
	// };
	const navigate = useNavigate();
	return (
		<>
			<NavBar />
			<Box sx={{ width: '100%' }}>
				<Grid
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				>
					<Grid
						display={'flex'}
						item
						xs={6}
					>
						<Item textAlign='left'>
							<div style={{ fontSize: '30px', color: 'black' }}>
								<h1>
									Exam Security.
									<br />
									Done Right.
								</h1>
								<h4>Deter. Detect. Prevent.</h4>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Sint, itaque natus nostrum
									mollitia possimus veniam accusantium. Lorem
									ipsum dolor sit amet, consectetur
									adipisicing elit. Sint, itaque natus nostrum
									mollitia possimus veniam accusantium.
								</p>
							</div>
						</Item>
					</Grid>
					<Grid
						item
						xs={6}
						display={'flex'}
					>
						<Item textAlign='center'>
							<img
								src='/assets/3d-business-man-studying-online.png'
								height={800}
								width={600}
								// style={{
								// 	maxWidth: '100%',
								// 	height: 'auto',
								// 	padding: '0',
								// 	margin: '0',
								// 	height: '100%',
								// 	width: '100%',
								// }}
								alt=''
							/>
						</Item>
					</Grid>
					<Grid
						display={'flex'}
						item
						xs={6}
					>
						<Item textAlign='left'>
							<div style={{ fontSize: '30px', color: 'black' }}>
								<h1>
									Exam Security.
									<br />
									Done Right.
								</h1>
								<h4>Deter. Detect. Prevent.</h4>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Sint, itaque natus nostrum
									mollitia possimus veniam accusantium. Lorem
									ipsum dolor sit amet, consectetur
									adipisicing elit. Sint, itaque natus nostrum
									mollitia possimus veniam accusantium.
								</p>
							</div>
						</Item>
					</Grid>
					<Grid
						item
						xs={6}
						display={'flex'}
					>
						<Item textAlign='center'>
							<img
								src='/assets/3d-business-man-studying-online.png'
								height={800}
								width={600}
								alt=''
							/>
						</Item>
					</Grid>
					{/* <Grid
						item
						xs={6}
						display={'flex'}
					>
						<Item textAlign='center'>
							3{' '}
							<Box
								component={'img'}
								height={400}
								width={300}
								src='/assets/clip-man-hitting-the-target.png'
							></Box> */}
					{/* <img
								src='/assets/clip-man-hitting-the-target.png'
								height={800}
								width={600}
								alt=''
							/> */}
					{/* </Item>
					</Grid>
					<Grid
						item
						xs={6}
						display={'flex'}
					>
						<Item textAlign='right'>
							4{' '}
							<ListItem
								style={{
									fontSize: '30px',
									color: 'black',
								}}
							>
								<div>
									<h1>Our Mission</h1>
									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipisicing elit. Sint, itaque natus
										nostrum mollitia possimus veniam
										accusantium. Lorem ipsum dolor sit amet,
										consectetur adipisicing elit. Sint,
										itaque natus nostrum mollitia possimus
										veniam accusantium.
									</p>
								</div>
							</ListItem>
						</Item>
					</Grid> */}
				</Grid>
			</Box>
		</>
	);
	// return (
	// 	<>
	// 		<NavBar />
	// 		<section>
	// 			<Grid
	// 				container
	// 				spacing={2}
	// 				columns={16}
	// 				// rowSpacing={1}
	// 				// columnSpacing={{ xs: 1, sm: 2, md: 3 }}
	// 				// overflow={'hidden'}
	// 			>
	// 				<Grid
	// 					p={2}
	// 					mt={2}
	// 					xs={6}
	// 				>
	// 					<ListItem style={{ fontSize: '30px', padding: '13%' }}>
	// <div>
	// 	<h1>
	// 		Exam Security.
	// 		<br />
	// 		Done Right.
	// 	</h1>
	// 	<h4>Deter. Detect. Prevent.</h4>
	// 	<p>
	// 		Lorem ipsum dolor sit amet, consectetur
	// 		adipisicing elit. Sint, itaque natus nostrum
	// 		mollitia possimus veniam accusantium. Lorem
	// 		ipsum dolor sit amet, consectetur
	// 		adipisicing elit. Sint, itaque natus nostrum
	// 		mollitia possimus veniam accusantium.
	// 	</p>
	// </div>
	// 					</ListItem>
	// 				</Grid>
	// 				<Grid
	// 					xs={6}
	// 					p={2}
	// 					mt={2}
	// 				>
	// 					<ListItem>
	// <img
	// 	src='/assets/3d-business-man-studying-online.png'
	// 	height={800}
	// 	width={600}
	// 	alt=''
	// />
	// 					</ListItem>
	// 				</Grid>
	// 				{/* <Grid
	// 					item
	// 					xs={6}
	// 					p={2}
	// 					mt={2}
	// 				>
	// 					<ListItem
	// 					// style={{
	// 					// 	// paddingLeft: '10%',
	// 					// 	// paddingRight: '20%',
	// 					// 	paddingTop: '3%',
	// 					// }}
	// 					>
	// <img
	// 	src='/assets/clip-man-hitting-the-target.png'
	// 	height={800}
	// 	width={600}
	// 	alt=''
	// />
	// 					</ListItem>
	// 				</Grid>
	// 				<Grid
	// 					p={2}
	// 					mt={2}
	// 					xs={6}
	// 				>
	// <ListItem
	// 	style={{
	// 		fontSize: '30px',
	// 		padding: '13%',
	// 	}}
	// >
	// 	<div>
	// 		<h1>Our Mission</h1>
	// 		<p>
	// 			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint,
	// 			itaque natus nostrum mollitia possimus veniam accusantium. Lorem
	// 			ipsum dolor sit amet, consectetur adipisicing elit. Sint, itaque
	// 			natus nostrum mollitia possimus veniam accusantium.
	// 		</p>
	// 	</div>
	// </ListItem>;
	// 				</Grid> */}
	// 			</Grid>
	// 		</section>
	// 		<section></section>
	// 	</>
	// );
}
// import NavBar from './NavBar';
// export default function Landing() {
// 	return <NavBar />;
// }
