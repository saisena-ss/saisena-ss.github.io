import React from 'react';
import { Box, Typography,Grid,Button,Link } from '@mui/material';
import profileImage from '../images/MyImage.jpg';
import GetAppIcon from '@mui/icons-material/GetApp'; // Import download icon
import { Element } from 'react-scroll'; // Import Element from react-scroll

const AboutMe = () => {
  const resumeLink = '/Sai_Sena_Resume.pdf'; 


  return (
    <Element name="about" id="about" className="element"> {/* Use the Element component to wrap your section */}
        <Box component="section" id="about" sx={{ pt: '70px', pb: '5px', px: 10 }}>
            <Grid container spacing={4} alignItems="center" justifyContent="flex-start">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold', textAlign: 'left',color:'#43a88a' }}>
                        About
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={profileImage} alt="Profile" style={{ borderRadius: '50%', maxWidth: '250px', height: 'auto' }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" paragraph style={{ textAlign: 'left' }}>
                    <p>Hello! I'm Sai Sena, a Master's student in Data Science at Indiana University's Luddy School of Informatics. 
                    My passion lies in Deep Learning and AI, particularly in Computer Vision and Large Language Models (LLMs).</p>
                    
                    <p>In my portfolio, you'll find projects that demonstrate my skills and enthusiasm for AI. I'm open to 
                    collaborations and eager to contribute to innovative projects in this field.</p>
                    
                    <p>If you're looking for a dedicated and skilled partner for your projects, or if you think I can assist 
                    in any way, please feel free to reach out. Let's explore the possibilities in AI together!</p>
                    </Typography>
               </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        style={{backgroundColor:'grey'}}
                        href={resumeLink}
                        target="_blank" // Opens the link in a new tab
                        rel="noopener noreferrer" // Prevents potential security issues
                        startIcon={<GetAppIcon />}>
                        
                        Download Resume
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h2" style={{ fontWeight: 'bold', textAlign: 'left' }}>
                    Contact Me
                    </Typography>
                    <Typography variant="body1" style={{ textAlign: 'left' }}>
                    Email: <Link>saischin@iu.edu</Link><br/>
                    Phone: +1 812-778-5149<br />
                    LinkedIn: <Link href="https://www.linkedin.com/in/sai-sena-chinnakonduru-459a22110/" target="_blank" rel="noopener noreferrer">Sai Sena chinnakonduru</Link><br />
                    GitHub: <Link href="https://github.com/saisena-ss" target="_blank" rel="noopener noreferrer">saisena-ss</Link><br />
                    Portfolio: <Link href="https://saisena-ss.github.io/" target="_blank" rel="noopener noreferrer">https://saisena-ss.github.io/</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    </Element>
  );
};

export default AboutMe;
