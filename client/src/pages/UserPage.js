import Box from '@mui/material/Box';
import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import UserStore from '../store/UserStore';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {getTalonMaxNumberByServiceId, createTalon, getUnservicedTalonByUserId} from '../http/talonAPI';
import { styled } from '@mui/material/styles';
import ServiceStore from '../store/ServiceStore';
import {getAllServices} from '../http/serviceAPI';
import {getTypesByServiceIds} from '../http/serviceAPI';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
    alignItems: 'center',
    backgroundColor: 'limegreen',
    minHeight: '100vh'
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

const AccountButtonIcon = styled(AccountCircle)({
    color: 'limegreen',
    fontSize: '40px'
})

const MessageContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70px',
    height: 'calc(100vh - 70px)',
    width: '100vw',
    backgroundColor: 'limegreen'
})

const MessageBackground = styled(Paper)({
    display: 'grid',
    gridTemplateRows: '1fr 1fr 1fr',
    fontSize: '30px',
    width: '700px',
    height: '500px'
})

const TalonInfoContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})

const SuccessIcon = styled(CheckCircleOutlineIcon)({
    fontSize: '130px',
    color: 'limegreen'
})

const ButtonsContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
})

const ExitToHomePageButton = styled(Button)({
    fontWeight: 'bold',
    border: '2px solid limegreen',
    color: 'limegreen',
    backgroundColor: 'white',
    fontSize: '25px',
    textTransform: 'none',
    marginBottom: '20px',
    marginLeft: '10px',
    ':hover': {
        border: '2px solid black',
        color: 'black',
        backgroundColor: 'white'
    }
})

const ServiceContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})

const ServiceTitleBackground = styled(Paper)({
    marginTop: '100px',
    paddingLeft: '60px',
    paddingRight: '60px',
    paddingTop: '10px',
    paddingBottom: '10px'
})

const ServiceTitle = styled(Typography)({
    color: 'limegreen',
    fontSize: '30px',
    fontWeight: 'bold'
})

const ServiceButtonsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    paddingLeft: '60px',
    paddingRight: '60px',
    paddingBottom: '40px',
    width: '100%'
})

const ServiceButton = styled(Button)({
    backgroundColor: 'white',
    width: '80vw',
    fontSize: '30px',
    color: 'limegreen',
    justifyContent: 'left',
    paddingLeft: '20px',
    border: '5px solid white',
    ':hover': {
        backgroundColor: 'white', 
        border: '5px solid black', 
        color: 'black'
    },
    textTransform: 'none',
    marginBottom: '5px'
})

const ServiceButtonsMessageContainer = styled(Box)({
    
})

const ServiceButtonsMessage = styled(Typography)({

})

const LoadingTalon = styled(Backdrop)(({theme}) => ({
    color: 'limegreen',
    zIndex: theme.zIndex.drawer + 1
}))

const UserPage = observer(() => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [messageActive, setMessageActive] = useState(false)
    const [talonNumber, setTalonNumber] = useState('')
    const [openAlert, setOpenAlert] = useState(false)
    const [isLoadingWindow, setIsLoadingWindow] = useState(true)
    const [isLoadingTalon, setIsLoadingTalon] = useState(false)

    useEffect(() => {
        getAllServices('id', 'asc').then((data) => ServiceStore.setServices(data)).finally(setIsLoadingWindow(false))
    }, [])

    function logoButtonHandler() {
        navigate('/')
    }
    
    function handleMenu(e) {
        setAnchorEl(e.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null);
    }

    async function exitButtonHandler() {
        if (UserStore.lastTalon) {
            UserStore.setLastTalon(null)
        }
        UserStore.setUser(null)
        localStorage.removeItem('token')
        navigate('/')
    }

    async function talonButtonHandler(serviceId) {
        setIsLoadingTalon(true)
        const servicedTalon = await getUnservicedTalonByUserId(UserStore.user.id)
        if(servicedTalon){
            setIsLoadingTalon(false)
            setOpenAlert(true)
        } else {
            const maxNumber = await getTalonMaxNumberByServiceId(serviceId)
            const type = await getTypesByServiceIds(serviceId)
            if (maxNumber == null) {
                const talon = await createTalon(1, 'ожидание', serviceId, UserStore.user.id)
                talon.type = type
                UserStore.setLastTalon(talon)
            } else {
                const talon = await createTalon(Number(maxNumber)+1, 'ожидание', serviceId, UserStore.user.id)
                talon.type = type
                UserStore.setLastTalon(talon)
            }
            setIsLoadingTalon(false)
            setMessageActive(true)
        }
    }
    
    function exitToHomePageButtonHandler() {
        navigate('/')
    }

    function handleCloseAlert() {
        setOpenAlert(false)
    }

    if(isLoadingWindow) {
        return (
            <LoadingWindowContainer>
                <CircularProgress color="inherit" />
            </LoadingWindowContainer>
        )
    }

    return (
        <PageContainer>
            <Header>
                <HeaderContentContainer>
                    <Logo onClick={logoButtonHandler}>БЕЛБАНК</Logo>
                    <HeaderButtonsContainer>
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
                    </HeaderButtonsContainer>
                </HeaderContentContainer>
            </Header>
            {messageActive ?
                <MessageContainer>
                    <MessageBackground elevation={9}>
                        <Box />
                        <TalonInfoContainer>
                            <SuccessIcon/>
                            Ваш талон: {`${UserStore.lastTalon.type}-${UserStore.lastTalon.number}`}
                        </TalonInfoContainer>
                        <ButtonsContainer>
                            <ExitToHomePageButton disableRipple variant='outlined' onClick={exitToHomePageButtonHandler}>Вернуться на главную страницу</ExitToHomePageButton>
                        </ButtonsContainer>
                    </MessageBackground>
                </MessageContainer> :
                <ServiceContainer>
                    <ServiceTitleBackground elevation={9}>
                        <ServiceTitle>Выберите услугу</ServiceTitle>
                    </ServiceTitleBackground>
                    {ServiceStore.services.length != 0 ?
                        <ServiceButtonsContainer>
                            {ServiceStore.services.map(service => 
                                <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => {talonButtonHandler(service.id)}}>
                                    {service.description}
                                </ServiceButton>)}
                        </ServiceButtonsContainer> :
                        <ServiceButtonsMessageContainer>
                            <ServiceButtonsMessage>
                                В данный момент нет услуг
                            </ServiceButtonsMessage>
                        </ServiceButtonsMessageContainer>}
                </ServiceContainer>}
                <LoadingTalon
                    open={isLoadingTalon}
                >
                    <CircularProgress color="inherit" />
                </LoadingTalon>
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert} TransitionComponent={Slide}>
                    <Alert
                        severity='error'
                        variant='filled'
                    >
                        У вас уже есть необслуженный талон! Дождитесь обслуживания или отмените талон для заказа нового.
                    </Alert>
                </Snackbar>
        </PageContainer>
    );
});

export default UserPage;