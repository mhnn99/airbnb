import { Box, Grid, TextField } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
const DestinationInput = () =>{
return(
    <Box sx={{ p: 2, maxWidth: "sm", marginLeft: "auto", marginRight: "auto" }}>
<Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={4}>
    <TextField type='date'/>
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
    <TextField type='search' variant='outlined' label='Where to?'/>
    </Grid>
    </Grid>
    </Box>)
}

export default DestinationInput