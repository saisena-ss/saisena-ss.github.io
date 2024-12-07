import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import logo from '../images/MyImage.jpg';
import { Link } from 'react-scroll';
import '../App.css';

const Navbar = () => {

  const handleScrollToElement = (elementId) => {
    // Assuming AppBar height is 64px
    const offset = 64;
  
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

    const linkStyle = {
        margin: '0 10px', // Add margin for spacing between links
        color: 'inherit', // Inherit the text color
        textDecoration: 'none' // Remove underline from links
      };
    
      const activeLinkStyle = {
        backgroundColor: 'white', // Set background color for active link
        color: '#43a88a', // Set text color for active link
        borderRadius: '4px', // Optional: rounded corners for the active link
        padding: '5px 10px', // Padding inside the active link
      };

  const [activeSection, setActiveSection] = useState('');
  
  useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setActiveSection('about');

    const aboutElement = document.getElementById('about');
    const experienceElement = document.getElementById('experience');
    const skillsElement = document.getElementById('skills');
    const projectsElement = document.getElementById('projects');

    if (aboutElement && experienceElement && skillsElement && projectsElement) {
      const aboutPosition = aboutElement.offsetTop;
      const experiencePosition = experienceElement.offsetTop-200;
      const skillsPosition = skillsElement.offsetTop-200;
      const projectsPosition = projectsElement.offsetTop-200;

      console.log('About position:', aboutPosition);
      console.log('Experience position:', experiencePosition);
      console.log('Skills position:', skillsPosition);
      console.log('Projects position:', projectsPosition);
      console.log(scrollPosition);
      
      
      if (
        scrollPosition < experiencePosition
      ) {
        setActiveSection('about');
      } else if (
        scrollPosition >= experiencePosition &&
        scrollPosition < skillsPosition
      ) {
        setActiveSection('experience');
      } else if (
        scrollPosition >= skillsPosition &&
        scrollPosition < projectsPosition
      ) {
        setActiveSection('skills');
      } else if (scrollPosition >= projectsPosition) {
        setActiveSection('projects');
      } else {
        setActiveSection(''); // Set to an empty string when none of the sections are active
      }
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);



  return (
    <AppBar position="sticky" style={{ background: '#43a88a', verticalAlign: 'middle' }}>
      <Toolbar>
        <img
          src={logo}
          alt="Logo"
          style={{ maxHeight: '50px', borderRadius: '50%', marginRight: '10px', verticalAlign: 'middle' }}
        />
        <Typography variant="h6" style={{ flexGrow: 1, display: 'inline', verticalAlign: 'middle' }}>
          Sai Sena
        </Typography>
        <Link
          onClick={() => handleScrollToElement('about')}
          spy={true}
          smooth={true}
          duration={500}
          className={activeSection === 'about' ? 'active-nav-link' : 'nav-link'}
          style={activeSection === 'about' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}>
          About
        </Link>
        <Link
          onClick={() => handleScrollToElement('experience')}
          spy={true}
          smooth={true}
          duration={500}
          className={activeSection === 'experience' ? 'active-nav-link' : 'nav-link'}
          style={activeSection === 'experience' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
      
        >
          Experience
        </Link>
        <Link
          onClick={() => handleScrollToElement('skills')}
          spy={true}
          smooth={true}
          duration={500}
          className={activeSection === 'skills' ? 'active-nav-link' : 'nav-link'}
          style={activeSection === 'skills' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
      
        >
          Skills
        </Link>
        <Link
          onClick={() => handleScrollToElement('projects')}
          spy={true}
          smooth={true}
          duration={500}
          className={activeSection === 'projects' ? 'active-nav-link' : 'nav-link'}
          style={activeSection === 'projects' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
      
        >
          Projects
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
