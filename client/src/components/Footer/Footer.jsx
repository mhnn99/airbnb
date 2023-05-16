import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { ColumnToRow, Row, Item } from '@mui-treasury/components/flex';
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';
import { usePlainNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/plain';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';


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
    <div className='footer'>
      <Box width={'100%'}>
        <Container>
          <Box pt={8} pb={2}>
            <Row wrap>
              <Item grow={2}>
                <NavMenu className="navMenu">
                    <NavItem>About</NavItem>
                    <NavItem>Customer Care</NavItem>
                    <NavItem>Services</NavItem>
                </NavMenu>
              </Item>
              <Item className='socialMedia'>
                <Box textAlign={'center'}>
                  <FacebookIcon sx={{color: "white"}}/>
                  <InstagramIcon sx={{color: "white"}}/>
                  <TwitterIcon sx={{color: "white"}}/>
                </Box>
              </Item>
            </Row>
          </Box>
          <Box className='bottom-text'>
            <Typography>
                Designed by Anonymous © Fake Studio 2023 All right reserved
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
});

export default Footer;