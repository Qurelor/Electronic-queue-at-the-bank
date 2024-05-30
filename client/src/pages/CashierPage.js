import Box from '@mui/material/Box';
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BankWindowStore from '../store/BankWindowStore';
import {getAllBankWindowsWithoutCashier, setBankWindowCashierId, getBankWindowNumberById, getBankWindowByCashierId, setBankWindowStatus} from '../http/bankWindowAPI';
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
import {getAllTalons, setTalonBankWindowId, setTalonStatus, getServicedTalonByBankWindowId} from '../http/talonAPI';
import {getCashierIdByUserId} from '../http/cashierAPI';
import {getTypesByServiceIds, getServiceIdsByCashierId} from '../http/serviceAPI';
import CashierStore from '../store/CashierStore';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import {useRef} from 'react';
import Backdrop from '@mui/material/Backdrop';

const LoadingPageContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
})

const LoadingIcon = styled(CircularProgress)({
    color: 'limegreen'
})

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
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'limegreen',
    marginTop: '70px'
})

const SelectWindowTitleBackground = styled(Paper)({
    paddingLeft: '60px',
    paddingRight: '60px',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginTop: '30px'
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

const Loading = styled(Backdrop)(({theme}) => ({
    zIndex: theme.zIndex.modal + 1
}))

const CashierPage = observer(() => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [showTalonSelectionWindow, setShowTalonSelectionWindow] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true)
    const [openQuitAlert, setOpenQuitAlert] = useState(false)
    const [openSelectTalonAlert, setOpenSelectTalonAlert] = useState(false)
    const intervalRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            console.log('запуск с кешерпейджа')
            const cashierId = await getCashierIdByUserId(UserStore.user.id)
            const bankWindow = await getBankWindowByCashierId(cashierId)
            if (bankWindow) {
                CashierStore.setBankWindow(bankWindow)
                const servicedTalon = await getServicedTalonByBankWindowId(bankWindow.id)
                if (servicedTalon) {
                    const type = await getTypesByServiceIds(servicedTalon.serviceId)
                    servicedTalon.type = type
                    CashierStore.setServicedTalon(servicedTalon)
                }
            }
            const bankWindowsWithoutCashier = await getAllBankWindowsWithoutCashier('number', 'asc')
            console.log(bankWindowsWithoutCashier)
            BankWindowStore.setBankWindowsWithoutCashier(bankWindowsWithoutCashier)
            await getTalonsWithTypes()
            intervalRef.current = setInterval(getTalonsWithTypes, 5000)
            setIsLoadingPage(false)
        }
        getData()
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [])

    async function getTalonsWithTypes() {
        const cashierId = await getCashierIdByUserId(UserStore.user.id)
        const serviceIds = await getServiceIdsByCashierId(cashierId)
        if(serviceIds.length != 0) {
            const talons = await getAllTalons(serviceIds, 'ожидание')
            let talonsWithTypes = await Promise.all(talons.map(async talon => {
                const type = await getTypesByServiceIds(talon.serviceId); talon.type = type; return talon
            }));
            TalonStore.setTalons(talonsWithTypes)
        }
    }

    async function getTalonWithType(talon) {
        const type = await getTypesByServiceIds(talon.serviceId)
        talon.type = type
        return talon
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

    async function exitButtonHandler() {
        setIsLoading(true)
        clearInterval(intervalRef.current)
        UserStore.setUser(null)
        localStorage.removeItem('token')
        setIsLoading(false)
        navigate('/')
    }

    async function quitButtonHandler() {
        setIsLoading(true)
        if(CashierStore.servicedTalon) {
            setIsLoading(false)
            setOpenQuitAlert(true)
        } else {
            if(CashierStore.bankWindow) {
                await setBankWindowStatus(CashierStore.bankWindow.id, null)
                await setBankWindowCashierId(CashierStore.bankWindow.id, null)
                CashierStore.setBankWindow(null)
            }
            const bankWindowsWithoutCashier = await getAllBankWindowsWithoutCashier('number', 'asc')
            BankWindowStore.setBankWindowsWithoutCashier(bankWindowsWithoutCashier)
            setIsLoading(false)
        }
    }

    async function talonSelectionButtonHandler() {
        setIsLoading(true)
        await getTalonsWithTypes()
        setIsLoading(false)
        setShowTalonSelectionWindow(true)
    }

    async function skipTalonButtonHandler() {
        setIsLoading(true)
        const talon = await setTalonStatus(CashierStore.servicedTalon.id, 'не явился')
        console.log(talon)
        const bankWindow = await setBankWindowStatus(CashierStore.bankWindow.id, 'выбор талона')
        CashierStore.setServicedTalon(null)
        CashierStore.setBankWindow(bankWindow)
        setIsLoading(false)
    }

    async function startServiceButtonHandler() {
        setIsLoading(true)
        const talon = await setTalonStatus(CashierStore.servicedTalon.id, 'обслуживается')
        const type = await getTypesByServiceIds(talon.serviceId)
        talon.type = type
        CashierStore.setServicedTalon(talon)
        const bankWindow = await setBankWindowStatus(CashierStore.bankWindow.id, 'обслуживание талона')
        CashierStore.setBankWindow(bankWindow)
        setIsLoading(false)
    }

    async function finishServiceButtonHandler() {
        setIsLoading(true)
        await setTalonStatus(CashierStore.servicedTalon.id, 'обслужен')
        const bankWindow = await setBankWindowStatus(CashierStore.bankWindow.id, 'выбор талона')
        CashierStore.setServicedTalon(null)
        CashierStore.setBankWindow(bankWindow)
        setIsLoading(false)
    }

    async function bankWindowButtonHandler(e) {
        setIsLoading(true)
        const cashierId = await getCashierIdByUserId(UserStore.user.id)
        await setBankWindowCashierId(e.target.id, cashierId)
        const bankWindow = await setBankWindowStatus(e.target.id, 'выбор талона')
        CashierStore.setBankWindow(bankWindow)
        setIsLoading(false)
    }

    async function selectTalonButtonHandler(id) {
        setIsLoading(true)
        const talon = await setTalonStatus(id, 'готов к обслуживанию', CashierStore.bankWindow.id)
        console.log(talon)
        if (talon == 'талон уже отменён') {
            setOpenSelectTalonAlert(true)
        } else {
            const type = await getTypesByServiceIds(talon.serviceId)
            talon.type = type
            CashierStore.setServicedTalon(talon)
            const bankWindow = await setBankWindowStatus(CashierStore.bankWindow.id, 'ожидание талона')
            CashierStore.setBankWindow(bankWindow)
        }
        //await setTalonBankWindowId(id, CashierStore.bankWindow.id)
        setIsLoading(false)
        setShowTalonSelectionWindow(false)
    }

    function exitToWorkingWindowButtonHandler() {
        setShowTalonSelectionWindow(false)
    }

    function handleCloseQuitAlert() {
        setOpenQuitAlert(false)
    }

    function handleCloseSelectTalonAlert() {
        setOpenSelectTalonAlert(false)
    }

    if (isLoadingPage) {
        return (
            <LoadingPageContainer>
                <LoadingIcon/>
            </LoadingPageContainer>
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
            {CashierStore.bankWindow ?
            <WorkplaceContainer>
                {showTalonSelectionWindow ? 
                <SelectTalonWindowContainer elevation={9}>
                    <Box/>
                    <SelectTalonContainer>
                        <SelectTalonTitle>Выберите талон</SelectTalonTitle>
                        {TalonStore.talons.length != 0 ?
                        TalonStore.talons.map(talon =>
                            <TalonButton disableRipple variant='outlined' onClick={() => selectTalonButtonHandler(talon.id)}>
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
                        <WorkingWindowTitle >Рабочее окно №{CashierStore.bankWindow.number}</WorkingWindowTitle>
                        <Box/>
                        <ShutdownButton disableRipple variant='outlined' onClick={quitButtonHandler}>Завершить работу</ShutdownButton>
                    </WorkingWindowGrid>
                    {CashierStore.bankWindow.status == 'выбор талона' &&
                    <React.Fragment>
                        <Status>В данный момент вы не обслуживаете талон</Status>
                        <SelectTalonButton disableRipple variant='outlined' onClick={talonSelectionButtonHandler}>Выбрать талон</SelectTalonButton>
                    </React.Fragment>
                    }
                    {CashierStore.bankWindow.status == 'ожидание талона' &&
                    <React.Fragment>
                        <Status>В данный момент вы ожидаете талон {CashierStore.servicedTalon.type}-{CashierStore.servicedTalon.number}</Status>
                        <WaitingWindowButtonsContainer>
                            <SkipTalonButton disableRipple variant='outlined' onClick={skipTalonButtonHandler}>Не явился</SkipTalonButton>
                            <StartServiceButton disableRipple variant='outlined' onClick={startServiceButtonHandler}>Начать обслуживание</StartServiceButton>
                        </WaitingWindowButtonsContainer>
                    </React.Fragment>
                    }
                    {CashierStore.bankWindow.status == 'обслуживание талона' &&
                    <React.Fragment>
                        <Status>В данный момент вы обслуживаете талон {CashierStore.servicedTalon.type}-{CashierStore.servicedTalon.number}</Status>
                        <FinishServiceButton disableRipple variant='outlined' onClick={finishServiceButtonHandler}>Завершить обслуживание</FinishServiceButton>
                    </React.Fragment>
                    }
                </WorkingWindowContainer>}
            </WorkplaceContainer> : 
            <SelectWindowContainer>
                <SelectWindowTitleBackground elevation={9}>
                    <SelectWindowTitle>Выберите окно</SelectWindowTitle>
                </SelectWindowTitleBackground>
                {BankWindowStore.bankWindowsWithoutCashier.length != 0 ?
                <SelectWindowGrid>
                    {BankWindowStore.bankWindowsWithoutCashier.map(bankWindow =>
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
            <Snackbar open={openQuitAlert} autoHideDuration={6000} onClose={handleCloseQuitAlert} TransitionComponent={Slide}>
                <Alert
                    severity='error'
                    variant='filled'
                >
                    Вы не можете завершить работу пока обслуживаете талон!
                </Alert>
            </Snackbar>
            <Snackbar open={openSelectTalonAlert} autoHideDuration={6000} onClose={handleCloseSelectTalonAlert} TransitionComponent={Slide}>
                    <Alert
                        severity='error'
                        variant='filled'
                    >
                        Талон уже отменён
                    </Alert>
            </Snackbar>
            <Loading
                open={isLoading}
            >
                <LoadingIcon/>
            </Loading>
        </PageContainer>
    );
});

export default CashierPage;