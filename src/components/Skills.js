import React from 'react';
import { Box, Typography,Grid,Chip } from '@mui/material';
import { Element } from 'react-scroll'; // Import Element from react-scroll

const Skills = () => {
    const skillsData = [
        {
          category: 'Languages and Technologies',
          skills: [{name:'Python'},{name:'SQL'},{name:'NoSQL'},{name:'R'},
                    {name:'React'},{name:'Django'}],
        },
        {
          category: 'Data Science and ML',
          skills: [{name:'Statistics'},{name:' Statistical and Predictive Modelling'},{name:'Machine Learning'},{name:'Deep Learning'},
          {name:'Keras'},{name:'Tensorflow'},{name:'PyTorch'},{name:'Computer Vision'},{name:'Natural Language Processing (NLP)'},
          {name:'LLM'},{name:'Topic Modelling'},{name:'Transformers'},{name:'Generative AI'}],
        },
        // Add more categories and skills as needed
      ];

      

  return (
    <Element name="skills" id="skills" className="element"> {/* Use the Element component to wrap your section */}
        <Box component="section" sx={{ pt: '20px', pb: '5px', px: 10 }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', textAlign: 'left', color: '#43a88a' }}>
        Skills
      </Typography>
      <Grid container spacing={1}>
        {skillsData.map((skillCategory, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              {skillCategory.category}
            </Typography>
            {skillCategory.skills.map((skill, idx) => (
              <Chip label={skill.name} key={idx} style={{ margin: '5px' }} /> // icon={skill.icon}  
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
    </Element>
  );
};

export default Skills;
