import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import AddUserPanel from '../panels/AddUserPanel';
import UsersPanel from '../panels/UsersPanel';
import AddBankWindowPanel from '../panels/AddBankWindowPanel';
import BankWindowsPanel from '../panels/BankWindowsPanel';
import UserStore from '../store/UserStore';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const AdminPage = () => {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showUsersPanel, setShowUsersPanel] = useState(false);
    const [showBankWindowsPanel, setShowBankWindowsPanel] = useState(false);

    function usersButtonHandler() {
        setShowUsersPanel(true)
    }

    function bankWindowsButtonHandler() {
        setShowBankWindowsPanel(true)
    }
    
    function adminButtonHandler() {
        setShowUsersPanel(false)
        setShowBankWindowsPanel(false)
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
        navigate('/')
    }


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'limegreen'}}>
            <AppBar sx={{backgroundColor: 'white', height: '70px'}}>
                <Toolbar sx={{height: '70px'}}>
                    <Link href='/' underline='none' sx={{color: 'limegreen', fontSize: '40px', fontWeight: 'bold', ':hover': {color: 'black', bgcolor: 'white'}}}>БЕЛБАНК</Link>
                    <Box sx={{display: 'flex', marginLeft: 'auto'}}>
                    <Button disableRipple variant='outlined' onClick={adminButtonHandler} sx={{mr: '30px', fontWeight: 'bold', border: '2px solid', color: 'limegreen', bgcolor: 'white', borderColor: 'limegreen', fontSize: '25px', textTransform: 'none', ':hover': {border: '2px solid', color: 'black', borderColor: 'black', bgcolor: 'white'}}}>Админ панель</Button>
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
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {showUsersPanel && 
            <Box sx={{display: 'flex', mt: '110px', width: '100%', justifyContent: 'center', bgcolor: 'limegreen', pb: '40px'}}>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Box sx={{flexDirection: 'column'}}>
                        <AddUserPanel></AddUserPanel>
                        <Box></Box>
                    </Box>
                    <Box sx={{flexDirection: 'column'}}>
                        <UsersPanel></UsersPanel>
                        <Box></Box>
                    </Box>
                </Box>
            </Box>}
            {showBankWindowsPanel && 
            <Box sx={{display: 'flex', mt: '110px', width: '100%', justifyContent: 'center', bgcolor: 'limegreen', pb: '40px'}}>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Box sx={{flexDirection: 'column'}}>
                        <AddBankWindowPanel></AddBankWindowPanel>
                        <Box></Box>
                    </Box>
                    <Box sx={{flexDirection: 'column'}}>
                        <BankWindowsPanel></BankWindowsPanel>
                        <Box></Box>
                    </Box>
                </Box>
            </Box>}
            {!showUsersPanel && !showBankWindowsPanel &&
            <Box sx={{display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Paper elevation={9} sx={{px: '40px', py: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Button disableRipple variant='outlined' onClick={usersButtonHandler} sx={{fontWeight: 'bold', border: '2px solid', color: 'limegreen', bgcolor: 'white', borderColor: 'limegreen', fontSize: 25, textTransform: 'none', width: '50vw', ':hover': {border: '2px solid', color: 'black', borderColor: 'black', bgcolor: 'white'}}}>Пользователи</Button>
                    <Button disableRipple variant='outlined' onClick={bankWindowsButtonHandler} sx={{mt: '20px', fontWeight: 'bold', border: '2px solid', color: 'limegreen', bgcolor: 'white', borderColor: 'limegreen', fontSize: 25, textTransform: 'none', width: '50vw', ':hover': {border: '2px solid', color: 'black', borderColor: 'black', bgcolor: 'white'}}}>Окна</Button>
                </Paper>
            </Box>}
        </Box>
    );
};

export default AdminPage;