import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
export default function ContactDetails() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            label="Personal Email"
            fullWidth
            autoComplete="email"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="schoolEmail"
            label="School Email"
            fullWidth
            autoComplete="email"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Degree"
            label="Degree"
            fullWidth
            autoComplete="degree"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Branch"
            label="Branch"
            fullWidth
            autoComplete="Branch"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
                required
                label="Expected Graduation Date"
                // value={value}
                fullWidth
                onChange={()=>{}}
                format="DD-MM-YYYY"
            />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Current CPI"
            label="CPI"
            helperText="current sem CPI"
            fullWidth
            autoComplete="cpi"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}