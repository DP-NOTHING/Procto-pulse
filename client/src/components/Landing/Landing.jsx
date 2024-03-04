import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import NavBar from './NavBar';

export default function Landing() {

	const navigate = useNavigate();
	return (
		<div>
			
			<NavBar />
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
											Lorem ipsum dolor sit amet,
											consectetur adipisicing elit. Sint,
											itaque natus nostrum mollitia
											possimus veniam accusantium. Lorem
											ipsum dolor sit amet, consectetur
											adipisicing elit. Sint, itaque natus
											nostrum mollitia possimus veniam
											accusantium.
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
									item
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
											Lorem ipsum dolor sit amet,
											consectetur adipisicing elit. Sint,
											itaque natus nostrum mollitia
											possimus veniam accusantium. Lorem
											ipsum dolor sit amet, consectetur
											adipisicing elit. Sint, itaque natus
											nostrum mollitia possimus veniam
											accusantium.
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
									item
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
											Lorem ipsum dolor sit amet,
											consectetur adipisicing elit. Sint,
											itaque natus nostrum mollitia
											possimus veniam accusantium. Lorem
											ipsum dolor sit amet, consectetur
											adipisicing elit. Sint, itaque natus
											nostrum mollitia possimus veniam
											accusantium.
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
