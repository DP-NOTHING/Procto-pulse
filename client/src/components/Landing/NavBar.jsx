import CallIcon from '@mui/icons-material/Call';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import axios from 'axios';
import { useAuth } from '../../provider/authProvider';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
const pages = ['Login', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const Navigate = useNavigate()
	const { setToken } = useAuth();
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const logout = (e) => {
		e.preventDefault();
		
		axios.post(`${process.env.REACT_APP_BACKEND}/logout/`,{},{headers: {
			"Authorization": "Bearer " + localStorage.getItem('token'), //the token is a variable which holds the token
		  },}).then(() => {
			localStorage.removeItem('email');
			localStorage.removeItem('role');
			localStorage.removeItem('token');
			localStorage.removeItem('id');
			
			
			setToken();
			Navigate('/login',{ replace: true });
			// Navigate('/sign-in');
		});
	};
	return (
		<AppBar
			position='sticky'
			sx={{ bgcolor: 'rgba(0,0,0,0.65)', width: 'auto', borderRadius: 222, mt: 1, backdropFilter: 'blur(15px)' }}
			style={{ marginLeft: '15vh', marginRight: '15vh' }}
		>
			<Container>
				<Toolbar disableGutters>
					{/* <AdbIcon
						sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
					/> */}
					<Box
						component='img'
						sx={{ height: 45, paddingRight: 2 }}
						alt='Logo'
						src={'/assets/Eye.png'}
					/>

					{/* <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Eye.png" alt="Eye" width="25" height="25" /> */}
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						style={{color:'rgba(256, 256, 256, 1)'}}
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Procto PuLsE
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}
					>
						<IconButton
							size='large'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							<Link
								style={{ all: 'unset' }}
								to={'/login'}
							>
								<MenuItem
									key={'login'}
									onClick={handleCloseNavMenu}
								>
									<Typography textAlign='center'>
										login
									</Typography>
								</MenuItem>
							</Link>
							<Link
								style={{ all: 'unset' }}
								to={'/signup'}
							>
								<MenuItem
									key={'register'}
									onClick={handleCloseNavMenu}
								>
									<Typography textAlign='center'>
										register
									</Typography>
								</MenuItem>
							</Link>
							<Link
								style={{ all: 'unset' }}
								to={'/contactus'}
							>
								<MenuItem
									key={'contactus'}
									onClick={handleCloseNavMenu}
								>
									<Typography textAlign='center'>
										contact us
									</Typography>
								</MenuItem>
							</Link>
							<Link
								style={{ all: 'unset' }}
								to={'/faq'}
							>
								<MenuItem
									key={'faq'}
									onClick={handleCloseNavMenu}
								>
									<Typography textAlign='center'>
										faq
									</Typography>
								</MenuItem>
							</Link>
							<Link
								style={{ all: 'unset' }}
								to={'/login'}
							>
								<MenuItem
									key={'login'}
									onClick={handleCloseNavMenu}
								>
									<Typography textAlign='center'>
										Dashboard
									</Typography>
								</MenuItem>
							</Link>
						</Menu>
					</Box>
					{/* <AdbIcon
						sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
					/> */}
					{/* <Box
						component='img'
						sx={{ height: 54 }}
						alt='Logo'
						src={'/assets/pulse3.png'}
					/> */}
					<Typography
						variant='h5'
						noWrap
						component='a'
						href='#app-bar-with-responsive-menu'
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Procto PuLsE
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
						}}
					>
						
						<Link
							style={{ all: 'unset' }}
							to={localStorage.getItem('role') == 'teacher' ? '/teacher-dashboard' : '/student-dashboard'}
						>
							<Button
								key={'dashboard'}
								onClick={handleCloseNavMenu}
								sx={{ mx: 1, my: 2, color: 'white' }}
								endIcon={<SpaceDashboardRoundedIcon />}
							>
								Dashboard
							</Button>
						</Link>
						<Link
							style={{ all: 'unset' }}
							to={'/contactus'}
						>
							<Button
								key={'contactus'}
								onClick={handleCloseNavMenu}
								sx={{ mx: 1, my: 2, color: 'white' }}
								endIcon={<CallIcon />}
							>
								contact us
							</Button>
						</Link>
						<Link
							style={{ all: 'unset' }}
							to={'/faq'}
						>
							<Button
								key={'faq'}
								onClick={handleCloseNavMenu}
								sx={{ mx: 1, my: 2, color: 'white' }}
								endIcon={<LiveHelpIcon />}
							>
								faq
							</Button>
						</Link>

						{localStorage.getItem('id')==null?<div><Link
							style={{ all: 'unset' }}
							to={'/login'}
						>
							<Button
								key={'login'}
								onClick={handleCloseNavMenu}
								sx={{ mx: 1, my: 2, color: 'white' }}
								endIcon={<LoginIcon />}
							>
								login
							</Button>
						</Link><Link
							style={{ all: 'unset' }}
							to={'/signup'}
						>
							<Button
								key={'register'}
								onClick={handleCloseNavMenu}
								sx={{ mx: 1, my: 2, color: 'white' }}
								endIcon={<PersonAddAltIcon />}
							>
								register
							</Button>
						</Link></div>:
							<Button
								key={'logout'}
								onClick={logout}
								sx={{ mx: 1, my: 2, color: 'white' }}
								endIcon={<LogoutIcon />}
							>
								Logout
							</Button>
						}

						
						


					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								{/* <Avatar
									alt='Remy Sharp'
									src='/static/images/avatar/2.jpg'
								/> */}
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={handleCloseUserMenu}
								>
									<Typography textAlign='center'>
										{setting}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
