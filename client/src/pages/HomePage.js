import Box from '@mui/material/Box';
import React, {useState} from 'react';
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
import { styled } from '@mui/material/styles';

const Header = styled(AppBar)({
    backgroundColor: 'white',
    height: '70px'
})

const HeaderContentContainer = styled(Toolbar)({
    height: '70px'
})

const Logo = styled(Link)({
    color: 'limegreen',
    fontSize: '40px',
    fontWeight: 'bold',
    ':hover': {
        color: 'black',
        backgroundColor: 'white'
    },
    textDecoration: 'none'
})

const UserButton = styled(Button)({
    marginLeft: '30px',
    fontWeight: 'bold',
    border: '2px solid limegreen',
    color: 'limegreen',
    backgroundColor: 'white',
    fontSize: '25px',
    textTransform: 'none',
    ':hover': {
        border: '2px solid black',
        color: 'black',
        backgroundColor: 'white'
    }
})

const HeaderButtonsContainer = styled(Box)({
    display: 'flex',
    marginLeft: 'auto'
})

const AdminButton = styled(Button)({
    marginRight: '30px',
    fontWeight: 'bold',
    border: '2px solid limegreen',
    color: 'limegreen',
    backgroundColor: 'white',
    fontSize: '25px',
    textTransform: 'none',
    ':hover': {
        border: '2px solid black',
        color: 'black',
        backgroundColor: 'white'
    }
})

const EmployeeButton = styled(Button)({
    marginRight: '30px',
    fontWeight: 'bold',
    border: '2px solid limegreen',
    color: 'limegreen',
    backgroundColor: 'white',
    fontSize: '25px',
    textTransform: 'none',
    ':hover': {
        border: '2px solid black',
        color: 'black',
        backgroundColor: 'white'
    }
})

const AccountButtonIcon = styled(AccountCircle)({
    color: 'limegreen',
    fontSize: '40px'
})

const AuthButton = styled(Button)({
    fontWeight: 'bold',
    border: '2px solid limegreen',
    color: 'limegreen',
    backgroundColor: 'white',
    fontSize: '25px',
    textTransform: 'none',
    ':hover': {
        border: '2px solid black',
        color: 'black',
        backgroundColor: 'white'
    }
})

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
            <Header>
                <HeaderContentContainer>
                    <Logo href='/'>БЕЛБАНК</Logo>
                    {UserStore.role == 'USER' && <UserButton disableRipple variant='outlined' onClick={userButtonHandler}>Заказать талон</UserButton>}
                    <HeaderButtonsContainer>
                        {UserStore.role == 'ADMIN' && <AdminButton disableRipple variant='outlined' onClick={adminButtonHandler}>Админ панель</AdminButton>} 
                        {UserStore.role == 'EMPLOYEE' && <EmployeeButton disableRipple variant='outlined' onClick={employeeButtonHandler}>Рабочее место</EmployeeButton>}
                        {UserStore.isAuth == 'true' ?
                        <Box>
                            <IconButton
                                onClick={handleMenu}
                            >
                            <AccountButtonIcon/>
                            </IconButton>
                            <Menu
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
                        <AuthButton disableRipple variant='outlined' onClick={authButtonHandler}>Войти</AuthButton>}
                    </HeaderButtonsContainer>
                </HeaderContentContainer>
            </Header>
        </Box>
    );
});

export default HomePage;