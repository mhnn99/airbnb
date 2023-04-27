import {Box,Typography,useTheme,useMediaQuery} from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid'
import Form from '../../components/Form/Form';
const Login = () =>{
const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
return(
    <Box>
        <AppBar position='static'>
            <Typography fontWeight='bold' fontSize='32px' color='primary' alignSelf='center'>
                NumeSite
            </Typography>
        </AppBar>

        <Box display='flex' justifyContent="center" alignItems="center" m='6rem auto'>
        <Form/>
        </Box>
    </Box>
)
}

export default Login