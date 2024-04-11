import Box from '@mui/material/Box';
import {useState} from 'react';
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
import {getMaxNumberByType, createTalon} from '../http/talonAPI';
import { styled } from '@mui/material/styles';

const PageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'limegreen',
    height: '100%'
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
    textDecoration: 'none'
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

const TakeTalonAgainButton = styled(Button)({
    fontWeight: 'bold',
    border: '2px solid limegreen',
    color: 'limegreen',
    backgroundColor: 'white',
    fontSize: '25px',
    textTransform: 'none',
    marginBottom: '20px',
    ':hover': {
        border: '2px solid black',
        color: 'black',
        backgroundColor: 'white'
    }
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
    marginTop: '20px',
    paddingLeft: '60px',
    paddingRight: '60px',
    paddingBottom: '40px',
    width: '100%'
})

const ServiceButton = styled(Button)({
    backgroundColor: 'white',
    width: '100%',
    fontSize: '30px',
    color: 'limegreen',
    justifyContent: 'left',
    paddingLeft: '20px',
    ':hover': {
        backgroundColor: 'white', 
        border: '5px solid black', 
        color: 'black'
    }
})

const UserPage = observer(() => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [messageActive, setMessageActive] = useState(false)
    const [talonNumber, setTalonNumber] = useState('')
    
    function handleMenu(e) {
        setAnchorEl(e.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null);
    }

    async function exitButtonHandler() {
        UserStore.setIsAuth('false')
        UserStore.setRole('null')
        UserStore.setUserId('null')
        localStorage.setItem('isAuth', 'false')
        localStorage.setItem('role', 'null')
        localStorage.setItem('userId', 'null')
        navigate('/')
    }

    async function talonButtonHandler(typeOfTalon) {
        setMessageActive(true)
        const maxNumber = await getMaxNumberByType(typeOfTalon)
        if(maxNumber == null) {
            await createTalon(typeOfTalon, 1, UserStore.userId)
            setTalonNumber(`${typeOfTalon}-1`)
        }else{
            await createTalon(typeOfTalon, Number(maxNumber)+1, UserStore.userId)
            setTalonNumber(`${typeOfTalon}-${(Number(maxNumber)+1)}`)
            console.log(maxNumber)
            console.log(Number(maxNumber)+1)
        }
    }

    function takeTalonAgainButtonHandler() {
        setMessageActive(false)
    }
    
    function exitToHomePageButtonHandler() {
        navigate('/')
    }

    return (
        <PageContainer>
            <Header>
                <HeaderContentContainer>
                    <Logo href='/'>БЕЛБАНК</Logo>
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
                        Ваш талон: {talonNumber}
                    </TalonInfoContainer>
                    <ButtonsContainer>
                        <TakeTalonAgainButton disableRipple variant='outlined' onClick={takeTalonAgainButtonHandler}>Взять еще один талон</TakeTalonAgainButton>
                        <ExitToHomePageButton disableRipple variant='outlined' onClick={exitToHomePageButtonHandler}>Выйти</ExitToHomePageButton>
                    </ButtonsContainer>
                </MessageBackground>
            </MessageContainer> :
            <ServiceContainer>
                <ServiceTitleBackground elevation={9}>
                        <ServiceTitle>Выберите услугу</ServiceTitle>
                </ServiceTitleBackground>
                <ServiceButtonsContainer>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('A')}>Банковский перевод</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('A')}>Закрытие счета с БПК</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('B')}>Консультация, открытие вклада</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('B')}>Консультация, оформление карточки</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('C')}>Консультация, оформление потребительского кредита</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('C')}>Оформление доверенностей/завещаний</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('D')}>Оформление справок, выписок</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('D')}>Покупка/продажа облигаций Банка</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('E')}>Получение карточки, изъятой из банкомата</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('E')}>Получение/замена карты</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('F')}>Прием и выдача наличных</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('F')}>Проверка подлинности банкнот</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('G')}>Продажа слитком, монет</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('G')}>Снятие наличных без карты</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('H')}>Юрлица - Переоформление счета / карточки с образцами подписей</ServiceButton>
                    <ServiceButton disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('H')}>Юрлица - Эквайринг</ServiceButton>
                </ServiceButtonsContainer>
            </ServiceContainer>}
        </PageContainer>
    );
});

export default UserPage;