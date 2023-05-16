import { Typography } from "@mui/material";
import React from "react";
import Box from "@mui/material";
import Container from "@mui/material";
import { ColumnToRow, Item } from '@mui-treasury/components/flex';
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';


export default Footer = () => {
    return(<>
    <Box px={2} py={3} className={classes.bottom}>
          <Container disableGutters>
            <ColumnToRow
              at={'md'}
              columnStyle={{ alignItems: 'center' }}
              rowStyle={{ alignItems: 'unset' }}
            >
              <Item grow ml={-2} shrink={0}>
                <NavMenu useStyles={usePlainNavigationMenuStyles}>
                  <ColumnToRow at={'sm'}>
                    <NavItem className={classes.legalLink}>
                      <Font>Terms & Conditions</Font>
                    </NavItem>
                    <NavItem className={classes.legalLink}>
                      <Font>Privacy Policy</Font>
                    </NavItem>
                    <NavItem className={classes.legalLink}>
                      <Font>Sitemap</Font>
                    </NavItem>
                  </ColumnToRow>
                </NavMenu>
              </Item>
              <Item>
                <Box py={1} textAlign={{ xs: 'center', md: 'right' }}>
                  <Typography
                    component={'p'}
                    variant={'caption'}
                    color={'textSecondary'}
                  >
                    <Font index={1}>
                      Designed by Anonymous © Fake Studio 2020 All right
                      reserved
                    </Font>
                  </Typography>
                </Box>
              </Item>
            </ColumnToRow>
          </Container>
        </Box>
    
    </>)
}