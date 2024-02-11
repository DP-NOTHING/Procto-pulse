import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TextareaAutosize } from '@mui/base';
export default function AddressForm({ formData, setFormData}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Applicant Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => {
              setFormData({
                ...formData,
                firstName: e.target.value,
              });
            }}
            value={formData.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => {
              setFormData({
                ...formData,
                lastName: e.target.value,
              });
            }}
            value={formData.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            minRows={2}
            multiline
            autoComplete="shipping address-line1"
            onChange={(e) => {
              setFormData({
                ...formData,
                address: e.target.value,
              });
            }}
            value={formData.address}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(e) => {
              setFormData({
                ...formData,
                city: e.target.value,
              });
            }}
            value={formData.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setFormData({
                ...formData,
                state: e.target.value,
              });
            }}
            value={formData.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={(e) => {
              setFormData({
                ...formData,
                zip: e.target.value,
              });
            }}
            value={formData.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={(e) => {
              setFormData({
                ...formData,
                country: e.target.value,
              });
            }}
            value={formData.country}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="university"
            name="university"
            label="University"
            fullWidth
            autoComplete="University name"
            variant="standard"
            onChange={(e) => {
              setFormData({
                ...formData,
                university: e.target.value,
              });
            }}
            value={formData.university}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}