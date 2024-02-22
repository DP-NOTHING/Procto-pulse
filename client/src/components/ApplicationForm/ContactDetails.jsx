import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
export default function ContactDetails({ formData, setFormData }) {
	const branch = [
		{
			value: 'Computer Science',
			label: 'Computer Science',
		},
		{
			value: 'Information Technology',
			label: 'Information Technology',
		},
		{
			value: 'EC',
			label: 'EC',
		},
	];
	const degree = [
		{
			value: 'B.tech pursuing',
			label: 'B.tech pursuing',
		},
		{
			value: 'B.tech',
			label: 'B.tech',
		},
		{
			value: 'M.tech pursuing',
			label: 'M.tech pursuing',
		},
		{
			value: 'M.tech',
			label: 'M.tech',
		},
	];
	return (
		<React.Fragment>
			<Typography
				variant='h6'
				gutterBottom
			>
				Contact Information
			</Typography>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					xs={12}
					md={6}
				>
					<TextField
						required
						id='email'
						label='Personal Email'
						fullWidth
						autoComplete='email'
						variant='standard'
						value={localStorage.getItem('email')}
						inputProps={{ readOnly: true }}
						onChange={(e) => {
							setFormData({
								...formData,
								personalEmail: e.target.value,
							});
						}}
						disabled
						// value={formData.personalEmail}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<TextField
						id='schoolEmail'
						label='School Email'
						fullWidth
						autoComplete='email'
						variant='standard'
						onChange={(e) => {
							setFormData({
								...formData,
								schoolEmail: e.target.value,
							});
						}}
						value={formData.schoolEmail}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<TextField
						required
						id='Degree'
						select
						label='Degree'
						fullWidth
						variant='standard'
						onChange={(e) => {
							setFormData({
								...formData,
								degree: e.target.value,
							});
						}}
						value={formData.degree}
					>
						{degree.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}
							>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<TextField
						required
						id='Branch'
						select
						label='Branch'
						fullWidth
						variant='standard'
						onChange={(e) => {
							setFormData({
								...formData,
								branch: e.target.value,
							});
						}}
						value={formData.branch}
					>
						{branch.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}
							>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					{/* <label id='grad date'></label> */}
					<label style={{ color: '#7F7F7F' }}>
						Expected Graduation Date
					</label>
					<br />
					<br />
					<TextField
						type='date'
						// fullWidth
						value={formData.graduationDate}
						onChange={(e) => {
							console.log(e);
							setFormData({
								...formData,
								graduationDate: e.target.value,
								// graduationDate: new Date(
								// 	e['$y'],
								// 	e['$m'],
								// 	e['']
								// ),
							});
						}}
					/>
					{/* </TextField> */}
					{/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
					{/* <DateField
						required
						label='Expected Graduation Date'
						// value={value}
						fullWidth
						id='grad date'
						type='date'
						// onChange={()=>{}}
						// format='DD-MM-YYYY'
						onChange={(e) => {
							console.log(e);
							setFormData({
								...formData,
								graduationDate: new Date(
									e['$y'],
									e['$m'],
									e['']
								),
							});
						}}
						value={formData.graduationDate}
					/> */}
					{/* </LocalizationProvider> */}
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<TextField
						required
						id='Current CPI'
						label='CPI'
						helperText='current sem CPI'
						fullWidth
						type='number'
						autoComplete='cpi'
						variant='standard'
						onChange={(e) => {
							setFormData({
								...formData,
								cpi: e.target.value,
							});
						}}
						value={formData.cpi}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
