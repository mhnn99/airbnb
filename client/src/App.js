
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import WelcomePage from './pages/WelcomePage';
import { themeSettings } from './theme';
import {createTheme} from '@mui/material/styles'
import { CssBaseline, ThemeProvider } from '@mui/material';
import Login from './pages/LoginPage/Login';
import { useSelector } from 'react-redux';

function App() {
  const mode = useSelector(state=>state.mode)
  const theme = createTheme(themeSettings(mode))
  return (
   <BrowserRouter>
   <ThemeProvider theme={theme}>
    <CssBaseline/>
   <Routes>
    <Route path='/' element={<WelcomePage/>}/>
    <Route path='/login' element={<Login/>}/>
   </Routes>
   </ThemeProvider>
   </BrowserRouter>
  );
}

export default App;
