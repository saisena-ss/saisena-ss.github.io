import Navbar from './Navbar';
import About from './About';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';
import {Grid} from '@mui/material';

const MainPage = () => {

  return (
    <Grid>
        <Navbar/>
        <About/>
        <Experience/>
        <Skills/>
        <Projects/>
    </Grid>
  );
}

export default MainPage;
