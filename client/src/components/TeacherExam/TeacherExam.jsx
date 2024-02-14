import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

export default function TeacherExam() {
	return (
		<Box sx={{ width: '100%', maxWidth: 'fit' }}>
			{' '}
			<Typography
				sx={{ mt: 4, mb: 2, ml: 4 }}
				variant='h4'
				component='div'
			>
				Icon with text
			</Typography>
			<List>
				<ListItem
					disablePadding
					secondaryAction={
						<IconButton
							edge='end'
							aria-label='delete'
						>
							<DeleteIcon />
						</IconButton>
					}
				>
					<ListItemButton>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText
							primary='Inbox'
							secondaryAction={
								<IconButton
									edge='end'
									aria-label='delete'
								>
									<DeleteIcon />
								</IconButton>
							}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem
					disablePadding
					secondaryAction={
						<IconButton
							edge='end'
							aria-label='delete'
						>
							<DeleteIcon />
						</IconButton>
					}
				>
					<ListItemButton>
						<ListItemIcon>
							<DraftsIcon />
						</ListItemIcon>
						<ListItemText
							primary='Drafts'
							secondaryAction={
								<IconButton
									edge='end'
									aria-label='delete'
								>
									<DeleteIcon />
								</IconButton>
							}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton sx={{ backgroundColor: '#F5EBFF' }}>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary='Create New Exam' />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
}
