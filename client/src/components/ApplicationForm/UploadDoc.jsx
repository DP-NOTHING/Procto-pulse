import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Input } from '@mui/base/Input';
import { Box } from '@mui/material';
import { ImageList } from '@mui/material';
import { ImageListItem } from '@mui/material';
import Avatar from '../../images/avatar.png';
import Document from '../../images/document.png';

export default function UploadDoc({ formData, setFormData }) {
	return (
		<>
			<Typography
				variant='h6'
				gutterBottom
			>
				Upload Documents
			</Typography>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					xs={12}
					sm={6}
				>
					<ImageList>
						<ImageListItem key='1'>
							<img
								// srcSet==164&h=164&fit=crop&auto=format&dpr=2 2x`}
								src={Avatar}
								alt='avatar'
								// loading="lazy"
							/>
						</ImageListItem>
					</ImageList>
					Upload your recent photo
					<Input
						required
						type='file'
						onChange={(e) => {
							setFormData({
								...formData,
								photo: e.target.files[0],
							});
						}}
						// value={formData.photo.name}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
				>
					<ImageListItem key='2'>
						<img
							// srcSet==164&h=164&fit=crop&auto=format&dpr=2 2x`}
							style={{ maxWidth: '304px' }}
							src={Document}
							alt='document'
							// loading="lazy"
						/>

						<Input
							required
							type='file'
							onChange={(e) => {
								setFormData({
									...formData,
									idProof: e.target.files[0],
								});
							}}
							// value={formData.idProof.name}
						/>
					</ImageListItem>
					Upload Adhar Card/Driving License
				</Grid>
			</Grid>
		</>
	);
}
