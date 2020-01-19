import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import Login from './Login';
import MainPage from './MainPage';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        StressLess
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {

  const [screen, showScreen] = useState(false);

  function changeScreen() {
    console.log("clicked")
    showScreen(true);
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        {screen
          ? <MainPage />
          : <Login changeScreen={changeScreen}/>
        }
        {/* <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography> */}
        {/* <ProTip /> */}
        <Copyright />
      </Box>
    </Container>
  );
}
