
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import WelcomePage from './pages/WelcomePage';
import { themeSettings } from './theme';
import {createTheme} from '@mui/material/styles'
import { CssBaseline, ThemeProvider } from '@mui/material';
import Login from './pages/LoginPage/Login';
import { useSelector } from 'react-redux';
import ListingsPage from './pages/ListingsPage/ListingsPage';
import Account from './components/Account/Account';
import ListingPage from './pages/ListingPage/ListingPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ReviewModal from './components/ReviewModal/ReviewModal';

function App() {
  const mode = useSelector(state=>state.mode)
  const theme = createTheme(themeSettings(mode))
  return (
   <BrowserRouter>
   <ThemeProvider theme={theme}>
    <CssBaseline/>
    <LocalizationProvider dateAdapter={AdapterDayjs}>   
   <Routes>
    <Route path='/' element={<WelcomePage/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path ='/locations/:city' element={<ListingsPage/>}/>
    <Route path = '/account' element={<Account/>}/>
    <Route path ='/location/:id' element={<ListingPage/>}/>
   </Routes>
    <ReviewModal/>
    </LocalizationProvider>
   </ThemeProvider>
   </BrowserRouter>
  );
}

export default App;
