import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Element } from 'react-scroll';

const Experience = () => {  
  // Array of experience objects for demonstration
  const experiences = [
    {
      title: 'Senior Data Scientist',
      company: '- Tredence Inc. - Bangalore, India',
      duration: 'Jan 2021 - Jul 2022',
      projects: [
        {
          name: 'Dynamic Order Management',
          points: [
            `Led a 3-person team, gathered requirements from business clients, and architected a network optimization model to recommend alternate warehouse shipments, saving $2M annually in penalties.`,
            `Built data pipelines in Azure data factory for data extraction and transformation, ensuring efficient data flow for model execution.`
          ],
        },
        {name:`Rebates Framework`,
        points:[`Developed a web tool using Flask and React to streamline the process of generating promotional campaign 
        reports, including the feature to simulate multiple scenarios, reducing manual effort from 2 days to 1 minute.`,
        `Conducted A/B (hypothesis) tests on different customer segments to find out the effectiveness of the 
        promotional campaign and communicated the results effectively to stakeholders.`]}
      ],
    },

    {
      title: 'Data Scientist',
      company: '- Tredence Inc. - Bangalore, India',
      duration: 'Jun 2019 - Dec 2020',
      projects: [
        {
          name: '',
          points: [
            `Utilized Natural Language Processing (LDA) techniques to extract themes from customer feedback, then used a 
              RandomForest classifier for sentiment analysis on these themes, contributing to a 1% increase in retention.`,
              `Optimized supply chain processes by implementing a solution to recommend appropriate SKUs in the right DCs, 
              reducing the lead time from distribution centers to stores from 13 days to 8 days.`,
              `Performed Exploratory Data Analysis using pyspark and hive on store operational metrics, to identify the metrics 
              affecting CX and provided recommendations that led to a 2% reduction in customer complaints.`,
              `Extracted and transformed data from multiple sources to publish customer satisfaction metrics using tableau 
              dashboards for data visualization, streamlining the decision-making process.`,
              `Developed an internal finance tool integrating multiple APIs to generate profitability report, using Flask and React
              which reduced the manual effort from ~1.5 days to 2 minutes.`,
              `Constructed a decision tree model to identify the metrics that are most affecting the Online Grocery Pickup 
customer’s ability to return in the next 30 days and performed sentiment analysisto get more insights, which 
helped improve customer retention by 1%.`]
        },
      ],
    },

    {
      title: 'Academic Projects',
      company: '',
      duration: '',
      projects: [
        {
          name: 'Grade 4 and 5 Math Worksheet Image Classification',
          points: [
            `Pre-processed the pdfs and converted into images to extract features using pre-trained EfficientNet.`,
            `Built hierarchical SVM on top of extracted features to classify images into containing drawing, text or no 
            text achieving 91% accuracy.`,
            `Results helped in understanding the impact of different solution strategies on the accuracy of student 
            responses in mathematics.`
            ]
        },

        {
          name: 'Optical Character Recognition',
          points: [
            ` Compared different methods of recognizing words from an image - built Naïve Bayes model to detect each 
            character independently and a Hidden Markov Model to approximate the posterior distribution.`
            ]
        },

      ],
    }
  ];

  return (
    <Element name="experience" id="experience" className="element">
      <Box component="section" sx={{ pt: '20px', pb: '5px', px: 10 }}>
        <Typography variant="h4" component="h4" gutterBottom style={{ fontWeight: 'bold', textAlign: 'left', color: '#43a88a'}}>
          Experience
        </Typography>
        <Grid container spacing={1}>
          {experiences.map((exp, index) => (
            <Grid item xs={12} key={index}>
              <Grid item xs={12} key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
              <Typography variant="h6" component="h6" style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                {exp.title} {exp.company}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" style={{ marginLeft: '0px' }}>{exp.duration}</Typography>
              </Grid>
              {exp.projects.map((project, projIdx) => (
                <div key={projIdx}>
                  {project.name && <Typography variant="subtitle2" style={{ fontWeight: 'bold'}}>
                    Project: {project.name}
                  </Typography>}
                  <ul>
                    {project.points.map((point, pointIdx) => (
                      <li key={pointIdx}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Element>
  );
};

export default Experience;
