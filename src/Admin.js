import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function MaterialTableDemo() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2019-01-19T21:11:54'));
  const [state, setState] = React.useState({
    columns: [
      { title: 'Filename', field: 'filename' },
      { title: 'Size', field: 'filesize' },
      { title: 'Date Received', field: 'date' },
      {
        title: 'Opt-In',
        field: 'optIn',
        lookup: { 34: 'Yes', 63: 'No' },
      },
    ],
    data: [
      { filename: 'export1.xml', filesize: '105 mb', date: "01/19/20", optIn: 34 },
      { filename: 'export2.xml', filesize: '109 mb', date: "01/11/20", optIn: 34 },
      { filename: 'export3.xml', filesize: '112 mb', date: "01/16/20", optIn: 63 },
      { filename: 'export4.xml', filesize: '134 mb', date: "01/16/20", optIn: 34 },
      { filename: 'export5.xml', filesize: '98 mb', date: "01/12/20", optIn: 63 },
      { filename: 'export6.xml', filesize: '196 mb', date: "01/05/20", optIn: 34 },
      { filename: 'export7.xml', filesize: '145 mb', date: "01/01/20", optIn: 34 },
      { filename: 'export8.xml', filesize: '111 mb', date: "01/04/20", optIn: 34 },
      { filename: 'export9.xml', filesize: '100 mb', date: "01/12/20", optIn: 63 },
      { filename: 'export10.xml', filesize: '93 mb', date: "01/10/20", optIn: 63 },
      { filename: 'export11.xml', filesize: '105 mb', date: "01/02/20", optIn: 34 },
    ],
  });

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <br />
      <br />
      <MaterialTable
        width="100%"
        title="Participant Data"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Beginning Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          margin="normal"
          id="date-picker-dialog"
          label="Date Of Change"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          margin="normal"
          id="time-picker"
          label="End Date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
      <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={() => {
        console.log("downloading...")
      }}
    >
      Download Data For Salesforce
    </Button>
  </div>
  );
}