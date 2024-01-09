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
// import { Segment, Grid, GridColumn, GridRow } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';

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
			<section>
				<Grid
					container
					// spacing={2}
					// columns={16}
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					// overflow={'hidden'}
				>
					<Grid
						p={2}
						mt={2}
						xs={6}
					>
						<ListItem style={{ fontSize: '30px', padding: '13%' }}>
							<div>
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
						</ListItem>
					</Grid>
					<Grid
						xs={6}
						p={2}
						mt={2}
					>
						<ListItem
						// style={{
						// 	paddingLeft: '10%',
						// 	paddingRight: '20%',
						// 	paddingTop: '3%',
						// }}
						>
							<img
								src='/assets/3d-business-man-studying-online.png'
								height={800}
								width={600}
								alt=''
							/>
						</ListItem>
					</Grid>
					<Grid
						item
						xs={6}
						p={2}
						mt={2}
					>
						<ListItem
						// style={{
						// 	// paddingLeft: '10%',
						// 	// paddingRight: '20%',
						// 	paddingTop: '3%',
						// }}
						>
							<img
								src='/assets/clip-man-hitting-the-target.png'
								height={800}
								width={600}
								alt=''
							/>
						</ListItem>
					</Grid>
					<Grid
						p={2}
						mt={2}
						xs={6}
					>
						<ListItem
							style={{
								fontSize: '30px',
								padding: '13%',
							}}
						>
							<div>
								<h1>Our Mission</h1>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Sint, itaque natus nostrum
									mollitia possimus veniam accusantium. Lorem
									ipsum dolor sit amet, consectetur
									adipisicing elit. Sint, itaque natus nostrum
									mollitia possimus veniam accusantium.
								</p>
							</div>
						</ListItem>
					</Grid>
				</Grid>
			</section>
			<section></section>
		</>
	);
}
