import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { blue, green, grey, orange, purple } from '@mui/material/colors';
const defaultTheme = createTheme();
export default function Offline() {

  return (

//     <div style={{"backgroundColor":orange[50],"position":"relative","display":"flex","flexWrap":"wrap","justifyContent":"center"}}>
//       <Grid item>
//                 <img src="/assets/Eye.png" alt="gif" />
                
//               </Grid>
//               <Grid item>
//                 <Typography
//                   variant="h6"
//                   noWrap
//                   href="#app-bar-with-responsive-menu"
//                   sx={{
//                     mr: 2,
//                     display: { xs: "none", md: "flex" },
//                     fontFamily: "monospace",
//                     fontWeight: 700,
//                     letterSpacing: ".3rem",
//                     color: "inherit",
//                     textDecoration: "none",
//                     fontSize: "3rem",
//                   }}
//                 >
//                   Procto PuLsE
//                 </Typography>
//               </Grid>
//     <div style={{"display":"grid","gridTemplateRows":"1fr","gridTemplateColumns":"600px 600px","alignItems":"center","height":"35rem","justifyItems":"end"}}>
//         <div style={{"zIndex":"1","position":"relative"}}>
//               <span style={{"fontSize":"100px","color":"white","fontWeight":"930","whiteSpace":"pre-line","lineHeight":"1","letterSpacing":"9px"}}>
//                Offline ! ! 
//               </span>
//           <p style={{fontSize:'20px',color:"white"}}>Please Connect to the internet.</p>
     
//      </div>
//       <div class="img">
//            {/* <img src="https://drive.google.com/uc?export=view&id=1GRb9IdgxcaSaTmJ9wGXSWtwhAvDQn5qG" /> */}
//      </div>
//   </div>
// </div> 
<ThemeProvider theme={defaultTheme}>
<Grid
  container
  component="main"
  justifyContent="center"
  sx={{ height: "100vh" }}
>
  <CssBaseline />
  <Grid
    container
    xs={false}
    sm={4}
    md={7}
    direction={"column"}
    justifyContent="center"
    alignItems="center" // Add this line to center the content vertically
    display="flex"
    sx={{
      backgroundColor: green[100],
    }}
  >
    <Grid item>
      <img src="/assets/Eye.png" alt="gif" />
    </Grid>
    <Grid item>
      <Typography
        variant="h6"
        noWrap
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          fontSize: "3rem",
        }}
      >
        Procto PuLsE
      </Typography>
    </Grid>
  </Grid>
  <Grid
    item
    xs={12}
    sm={8}
    md={5}
    component={Paper}
    elevation={6}
    sx={{
      backgroundColor:blue[100],
    }}
    square
  >
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
      }}
    >
      <Typography component="h1" variant="h2">
        You are Offline.

        Please Connect to the internet
      </Typography>
     
    </Box>
  </Grid>
</Grid>
</ThemeProvider>

  )
}
