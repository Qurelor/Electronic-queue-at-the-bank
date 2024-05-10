import Box from '@mui/material/Box';
import React, {useState, useEffect} from 'react';
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
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded';
import {getTypesByServiceIds, getServiceIdsByCashierId} from '../http/serviceAPI';
import {getAllTalons, getServicedTalonByBankWindowId, setTalonStatus, getLastTalonByUserId} from '../http/talonAPI';
import TalonStore from '../store/TalonStore';
import {getAllBankWindowsWithCashier, getCashierIdByBankWindowId, setBankWindowCashierId} from '../http/bankWindowAPI';
import BankWindowStore from '../store/BankWindowStore';

const PageContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    backgroundColor: 'limegreen',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    paddingBottom: '40px'
}))

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

const BoardAndUserTalonsContainer = styled(Box)({
    display: 'flex',
    marginTop: '150px',
})

const Board = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    /*display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    justifyItems: 'center',
    alignItems: 'center',
    minHeight: '200px',
    minWidth: '300px',
    padding: '20px'*/
    minHeight: '30vh',
    minWidth: '30vw',
    borderRadius: '0px'
})

const BoardTitleContainer = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    justifyItems: 'center',
    alignItems: 'center',
    paddingTop: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid black'
})

const BoardItem = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    justifyItems: 'center',
    alignItems: 'center',
})

const BoardTitle = styled(Typography)({
    fontSize: '25px',
    fontWeight: 'bold',
    color: 'limegreen'
})

const BoardIcon = styled(TrendingFlatRoundedIcon)({
    fontSize: '55px',
    color: 'limegreen'
})

const BoardMessage = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1',
    fontSize: '25px'
})

const UserTalonWindowContainer = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '30vh',
    minWidth: '30vw',
    borderRadius: '0px',
    marginLeft: '20px'
})

const UserTalonWindowTitleContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px solid black'
})

const UserTalonWindowTitle = styled(Typography)({
    color: 'limegreen',
    fontSize: '25px',
    fontWeight: 'bold'
})

const UserTalonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1',
    marginTop: '10px',
    marginBottom: '10px'
})

const UserTalon = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '22vh',
    width: '22vw',
})

const UserTalonNumber = styled(Typography)({
    fontSize: '45px',
})

const UserTalonStatusContainer = styled(Box)({
    display: 'flex'
})

const UserTalonStatus = styled(Typography)({
    fontSize: '25px'
})

const UserTalonColoredStatus = styled(Typography)(({status}) => ({
    fontSize: '25px',
    color: status == 'обслужен' && 'gray' || status == 'отменён' && 'purple' || status == 'не явился' && 'red' || status == 'ожидание' && 'deepskyblue' || status == 'готов к обслуживанию' && 'greenyellow' || status == 'обслуживается' && 'limegreen',
    marginLeft: '5px'
}))

const CancelButton = styled(Button)({
    display: 'flex',
    alignSelf: 'center',
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
    },
    marginBottom: '10px'
})

const QueueStatusTitle = styled(Typography)({
    fontSize: '25px',
    color: 'white',
    textShadow: '1px 1px 9px black',
    fontWeight: 'bold',
    marginTop: '20px'
})

const QueueStatusContainer = styled(Box)({
    display: 'flex',
    minHeight: '40vh',
    maxWidth: '90vw',
    overflow: 'auto',
    overflowY: 'hidden'
})

const QueueStatusItem = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    width: '120px',
    borderRadius: '0px',
    borderLeft: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    flexShrink: '0',
    ':last-child': {
        borderRight: '1px solid black'
    }
})

const QueueStatusItemTitle = styled(Typography)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '4vh',
    borderBottom: '1px solid black',
    color: 'limegreen',
    fontWeight: 'bold',
    fontSize: '25px'
})

const BankWindowNumber = styled(Typography)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '4vh',
    borderBottom: '1px solid black',
    color: 'limegreen',
    fontWeight: 'bold',
    fontSize: '25px'
})

const TalonNumber = styled(Typography)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '4vh',
    color: 'limegreen',
    fontWeight: 'bold',
    fontSize: '25px'
})

const HomePage = observer(() => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        let lastTalonInterval
        if (UserStore.role == 'USER') {
            lastTalonInterval = setInterval(getLastTalonWithType, 5000)
        }
        UserStore.setIsWorking(localStorage.getItem('isWorking') || 'false')
        UserStore.setWorkingWindowId(localStorage.getItem('workingWindowId') || '')
        UserStore.setWorkingWindowNumber(localStorage.getItem('workingWindowNumber') || '')
        BankWindowStore.setSelectedTalonId(localStorage.getItem('selectedTalonId') || '')
        BankWindowStore.setSelectedTalon(localStorage.getItem('selectedTalon') || '')
        BankWindowStore.setStatus(localStorage.getItem('status') || '')
        getBankWindowsWithTalon()
        let bankWindowsInterval = setInterval(getBankWindowsWithTalon, 5000)
        return () => {
            clearInterval(bankWindowsInterval)
            lastTalonInterval && clearInterval(lastTalonInterval)
        }
    }, [])

    async function getBankWindowsWithTalon() {
        getAllBankWindowsWithCashier('id', 'asc')
        .then(async bankWindows => {
            let bankWindowsWithTalon = await Promise.all(bankWindows.map(async bankWindow => {
                let servicedTalon = await getServicedTalonByBankWindowId(bankWindow.id)
                if(servicedTalon != null) { 
                    const types = await getTypesByServiceIds(servicedTalon.serviceId); 
                    servicedTalon.type = types[0];
                }
                bankWindow.servicedTalon = servicedTalon
                let cashierId = await getCashierIdByBankWindowId(bankWindow.id)
                let serviceIds = await getServiceIdsByCashierId(cashierId)
                let talons = await getAllTalons(serviceIds, 'ожидание')
                let talonsWithTypes = await Promise.all(talons.map(async talon => {
                    const types = await getTypesByServiceIds(talon.serviceId); talon.type = types[0]; return talon
                }));
                bankWindow.talons = talonsWithTypes
                return bankWindow
            }));
            BankWindowStore.setBankWindows(bankWindowsWithTalon)
        })
    }

    async function getLastTalonWithType() {
        const lastTalon = await getLastTalonByUserId(UserStore.userId)
        if(lastTalon){
            const types = await getTypesByServiceIds(lastTalon.serviceId)
            lastTalon.type = types[0]
            UserStore.setLastTalon(lastTalon)
        }
    }

    function logoButtonHandler() {
        navigate('/')
    }

    function userButtonHandler() {
        navigate('/user')
    }

    function adminButtonHandler() {
        navigate('/admin')
    }

    function employeeButtonHandler() {
        navigate('/cashier')
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
        if(UserStore.role == 'CASHIER'){
            console.log('cтираю')
            UserStore.isWorking == 'true' && setBankWindowCashierId(UserStore.workingWindowId, null)
            localStorage.setItem('isWorking', 'false')
            localStorage.setItem('workingWindow', 'null')
            BankWindowStore.selectedTalonId.length != 0 && setTalonStatus(BankWindowStore.selectedTalonId, 'обслужен')
            localStorage.setItem('selectedTalonId', '')
            localStorage.setItem('selectedTalon', '')
            BankWindowStore.setSelectedTalonId('')
            BankWindowStore.setSelectedTalon('')
            getBankWindowsWithTalon()
        }
        UserStore.setIsAuth('false')
        UserStore.setRole('null')
        UserStore.setUserId('null')
        localStorage.setItem('isAuth', 'false')
        localStorage.setItem('role', 'null')
        localStorage.setItem('userId', 'null')
    }

    function cancelButtonHandler(talonId) {
        setTalonStatus(talonId, 'отменён')
    }

    return (
        <PageContainer>
            <Header>
                <HeaderContentContainer>
                    <Logo onClick={logoButtonHandler}>БЕЛБАНК</Logo>
                    {UserStore.role == 'USER' && <UserButton disableRipple variant='outlined' onClick={userButtonHandler}>Заказать талон</UserButton>}
                    <HeaderButtonsContainer>
                        {UserStore.role == 'ADMIN' && <AdminButton disableRipple variant='outlined' onClick={adminButtonHandler}>Админ панель</AdminButton>} 
                        {UserStore.role == 'CASHIER' && <EmployeeButton disableRipple variant='outlined' onClick={employeeButtonHandler}>Рабочее место</EmployeeButton>}
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
            <BoardAndUserTalonsContainer>
                <Board elevation={9}>
                    <BoardTitleContainer>
                        <BoardTitle>Талон</BoardTitle>
                        <Box/>
                        <BoardTitle>Окно</BoardTitle>
                    </BoardTitleContainer>
                    {BankWindowStore.bankWindows.length != 0 ?
                        BankWindowStore.bankWindows.map(bankWindow =>
                            <BoardItem>
                                <BoardTitle>{bankWindow.servicedTalon != null ? `${bankWindow.servicedTalon.type}-${bankWindow.servicedTalon.number}` : ''}</BoardTitle>
                                <BoardIcon/>
                                <BoardTitle>{bankWindow.number}</BoardTitle>
                            </BoardItem>
                        ) :
                        <BoardMessage>В данный момент нет открытых окон</BoardMessage>
                    }
                </Board>
                {UserStore.role == 'USER' && UserStore.lastTalon &&
                    <UserTalonWindowContainer elevation={9}>
                        <UserTalonWindowTitleContainer>
                            <UserTalonWindowTitle>Ваш талон</UserTalonWindowTitle>
                        </UserTalonWindowTitleContainer>
                        <UserTalonContainer>
                            <UserTalon elevation={9}>
                                <UserTalonNumber>{`${UserStore.lastTalon.type}-${UserStore.lastTalon.number}`}</UserTalonNumber>
                                <UserTalonStatusContainer>
                                    <UserTalonStatus>статус:</UserTalonStatus>
                                    <UserTalonColoredStatus status={UserStore.lastTalon.status}>{UserStore.lastTalon.status}</UserTalonColoredStatus>
                                </UserTalonStatusContainer>
                            </UserTalon>
                        </UserTalonContainer>
                        {UserStore.lastTalon.status == 'ожидание' &&
                            <CancelButton disableRipple onClick={() => cancelButtonHandler(UserStore.lastTalon.id)}>Отменить</CancelButton>
                        }
                    </UserTalonWindowContainer>
                }
            </BoardAndUserTalonsContainer>
            {BankWindowStore.bankWindows.length != 0 &&
                <React.Fragment>
                    <QueueStatusTitle>Состояние очереди</QueueStatusTitle>
                    <QueueStatusContainer>
                        {BankWindowStore.bankWindows.map(bankWindow =>
                            <QueueStatusItem>
                                <QueueStatusItemTitle>Окно</QueueStatusItemTitle>
                                <BankWindowNumber>{bankWindow.number}</BankWindowNumber>
                                <QueueStatusItemTitle>Талоны</QueueStatusItemTitle>
                                {bankWindow.talons && bankWindow.talons.map(talon =>
                                    <TalonNumber>{`${talon.type}-${talon.number}`}</TalonNumber>
                                )}
                            </QueueStatusItem>
                        )}
                    </QueueStatusContainer>
                </React.Fragment>
            }
        </PageContainer>
    );
});

export default HomePage;