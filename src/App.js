import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import Login from './Login';
import MainPage from './MainPage';
import Admin from './Admin';

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
  const [ad, showAdmin] = useState(false);

  function changeScreen(admin) {
    if(admin)
      showAdmin(true)
    else
      showScreen(true);
  }

  const screens = () => {
    if (screen) return <MainPage />
    else if (ad) return <Admin />
    return <Login changeScreen={changeScreen}/>
  }

  const width = () => {
    if(screen)return "sm";
    else if(ad) return "lg";
    return "sm";
  }

  return (
    <Container maxWidth={width()}>
      <Box my={4}>
        {screens()}
        {/* <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography> */}
        {/* <ProTip /> */}
        <Copyright />
      </Box>
    </Container>
  );
}
