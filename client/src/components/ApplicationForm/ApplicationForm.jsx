import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import ContactDetails from './ContactDetails';
import UploadDoc from './UploadDoc';
import { useState } from 'react';
import axios from 'axios';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Address', 'Contact Deatils', 'Upload Documents'];





export default function ApplicationForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = useState({
    studentId: "",
    examId: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    university: "",
    personalEmail: "",
    schoolEmail: "",
    degree: "",
    branch: "",
    graduationDate: "",
    cpi: "",
    photo: "",
    idProof: "",
  });
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm formData={formData} setFormData={setFormData}/>;
      case 1:
        return <ContactDetails formData={formData} setFormData={setFormData}/>;
      case 2:
        return <UploadDoc formData={formData} setFormData={setFormData}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  
 
  const handleNext = () => {

    setActiveStep(activeStep + 1);
    console.log(activeStep);
    
    if(activeStep+1 == steps.length){
      // console.log(activeStep);
      const data = new FormData();
      for ( var key in  formData ) {
          data.append(key, formData[key]);
      }
      
      console.log(formData);
      for (var pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
      axios.post(`${process.env.REACT_APP_BACKEND}/applicationform/`, data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      
      }).
      then((res) => {
        console.log(res);
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Exam name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Application Form
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for submitting Application Form.
              </Typography>
              <Typography variant="subtitle1">
                Your registration no is #2001539. Please remember your application Id, Your exam will start on Date xyz.
                Best Of Luck.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        {/* <Copyright /> */}
      </Container>
    </React.Fragment>
  );
}

