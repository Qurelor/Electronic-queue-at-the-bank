import Box from '@mui/material/Box';
import {useState} from 'react';
import {observer} from 'mobx-react-lite';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Link from '@mui/material/Link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UserStore from '../store/UserStore';

const HomePage = observer(() => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);

    function userButtonHandler() {
        navigate('/user')
    }

    function adminButtonHandler() {
        navigate('/admin')
    }

    function employeeButtonHandler() {
        navigate('/employee')
    }

    function authButtonHandler() {
        navigate('/auth')
    }

    function handleMenu(e) {
        setAnchorEl(e.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function exitButtonHandler() {
        UserStore.setIsAuth('false')
        UserStore.setRole('null')
        UserStore.setUserId('null')
        localStorage.setItem('isAuth', 'false')
        localStorage.setItem('role', 'null')
        localStorage.setItem('userId', 'null')
    }

    return (
        <Box>
            <AppBar sx={{backgroundColor: 'white', height: '70px'}}>
                <Toolbar sx={{height: '70px'}}>
                    <Link href='/' underline='none' sx={{color: 'limegreen', fontSize: '40px', fontWeight: 'bold', ':hover': {color: 'black', bgcolor: 'white'}}}>БЕЛБАНК</Link>
                    {UserStore.role == 'USER' && <Button disableRipple variant='outlined' onClick={userButtonHandler} sx={{ml: '30px', fontWeight: 'bold', border: '2px solid', color: 'limegreen', bgcolor: 'white', borderColor: 'limegreen', fontSize: 25, textTransform: 'none', ':hover': {border: '2px solid', color: 'black', borderColor: 'black', bgcolor: 'white'}}}>Заказать талон</Button>}
                    <Box sx={{display: 'flex', marginLeft: 'auto'}}>
                    {UserStore.role == 'ADMIN' && <Button disableRipple variant='outlined' onClick={adminButtonHandler} sx={{mr: '30px', fontWeight: 'bold', border: '2px solid', color: 'limegreen', bgcolor: 'white', borderColor: 'limegreen', fontSize: 25, textTransform: 'none', ':hover': {border: '2px solid', color: 'black', borderColor: 'black', bgcolor: 'white'}}}>Админ панель</Button>} 
                    {UserStore.role == 'EMPLOYEE' && <Button disableRipple variant='outlined' onClick={employeeButtonHandler} sx={{mr: '30px', fontWeight: 'bold', border: '2px solid', color: 'limegreen', bgcolor: 'white', borderColor: 'limegreen', fontSize: 25, textTransform: 'none', ':hover': {border: '2px solid', color: 'black', borderColor: 'black', bgcolor: 'white'}}}>Рабочее место</Button>}
                    {UserStore.isAuth == 'true' ?
                    <Box>
                        <IconButton
                            onClick={handleMenu}
                        >
                        <AccountCircle sx={{color: 'limegreen', fontSize: '40px'}}/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={exitButtonHandler}>Выйти</MenuItem>
                        </Menu>
                    </Box> :
                    <Button disableRipple variant='outlined' onClick={authButtonHandler} sx={{fontWeight: 'bold', border: '2px solid', color: 'limegreen', bgcolor: 'white', borderColor: 'limegreen', fontSize: 25, textTransform: 'none', ':hover': {border: '2px solid', color: 'black', borderColor: 'black', bgcolor: 'white'}}}>Войти</Button>
                    }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
});

export default HomePage;