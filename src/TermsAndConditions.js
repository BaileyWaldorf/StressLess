import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Terms from "./Terms.js"

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Accept the Terms & Conditions
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TextField
            id="standard-full-width"
            label="Terms & Conditions"
            defaultValue={Terms}
            InputProps={{
              readOnly: true,
            }}
            multiline
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={10}>
          <FormControlLabel
            control={<Checkbox color="primary" name="acceptTerms" value="yes" />}
            label="I accept the terms provided"
          />
        </Grid>
        <Grid item xs={10}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="provideData" value="yes" />}
            label="(Optional) I would like to provide my data to healthcare facilities"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}