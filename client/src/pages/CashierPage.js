import Box from '@mui/material/Box';
import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BankWindowStore from '../store/BankWindowStore';
import {getAllBankWindows, setBankWindowUserId} from '../http/bankWindowAPI';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import UserStore from '../store/UserStore';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import TalonStore from '../store/TalonStore';
import {getAllTalons, setTalonBankWindowId, setTalonIsActualFalse} from '../http/talonAPI';
import {getCashierIdByUserId} from '../http/cashierAPI';
import {getServiceIdsByCashierId} from '../http/cashierServiceAPI';
import {getTypesByServiceIds} from '../http/serviceAPI';

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

const WorkplaceContainer = styled(Box)({
    width: '100%'
})

const SelectTalonWindowContainer = styled(Paper)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    marginTop: '100px',
    justifyItems: 'center',
    alignItems: 'start',
    paddingBottom: '20px'
})

const SelectTalonContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '30px',
    paddingTop: '10px',
    paddingLeft: '20px',
    paddingRight: '20px'
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

const CashierPage = observer(() => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [showTalonSelectionWindow, setShowTalonSelectionWindow] = useState(false);

    useEffect(() => {
        console.log(UserStore.userId)
        console.log(UserStore.role)
        console.log(UserStore.isAuth)
        UserStore.setIsWorking(localStorage.getItem('isWorking'))
        UserStore.setWorkingWindow(localStorage.getItem('workingWindow'))
        BankWindowStore.setSelectedTalonId(localStorage.getItem('selectedTalonId'))
        BankWindowStore.setSelectedTalon(localStorage.getItem('selectedTalon'))
        getAllBankWindows('number', 'asc').then(data => BankWindowStore.setBankWindows(data))
        getCashierIdByUserId(UserStore.userId)
        .then(cashierId => getServiceIdsByCashierId(cashierId)
        .then(serviceIds => getAllTalons(serviceIds)
        .then(async talons => {
            let talonsWithTypes = await Promise.all(talons.map(async talon => {
                const types = await getTypesByServiceIds(talon.serviceId); talon.type = types[0]; return talon
            })); 
            TalonStore.setTalons(talonsWithTypes)
        })))
    }, [])

    async function bankWindowButtonHandler(e) {
        localStorage.setItem('isWorking', 'true')
        localStorage.setItem('workingWindow', e.currentTarget.id)
        UserStore.setIsWorking('true')
        UserStore.setWorkingWindow(e.currentTarget.id)
        await setBankWindowUserId(e.currentTarget.id, UserStore.userId)
    }
    
    function handleMenu(e) {
        setAnchorEl(e.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null);
    }

    async function exitButtonHandler() {
        UserStore.isWorking == 'true' && await setBankWindowUserId(UserStore.workingWindow, null)
        UserStore.setIsAuth('false')
        UserStore.setRole('null')
        UserStore.setUserId('null')
        localStorage.setItem('isAuth', 'false')
        localStorage.setItem('role', 'null')
        localStorage.setItem('userId', 'null')
        localStorage.setItem('isWorking', 'false')
        localStorage.setItem('workingWindow', 'null')
        navigate('/')
    }

    function talonSelectionButtonHandler() {
        setShowTalonSelectionWindow(true)
    }

    async function selectTalonButtonHandler(id, bankWindowId, type, number) {
        BankWindowStore.selectedTalonId.length != 0 && setTalonIsActualFalse(id)
        setTalonBankWindowId(id, bankWindowId)
        .then(BankWindowStore.setSelectedTalonId(id))
        .then(BankWindowStore.setSelectedTalon(`${type}-${number}`))
        .then(localStorage.setItem('selectedTalonId', id))
        .then(localStorage.setItem('selectedTalon', `${type}-${number}`))
        .then(setShowTalonSelectionWindow(false))
    }

    function exitToWorkingWindowButtonHandler() {
        setShowTalonSelectionWindow(false)
    }

    async function quitButtonHandler() {
        await setBankWindowUserId(UserStore.workingWindow, null)
        localStorage.setItem('isWorking', 'false')
        localStorage.setItem('workingWindow', 'null')
        UserStore.setIsWorking('false')
        UserStore.setWorkingWindow('null')
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
            {UserStore.isWorking == 'true' ?
            <WorkplaceContainer>
                {showTalonSelectionWindow ? 
                <SelectTalonWindowContainer elevation={9}>
                    <Box/>
                    <SelectTalonContainer>
                        <SelectTalonTitle>Выберите талон</SelectTalonTitle>
                        {TalonStore.talons.map(talon => talon.isActual == true &&
                            <TalonButton disableRipple variant='outlined' onClick={() => selectTalonButtonHandler(talon.id, UserStore.workingWindow, talon.type, talon.number)}>
                                {`${talon.type}-${talon.number}`}
                            </TalonButton>)
                        }
                    </SelectTalonContainer>
                    <ExitToWorkingWindowButton disableRipple onClick={exitToWorkingWindowButtonHandler}>Вернуться на рабочее место</ExitToWorkingWindowButton>
                </SelectTalonWindowContainer> :
                <WorkingWindowContainer elevation={9}>
                    <WorkingWindowGrid>
                        <Box/>
                        <Box/>
                        <WorkingWindowTitle >Рабочее окно №{UserStore.workingWindow}</WorkingWindowTitle>
                        <Box/>
                        <ShutdownButton disableRipple variant='outlined' onClick={quitButtonHandler}>Завершить работу</ShutdownButton>
                    </WorkingWindowGrid>
                    <Status>{BankWindowStore.selectedTalon.length != 0 ? `В данный момент вы обслуживаете талон ${BankWindowStore.selectedTalon}` : 'В данный момент вы не обслуживаете талон'}</Status>
                    <SelectTalonButton disableRipple variant='outlined' onClick={talonSelectionButtonHandler}>{BankWindowStore.selectedTalon.length != 0 ? 'Выбрать другой талон' : 'Выбрать талон'}</SelectTalonButton>
                </WorkingWindowContainer>}
            </WorkplaceContainer> : 
            <SelectWindowContainer>
                <SelectWindowTitleBackground elevation={9}>
                    <SelectWindowTitle>Выберите окно</SelectWindowTitle>
                </SelectWindowTitleBackground>
                <SelectWindowGrid>
                    {BankWindowStore.bankWindows.map(bankWindow => (
                        <BankWindowButton 
                            disableRipple 
                            component={Paper} 
                            elevation={9} 
                            id={bankWindow.number} 
                            onClick={bankWindowButtonHandler}
                        >
                            {bankWindow.number}
                        </BankWindowButton>
                    ))}
                </SelectWindowGrid>
            </SelectWindowContainer>}
        </PageContainer>
    );
});

export default CashierPage;