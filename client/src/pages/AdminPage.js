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
import { styled } from '@mui/material/styles';
import AddServicePanel from '../panels/AddServicePanel';
import ServicesPanel from '../panels/ServicesPanel';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Loading = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    color: 'limegreen',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white'
}))

const LoadingWindowContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    color: 'limegreen',
    backgroundColor: 'white'
})

const PageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'limegreen'
})

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
    textDecoration: 'none',
    cursor: 'pointer'
})

const HeaderButtonsContainer = styled(Box)({
    display: 'flex',
    marginLeft: 'auto'
})

const AdminButton = styled(Button)({
    marginRight: '30px',
    fontWeight: 'bold',
    border: '2px solid',
    color: 'limegreen',
    backgroundColor: 'white',
    borderColor: 'limegreen',
    fontSize: '25px',
    textTransform: 'none',
    ':hover': {
        border: '2px solid',
        color: 'black',
        borderColor: 'black',
        backgroundColor: 'white'
    }
})

const AccountButtonIcon = styled(AccountCircle)({
    color: 'limegreen',
    fontSize: '40px'
})

const PanelsContainer = styled(Box)({
    display: 'flex',
    marginTop: '110px',
    justifyContent: 'center',
    backgroundColor: 'limegreen',
    paddingBottom: '40px',
    flexDirection: 'row'
})

const CashiersPanelContainer = styled(Box)({
    display: 'flex',
    marginTop: '110px',
    justifyContent: 'center',
    paddingBottom: '40px',
    flexDirection: 'row'
})

const ButtonsContainer = styled(Box)({
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
})

const BackgroundButtons = styled(Paper)({
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingTop: '20px',
    paddingBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})

const UsersButton = styled(Button)({
    fontWeight: 'bold',
    border: '2px solid',
    color: 'limegreen',
    bgcolor: 'white',
    borderColor: 'limegreen',
    fontSize: '25px',
    textTransform: 'none',
    width: '50vw',
    ':hover': {
        border: '2px solid',
        color: 'black',
        borderColor: 'black',
        backgroundColor: 'white'
    }
})

const BankWindowsButton = styled(Button)({
    marginTop: '20px',
    fontWeight: 'bold',
    border: '2px solid',
    color: 'limegreen',
    backgroundColor: 'white',
    borderColor: 'limegreen',
    fontSize: '25px',
    textTransform: 'none',
    width: '50vw',
    ':hover': {
        border: '2px solid',
        color: 'black',
        borderColor: 'black',
        backgroundColor: 'white'
    }
})

const ServicesButton = styled(Button)({
    marginTop: '20px',
    fontWeight: 'bold',
    border: '2px solid',
    color: 'limegreen',
    backgroundColor: 'white',
    borderColor: 'limegreen',
    fontSize: '25px',
    textTransform: 'none',
    width: '50vw',
    ':hover': {
        border: '2px solid',
        color: 'black',
        borderColor: 'black',
        backgroundColor: 'white'
    }
})

const AdminPage = () => {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showUsersPanel, setShowUsersPanel] = useState(false);
    const [showBankWindowsPanel, setShowBankWindowsPanel] = useState(false);
    const [showServicesPanel, setShowServicesPanel] = useState(false);
    const [isLoadingAddPanel, setIsLoadingAddPanel] = useState(false);
    const [isLoadingDataPanel, setIsLoadingDataPanel] = useState(false);

    function logoButtonHandler() {
        navigate('/')
    }

    function usersButtonHandler() {
        setIsLoadingAddPanel(true)
        setIsLoadingDataPanel(true)
        setShowUsersPanel(true)
    }

    function bankWindowsButtonHandler() {
        setShowBankWindowsPanel(true)
    }

    function servicesButtonHandler() {
        setShowServicesPanel(true)
    }
    
    function adminButtonHandler() {
        setShowUsersPanel(false)
        setShowBankWindowsPanel(false)
        setShowServicesPanel(false)
    }
    
    function handleMenu(e) {
        setAnchorEl(e.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null);
    }
    
    function exitButtonHandler() {
        localStorage.removeItem('token')
        UserStore.setUser(null)
        navigate('/')
    }

    return (
        <PageContainer>
            {(isLoadingAddPanel || isLoadingDataPanel) &&
            <Loading
            >
                <CircularProgress color="inherit" />
            </Loading>}
            <Header>
                <HeaderContentContainer>
                    <Logo onClick={logoButtonHandler}>БЕЛБАНК</Logo>
                    <HeaderButtonsContainer>
                        <AdminButton disableRipple variant='outlined' onClick={adminButtonHandler}>
                            Админ. панель
                        </AdminButton>
                        <IconButton onClick={handleMenu}>
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
                    </HeaderButtonsContainer>
                </HeaderContentContainer>
            </Header>
            {(showUsersPanel || showBankWindowsPanel || showServicesPanel) && 
            <PanelsContainer>
                <Box>
                    {showUsersPanel && <AddUserPanel setIsLoading={setIsLoadingAddPanel}></AddUserPanel>}
                    {showBankWindowsPanel && <AddBankWindowPanel></AddBankWindowPanel>}
                    {showServicesPanel && <AddServicePanel></AddServicePanel>}
                    <Box/>
                </Box>
                <Box>
                    {showUsersPanel && <UsersPanel setIsLoading={setIsLoadingDataPanel}></UsersPanel>}
                    {showBankWindowsPanel && <BankWindowsPanel></BankWindowsPanel>}
                    {showServicesPanel && <ServicesPanel></ServicesPanel>}
                    <Box/>
                </Box>
            </PanelsContainer>}
            {!showUsersPanel && !showBankWindowsPanel && !showServicesPanel &&
            <ButtonsContainer>
                <BackgroundButtons elevation={9}>
                    <UsersButton disableRipple variant='outlined' onClick={usersButtonHandler}>Пользователи</UsersButton>
                    <BankWindowsButton disableRipple variant='outlined' onClick={bankWindowsButtonHandler}>Окна</BankWindowsButton>
                    <ServicesButton disableRipple variant='outlined' onClick={servicesButtonHandler}>Услуги</ServicesButton>
                </BackgroundButtons>
            </ButtonsContainer>}
        </PageContainer>
    );
};

export default AdminPage;