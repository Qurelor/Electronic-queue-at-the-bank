import Box from '@mui/material/Box';
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BankWindowStore from '../store/BankWindowStore';
import {getAllBankWindowsWithoutCashier, setBankWindowCashierId, getBankWindowNumberById} from '../http/bankWindowAPI';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import UserStore from '../store/UserStore';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TalonStore from '../store/TalonStore';
import {getAllTalons, setTalonBankWindowId, setTalonStatus} from '../http/talonAPI';
import {getCashierIdByUserId} from '../http/cashierAPI';
import {getTypesByServiceIds, getServiceIdsByCashierId} from '../http/serviceAPI';

const PageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'limegreen',
    minHeight: '100vh',
    paddingBottom: '40px'
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

const WorkplaceContainer = styled(Box)({
    width: '100%'
})

const SelectTalonWindowContainer = styled(Paper)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    marginTop: '100px',
    justifyItems: 'center',
    alignItems: 'start',
    paddingBottom: '20px',
})

const SelectTalonContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '30px',
    paddingTop: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    minHeight: '70vh'
})

const SelectTalonTitle = styled(Typography)({
    fontSize: '30px'
})

const TalonButton = styled(Button)({
    fontWeight: 'bold',
    border: '2px solid',
    color: 'limegreen',
    backgroundColor: 'white',
    borderColor: 'limegreen',
    fontSize: '30px',
    textTransform: 'none',
    width: '200px',
    marginTop: '10px',
    ':hover': {
        border: '2px solid black',
        color: 'black',
        backgroundColor: 'white'
    }
})

const SelectTalonMessageContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1
})

const ExitToWorkingWindowButton = styled(Button)({
    fontWeight: 'bold',
    border: '2px solid',
    color: 'limegreen',
    backgroundColor: 'white',
    borderColor: 'limegreen',
    fontSize: '30px',
    textTransform: 'none',
    ':hover': {
        border: '2px solid',
        color: 'black',
        borderColor: 'black',
        backgroundColor: 'white'
    },
    marginTop: '10px'
})

const WorkingWindowContainer = styled(Paper)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '100px',
    paddingTop: '10px',
    paddingBottom: '40px'
})

const WorkingWindowGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'
})

const WorkingWindowTitle = styled(Typography)({
    color: 'limegreen',
    fontSize: '30px',
    fontWeight: 'bold',
    textAlign: 'center'
})

const ShutdownButton = styled(Button)({
    fontWeight: 'bold',
    border: '2px solid',
    color: 'crimson',
    backgroundColor: 'white',
    borderColor: 'crimson',
    fontSize: '30px',
    textTransform: 'none',
    ':hover': {
        border: '2px solid',
        color: 'red',
        borderColor: 'red',
        backgroundColor: 'white'
    }
})

const Status = styled(Typography)({
    fontSize: '30px',
    marginTop: '200px'
})

const SelectTalonButton = styled(Button)({
    fontWeight: 'bold',
    border: '2px solid',
    color: 'limegreen',
    backgroundColor: 'white',
    borderColor: 'limegreen',
    fontSize: '30px',
    textTransform: 'none',
    marginTop: '200px',
    ':hover': {
        border: '2px solid',
        color: 'black',
        borderColor: 'black',
        backgroundColor: 'white'
    }
})

const WaitingWindowButtonsContainer = styled(Box)({
    display: 'flex',
    marginTop: '200px'
})

const SkipTalonButton = styled(Button)({
    fontWeight: 'bold',
    border: '2px solid',
    color: 'crimson',
    backgroundColor: 'white',
    borderColor: 'crimson',
    fontSize: '30px',
    textTransform: 'none',
    ':hover': {
        border: '2px solid',
        color: 'red',
        borderColor: 'red',
        backgroundColor: 'white'
    }
})

const StartServiceButton = styled(Button)({
    fontWeight: 'bold',
    border: '2px solid',
    color: 'limegreen',
    backgroundColor: 'white',
    borderColor: 'limegreen',
    fontSize: '30px',
    textTransform: 'none',
    marginLeft: '20px',
    ':hover': {
        border: '2px solid',
        color: 'black',
        borderColor: 'black',
        backgroundColor: 'white'
    }
})

const FinishServiceButton = styled(Button)({
    fontWeight: 'bold',
    border: '2px solid',
    color: 'limegreen',
    backgroundColor: 'white',
    borderColor: 'limegreen',
    fontSize: '30px',
    textTransform: 'none',
    marginTop: '200px',
    ':hover': {
        border: '2px solid',
        color: 'black',
        borderColor: 'black',
        backgroundColor: 'white'
    }
})

const SelectWindowContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'limegreen',
    paddingBottom: '40px'
})

const SelectWindowTitleBackground = styled(Paper)({
    marginTop: '100px',
    paddingLeft: '60px',
    paddingRight: '60px',
    paddingTop: '10px',
    paddingBottom: '10px'
})

const SelectWindowTitle = styled(Typography)({
    color: 'limegreen',
    fontSize: '30px',
    fontWeight: 'bold'
})

const SelectWindowGrid = styled(Box)({
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: '300px 300px 300px 300px 300px',
    gap: '10px',
    width: '100%',
    marginTop: '10px',
    backgroundColor: 'limegreen',
})

const BankWindowButton = styled(Button)({
    backgroundColor: 'white',
    width: '300px',
    height: '300px',
    fontSize: '30px',
    color: 'limegreen',
    ':hover': {
        backgroundColor: 'white',
        border: '5px solid black',
        color: 'black'
    }
})

const SelectWindowMessageBackground = styled(Paper)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90vw',
    height: '70vh',
    marginTop: '20px',
    fontSize: '25px'
})

const CashierPage = observer(() => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [showTalonSelectionWindow, setShowTalonSelectionWindow] = useState(false);

    useEffect(() => {
        if(UserStore.role == 'CASHIER'){
            UserStore.setIsWorking(localStorage.getItem('isWorking') || 'false')
            UserStore.setWorkingWindowId(localStorage.getItem('workingWindowId') || '')
            UserStore.setWorkingWindowNumber(localStorage.getItem('workingWindowNumber') || '')
            BankWindowStore.setSelectedTalonId(localStorage.getItem('selectedTalonId') || '')
            BankWindowStore.setSelectedTalon(localStorage.getItem('selectedTalon') || '')
            BankWindowStore.setStatus(localStorage.getItem('status') || '')
        }
        getAllBankWindowsWithoutCashier('number', 'asc').then(data => BankWindowStore.setBankWindows(data))
        let interval = setInterval(getTalonsWithTypes, 5000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    async function getTalonsWithTypes() {
        getCashierIdByUserId(UserStore.userId)
        .then(cashierId => getServiceIdsByCashierId(cashierId)
        .then(serviceIds => getAllTalons(serviceIds, 'ожидание')
        .then(async talons => {
            let talonsWithTypes = await Promise.all(talons.map(async talon => {
                const types = await getTypesByServiceIds(talon.serviceId); talon.type = types[0]; return talon
            })); 
            TalonStore.setTalons(talonsWithTypes)
        })))
    }

    function logoButtonHandler() {
        navigate('/')
    }
    
    function handleMenu(e) {
        setAnchorEl(e.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function exitButtonHandler() {
        UserStore.isWorking == 'true' && setBankWindowCashierId(UserStore.workingWindowId, null)
        UserStore.setIsAuth('false')
        UserStore.setRole('null')
        UserStore.setUserId('null')
        localStorage.setItem('isAuth', 'false')
        localStorage.setItem('role', 'null')
        localStorage.setItem('userId', 'null')
        localStorage.setItem('isWorking', 'false')
        localStorage.setItem('workingWindow', 'null')
        BankWindowStore.selectedTalonId.length != 0 && setTalonStatus(BankWindowStore.selectedTalonId, 'обслужен')
        localStorage.setItem('selectedTalonId', '')
        localStorage.setItem('selectedTalon', '')
        BankWindowStore.setSelectedTalonId('')
        BankWindowStore.setSelectedTalon('')
        navigate('/')
    }

    function quitButtonHandler() {
        BankWindowStore.selectedTalonId.length != 0 && setTalonStatus(BankWindowStore.selectedTalonId, 'обслужен')
        localStorage.setItem('selectedTalonId', '')
        localStorage.setItem('selectedTalon', '')
        BankWindowStore.setSelectedTalonId('')
        BankWindowStore.setSelectedTalon('')
        setBankWindowCashierId(UserStore.workingWindowId, null)
        localStorage.setItem('isWorking', 'false')
        localStorage.setItem('workingWindowId', '')
        localStorage.setItem('workingWindowNumber', '')
        UserStore.setIsWorking('false')
        UserStore.setWorkingWindowId('')
        UserStore.setWorkingWindowNumber('')
    }

    function talonSelectionButtonHandler() {
        getTalonsWithTypes()
        .then(setShowTalonSelectionWindow(true))
        .then(console.log(TalonStore.talons))
    }

    function skipTalonButtonHandler() {
        setTalonStatus(BankWindowStore.selectedTalonId, 'не явился')
        .then(BankWindowStore.setSelectedTalonId(''))
        .then(BankWindowStore.setSelectedTalon(''))
        .then(localStorage.setItem('selectedTalonId', ''))
        .then(localStorage.setItem('selectedTalon', ''))
        .then(BankWindowStore.setStatus('выбор талона'))
        .then(localStorage.setItem('status', 'выбор талона'))
    }

    function startServiceButtonHandler() {
        setTalonStatus(BankWindowStore.selectedTalonId, 'обслуживается')
        .then(BankWindowStore.setStatus('обслуживание талона'))
        .then(localStorage.setItem('status', 'обслуживание талона'))
    }

    function finishServiceButtonHandler() {
        setTalonStatus(BankWindowStore.selectedTalonId, 'обслужен')
        .then(BankWindowStore.setSelectedTalonId(''))
        .then(BankWindowStore.setSelectedTalon(''))
        .then(localStorage.setItem('selectedTalonId', ''))
        .then(localStorage.setItem('selectedTalon', ''))
        .then(BankWindowStore.setStatus('выбор талона'))
        .then(localStorage.setItem('status', 'выбор талона'))
    }

    async function bankWindowButtonHandler(e) {
        localStorage.setItem('isWorking', 'true')
        localStorage.setItem('workingWindowId', e.target.id)
        const bankWindowNumber = await getBankWindowNumberById(e.target.id)
        localStorage.setItem('workingWindowNumber', bankWindowNumber)
        localStorage.setItem('status', 'выбор талона')
        UserStore.setIsWorking('true')
        UserStore.setWorkingWindowId(e.target.id)
        UserStore.setWorkingWindowNumber(bankWindowNumber)
        BankWindowStore.setStatus('выбор талона')
        getCashierIdByUserId(UserStore.userId).then(cashierId => setBankWindowCashierId(e.target.id, cashierId))
    }

    function selectTalonButtonHandler(id, bankWindowId, type, number) {
        setTalonBankWindowId(id, bankWindowId)
        .then(setTalonStatus(id, 'готов к обслуживанию'))
        .then(BankWindowStore.setSelectedTalonId(id))
        .then(BankWindowStore.setSelectedTalon(`${type}-${number}`))
        .then(localStorage.setItem('selectedTalonId', id))
        .then(localStorage.setItem('selectedTalon', `${type}-${number}`))
        .then(BankWindowStore.setStatus('ожидание талона'))
        .then(localStorage.setItem('status', 'ожидание талона'))
        .then(setShowTalonSelectionWindow(false))
    }

    function exitToWorkingWindowButtonHandler() {
        setShowTalonSelectionWindow(false)
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
            {UserStore.isWorking == 'true' ?
            <WorkplaceContainer>
                {showTalonSelectionWindow ? 
                <SelectTalonWindowContainer elevation={9}>
                    <Box/>
                    <SelectTalonContainer>
                        <SelectTalonTitle>Выберите талон</SelectTalonTitle>
                        {TalonStore.talons.length != 0 ?
                        TalonStore.talons.map(talon =>
                            <TalonButton disableRipple variant='outlined' onClick={() => selectTalonButtonHandler(talon.id, UserStore.workingWindowId, talon.type, talon.number)}>
                                {`${talon.type}-${talon.number}`}
                            </TalonButton>
                        ) :
                        <SelectTalonMessageContainer>В данный момент нет талонов</SelectTalonMessageContainer>}
                    </SelectTalonContainer>
                    <ExitToWorkingWindowButton disableRipple onClick={exitToWorkingWindowButtonHandler}>Вернуться на рабочее место</ExitToWorkingWindowButton>
                </SelectTalonWindowContainer> :
                <WorkingWindowContainer elevation={9}>
                    <WorkingWindowGrid>
                        <Box/>
                        <Box/>
                        <WorkingWindowTitle >Рабочее окно №{UserStore.workingWindowNumber}</WorkingWindowTitle>
                        <Box/>
                        <ShutdownButton disableRipple variant='outlined' onClick={quitButtonHandler}>Завершить работу</ShutdownButton>
                    </WorkingWindowGrid>
                    {BankWindowStore.status == 'выбор талона' &&
                    <React.Fragment>
                        <Status>В данный момент вы не обслуживаете талон</Status>
                        <SelectTalonButton disableRipple variant='outlined' onClick={talonSelectionButtonHandler}>Выбрать талон</SelectTalonButton>
                    </React.Fragment>
                    }
                    {BankWindowStore.status == 'ожидание талона' &&
                    <React.Fragment>
                        <Status>В данный момент вы ожидаете талон {BankWindowStore.selectedTalon}</Status>
                        <WaitingWindowButtonsContainer>
                            <SkipTalonButton disableRipple variant='outlined' onClick={skipTalonButtonHandler}>Не явился</SkipTalonButton>
                            <StartServiceButton disableRipple variant='outlined' onClick={startServiceButtonHandler}>Начать обслуживание</StartServiceButton>
                        </WaitingWindowButtonsContainer>
                    </React.Fragment>
                    }
                    {BankWindowStore.status == 'обслуживание талона' &&
                    <React.Fragment>
                        <Status>В данный момент вы обслуживаете талон {BankWindowStore.selectedTalon}</Status>
                        <FinishServiceButton disableRipple variant='outlined' onClick={finishServiceButtonHandler}>Завершить обслуживание</FinishServiceButton>
                    </React.Fragment>
                    }
                </WorkingWindowContainer>}
            </WorkplaceContainer> : 
            <SelectWindowContainer>
                <SelectWindowTitleBackground elevation={9}>
                    <SelectWindowTitle>Выберите окно</SelectWindowTitle>
                </SelectWindowTitleBackground>
                {BankWindowStore.bankWindows.length != 0 ?
                <SelectWindowGrid>
                    {BankWindowStore.bankWindows.map(bankWindow =>
                        <BankWindowButton 
                            disableRipple 
                            component={Paper} 
                            elevation={9} 
                            id={bankWindow.id} 
                            onClick={bankWindowButtonHandler}
                        >
                            {bankWindow.number}
                        </BankWindowButton>
                    )}
                </SelectWindowGrid> :
                <SelectWindowMessageBackground elevation={9}>В данный момент нет ни одного свободного окна. Обратитесь к администратору.</SelectWindowMessageBackground>}
            </SelectWindowContainer>}
        </PageContainer>
    );
});

export default CashierPage;