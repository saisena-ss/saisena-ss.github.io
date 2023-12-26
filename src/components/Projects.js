import React from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent, CardMedia, Button,Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import profileImage from '../images/MyImage.jpg';
import GetAppIcon from '@mui/icons-material/GetApp'; // Import download icon
import { Element } from 'react-scroll'; // Import Element from react-scroll

const Projects = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const resumeLink = '/resume.pdf'; // Update with the path to your resume
  
  const ellipsisStyle = {
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',

    display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  };
  
  const projects = [
    {
      name: 'Network Compression using SVD',
      description: `A project employing SVD for effective neural network compression on the MNIST dataset, 
        achieving significant size reduction while maintaining....`,
      image: 'images/svd.jpg',
      technologies: ['Deep Learning', 'TensorFlow'],
      githubLink: 'https://github.com/saisena1998/Neural-Network-Compression',
    //   liveLink: 'https://project1live.com', // if applicable
    },

    {
        name: 'Speech Denoising using RNN',
        description: `Utilizing Recurrent Neural Networks to enhance speech quality by separating speech from 
        noise in audio recordings. Employing Ideal Binary Masks for spectrogram analysis, the RNN model, 
        with its simple yet effective architecture comprising LSTM layers and dropout, 
        successfully achieved an SNR of 12.36 dB, marking a significant stride in audio signal processing.`,
        image: 'images/denoising.jpg',
        technologies: ['Deep Learning','RNN','TensorFlow'],
        githubLink: 'https://github.com/saisena1998/Speech-Denoising',
      //   liveLink: 'https://project1live.com', // if applicable
      },
  ];

  return (
    <Element name="projects" id="projects" className="element"> {/* Use the Element component to wrap your section */}
  <Box component="section" sx={{ pt: '50px', pb: '5px', px: 10,mb:5}}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', textAlign: 'left', color: '#43a88a' }}>
        Projects
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{mb:2}}>
              <CardActionArea href={project.liveLink || project.githubLink} target="_blank">
                <CardMedia
                  component="img"
                  height="140"
                  image={project.image}
                  alt={project.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {project.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={ellipsisStyle}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', mt: 2 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {project.technologies.map((tech, idx) => (
                          <Chip key={idx} label={tech} size="small" />
                        ))}
                      </Box>
                      <Button size="small" color="primary" href={project.githubLink} target="_blank">
                        GitHub
                      </Button>
                    </Box>
                </CardContent>
              </CardActionArea>
              {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                
                {project.liveLink && (
                  <Button size="small" color="secondary" href={project.liveLink} target="_blank">
                    Live Demo
                  </Button>
                )}
              </Box> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Element>
  );
};
export default Projects;
