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
const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function UploadDoc() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload Documents
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ImageList>

            <ImageListItem key="1">
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
            type="file"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ImageListItem key="2" >
            <img
              // srcSet==164&h=164&fit=crop&auto=format&dpr=2 2x`}
              style={{maxWidth: '304px'}}
              src={Document}
              alt='document'
            // loading="lazy"
            />
            
            <Input
              required
              type="file"
            />
          </ImageListItem>
          Upload Adhar Card/Driving License
        </Grid>

      </Grid>
    </React.Fragment>
  );
}