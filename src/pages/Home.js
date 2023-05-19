import logo from './../logo.svg';
import './../App.css';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Grid container >
          <Grid >
            <Button variant="contained" size="large"><Link to="/artist">Artist</Link></Button>
          </Grid>
          <Grid>
            <Button variant="contained" size="large"><Link to="/album">Album</Link></Button>
          </Grid>
          <Grid>
            <Button variant="contained" size="large"><Link to="/song">Song</Link></Button>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default Home;
