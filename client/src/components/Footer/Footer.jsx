import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';

import { Paper } from '@mui/material';

const useStyles = makeStyles(({ typography, palette, breakpoints }) => ({
  legalLink: {
    ...typography.caption,
    justifyContent: 'center',
    color:
      palette.type === 'dark'
        ? 'rgba(255,255,255,0.57)'
        : palette.text.secondary,
    position: 'relative',
    [breakpoints.up('sm')]: {
      '&:not(:first-of-type)': {
        '&:before': {
          content: '"|"',
          display: 'block',
          position: 'absolute',
          left: 0,
        },
      },
    },
  },
  navMenu: {
    flexWrap: 'wrap',
  }
}));




const Footer = React.memo(function NeptuneAppFooter() {
  const classes = useStyles();
  return (
    <Paper sx={{marginTop: 'calc(10% + 60px)',
    width: '100%',
    position: 'static',
    bottom: 0,
    width: '100%',
    border: "none",
    }} component="footer" square variant="outlined">
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography color="initial" align='center'>
            Copyright ©2023. [MihneaRazvanAlex] Limited
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
});

export default Footer;