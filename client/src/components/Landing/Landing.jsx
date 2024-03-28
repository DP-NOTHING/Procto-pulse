import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import NavBar from './NavBar';
import Lottie from 'react-lottie';
import animationData from '../../lotties/Animation - 1711626276447.json';

export default function Landing() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
		  preserveAspectRatio: "xMidYMid slice"
		}
	  };
	const navigate = useNavigate();
	return (
		<div>
			
			<NavBar />
			<div style={{ position: 'relative' }}>
				<Lottie 
					options={defaultOptions}
					height={400}
					style={{margin: '2%',borderRadius: '34px',width:'auto'}}
				/>
				<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black' }}>
				<h1 style={{ textAlign: 'center', fontSize: '3em' }}>Welcome to Procto PuLsE</h1>
			<h3 style={{ textAlign: 'center' }}>No room for tricks, just honest clicks</h3>
				</div>
				
			</div>
			<Stack gap={5}>
				<Stack
					spacing={2}
					alignItems='center'
				>
					<Grid
						container
						// className={classes.root}
						style={{
							height: 'auto',
						}}
					>
						<Grid
							container
							sm={6}
							xs={12}
						>
							<Grid
								container
								style={{ padding: '20%' }}
							>
								<Grid
									itemP
									sm={12}
									xs={12}
								>
									<Typography
										variant='h3'
										color='textPrimary'
										gutterBottom
									>
										Exam Security.
										<br />
										Done Right.
										<h5>Deter. Detect. Prevent.</h5>
									</Typography>
									<Typography
										variant='h5'
										paragraph
									>
										<p>
										Welcome to our Auto Exam Proctoring platform, a cutting-edge solution designed to maintain the integrity of online examinations. We leverage advanced technology to monitor exam takers, ensuring a fair and secure testing environment for all participants.
										</p>
									</Typography>
								</Grid>
							</Grid>
						</Grid>

						<Grid
							container
							sm={6}
							xs={12}
						>
							<Grid
								container
								style={{ padding: '20%' }}
							>
								<Grid
									item
									sm={12}
									xs={12}
								>
									<img src='/assets/3d-business-man-studying-online.png' />
								</Grid>
							</Grid>
						</Grid>
					</Grid>

				</Stack>
			</Stack>
		</div>
	);
	// return (
	// 	<>
	// 		<NavBar />
	// 		<section>
	// 			<Grid
	// 				container
	// 				spacing={2}
	// 				rows={16}
	// 				// rowSpacing={1}
	// 				// rowSpacing={{ xs: 1, sm: 2, md: 3 }}
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
