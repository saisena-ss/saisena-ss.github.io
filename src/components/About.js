import React from 'react';
import { Box, Typography, Container,Grid,Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import profileImage from '../images/MyImage.jpg';
import GetAppIcon from '@mui/icons-material/GetApp'; // Import download icon
import { Element } from 'react-scroll'; // Import Element from react-scroll

const AboutMe = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const resumeLink = '/resume.pdf'; // Update with the path to your resume


  return (
    <Element name="about" id="about" className="element"> {/* Use the Element component to wrap your section */}
        <Box component="section" id="about" sx={{ pt: '50px', pb: '5px', px: 10 }}>
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
                        Hi, I'm Sai Sena. I’m a [Your Profession] with a passion for [Your Interests]. Currently, I'm focused on [Your Current Project or Field of Study]. I have [Number] years of experience in [Your Skills or Industry]. When I’m not working, I enjoy [Your Hobbies].
                        {/* Add more personal details or a professional story here */}
                        I'm always looking for new challenges and opportunities to grow. Please feel free to reach out to discuss collaborations or potential projects.
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
            </Grid>
        </Box>
    </Element>
  );
};

export default AboutMe;
