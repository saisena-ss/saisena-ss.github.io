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
      name: 'Weighted Grouped Query Attention',
      description: `The Transformer architecture forms the foundation of large language models. However, with increasing 
      demands for scaling and constraints of hardware memory, the inference costs of these models remain high. To address these 
      challenges, Multi Query Attention (MQA) and Grouped Query Attention (GQA) were proposed by`, 
      image: 'images/WGQA.png',
      technologies: ['Deep Learning', 'PyTorch','Transformers'],
      githubLink: 'https://github.com/Athe-kunal/Enhancement-in-GQA',
    //   liveLink: 'https://project1live.com', // if applicable
    },

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
      {
        name: 'Speaker Verification',
        description: `Built a Siamese Network to veriy whether two speeches are spoken by the same person or different person.`,
        image: 'images/siamese.png',
        technologies: ['Deep Learning','Siamese Network','TensorFlow'],
        githubLink: 'https://github.com/saisena-ss/Speaker-Verification',
      //   liveLink: 'https://project1live.com', // if applicable
      },
      {
        name: 'Image Generation using RNN',
        description: `Generated bottom half of the MNIST digits using first half of the image utilizing LSTM.`,
        image: 'images/rnn.png',
        technologies: ['Deep Learning','RNN','Generative AI'],
        githubLink: 'https://github.com/saisena-ss/Image-Generation-using-RNN',
      //   liveLink: 'https://project1live.com', // if applicable
      },
      {
        name: 'Image Generation using GAN',
        description: `Generating realistic handwritten digits using Generative Adversarial Networks (GANs), specifically trained on the MNIST dataset.`,
        image: 'images/gan.png',
        technologies: ['Deep Learning','GAN','Generative AI'],
        githubLink: 'https://github.com/saisena-ss/Image-Generation-using-GAN',
      //   liveLink: 'https://project1live.com', // if applicable
      },
  ];

  return (
    <Element name="projects" id="projects" className="element"> {/* Use the Element component to wrap your section */}
  <Box component="section" sx={{ pt: '20px', pb: '5px', px: 10,mb:5}}>
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
