import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Step 1: Download your data
      </Typography>
      <Typography variant="body2">
        On your iPhone, navigate to <b>Health</b> ➜ <b>Profile</b> ➜ <b>Export All Health Data</b>
      </Typography>
      <br />
      <Typography variant="h6" gutterBottom>
        Step 2: Upload your data to the Cloud or DropBox
      </Typography>
      <Typography variant="body2">
        However you can transfer it to a computer. May need third-party programs.
      </Typography>
      <br />
      <Typography variant="h6" gutterBottom>
        Step 3: Retrieve the file and unzip it
      </Typography>
      <Typography variant="body2">
        Attach the unzipped XML file.
      </Typography>
      <br />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '30px' }}
      >
        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            style={{ display: "none" }}
            accept="text/xml"
            style={{ display: 'none' }}
            id="raised-button-file"
          />
        </Button>
      </Grid>
    </React.Fragment>
  );
}