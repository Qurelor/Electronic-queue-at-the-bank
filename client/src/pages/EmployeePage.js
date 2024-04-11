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
import {getAllTalons} from '../http/talonAPI';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

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
    height: '100vh',
    width: '100%'
})

const TalonSelectionGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    marginTop: '100px',
    bgcolor: 'limegreen',
    paddingBottom: '40px'
})

const TypesOfTalonsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})

const TypesOfTalonsBackground = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '100px',
    paddingRight: '100px',
    paddingTop: '10px',
    paddingBottom: '30px'
})

const TypesOfTalonsTitle = styled(Typography)({
    fontSize: '30px'
})

const TypesOfTalonsFormGroup = styled(FormGroup)({
    '& .MuiSvgIcon-root': {
        fontSize: '30px'
    },
    '& .MuiTypography-root': {
        fontSize: '30px'
    },
    '& .MuiCheckbox-root.Mui-checked': {
        color: 'limegreen'
    }
})

const SelectTalonBackground = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '30px',
    marginLeft: '100px',
    marginRight: '100px',
    paddingTop: '10px',
    paddingBottom: '50px'
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

const EmployeePage = observer(() => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [showTalonSelectionWindow, setShowTalonSelectionWindow] = useState(false);
    const [talons, setTalons] = useState([]);
    const [checkedTypeA, setCheckedTypeA] = useState(true)
    const [checkedTypeB, setCheckedTypeB] = useState(true)
    const [checkedTypeC, setCheckedTypeC] = useState(true)
    const [checkedTypeD, setCheckedTypeD] = useState(true)
    const [checkedTypeE, setCheckedTypeE] = useState(true)
    const [checkedTypeF, setCheckedTypeF] = useState(true)
    const [checkedTypeG, setCheckedTypeG] = useState(true)
    const [checkedTypeH, setCheckedTypeH] = useState(true)

    useEffect(() => {
        UserStore.setIsWorking(localStorage.getItem('isWorking'))
        UserStore.setWorkingWindow(localStorage.getItem('workingWindow'))
        getAllBankWindows('number', 'asc').then(data => BankWindowStore.setBankWindows(data))
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

    async function talonSelectionButtonHandler() {
        setShowTalonSelectionWindow(true)
    }

    async function quitButtonHandler() {
        await setBankWindowUserId(UserStore.workingWindow, null)
        localStorage.setItem('isWorking', 'false')
        localStorage.setItem('workingWindow', 'null')
        UserStore.setIsWorking('false')
        UserStore.setWorkingWindow('null')
    }

    function checkerHandler(e) {
        e.target.value == 'A' && setCheckedTypeA(e.target.checked);
        e.target.value == 'B' && setCheckedTypeB(e.target.checked)
        e.target.value == 'C' && setCheckedTypeC(e.target.checked)
        e.target.value == 'D' && setCheckedTypeD(e.target.checked)
        e.target.value == 'E' && setCheckedTypeE(e.target.checked)
        e.target.value == 'F' && setCheckedTypeF(e.target.checked)
        e.target.value == 'G' && setCheckedTypeG(e.target.checked)
        e.target.value == 'H' && setCheckedTypeH(e.target.checked)
        const types = []
        checkedTypeA && types.push('A')
        checkedTypeB && types.push('B')
        checkedTypeC && types.push('C')
        checkedTypeD && types.push('D')
        checkedTypeE && types.push('E')
        checkedTypeF && types.push('F')
        checkedTypeG && types.push('G')
        checkedTypeH && types.push('H')
        console.log(types)
    }

    function selectedTypes() {
        const types = []
        checkedTypeA && types.push('A')
        checkedTypeB && types.push('B')
        checkedTypeC && types.push('C')
        checkedTypeD && types.push('D')
        checkedTypeE && types.push('E')
        checkedTypeF && types.push('F')
        checkedTypeG && types.push('G')
        checkedTypeH && types.push('H')
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
                <TalonSelectionGrid>
                    <TypesOfTalonsContainer>
                        <TypesOfTalonsBackground elevation={9}>
                            <TypesOfTalonsTitle>Типы талонов</TypesOfTalonsTitle>
                            <TypesOfTalonsFormGroup>
                                <FormControlLabel control={<Checkbox disableRipple value={'A'} checked={checkedTypeA} onChange={(e) => checkerHandler(e)} />} label='A' />
                                <FormControlLabel control={<Checkbox disableRipple value={'B'} checked={checkedTypeB} onChange={(e) => checkerHandler(e)} />} label='B' />
                                <FormControlLabel control={<Checkbox disableRipple value={'C'} checked={checkedTypeC} onChange={(e) => checkerHandler(e)} />} label='C' />
                                <FormControlLabel control={<Checkbox disableRipple value={'D'} checked={checkedTypeD} onChange={(e) => checkerHandler(e)} />} label='D' />
                                <FormControlLabel control={<Checkbox disableRipple value={'E'} checked={checkedTypeE} onChange={(e) => checkerHandler(e)} />} label='E' />
                                <FormControlLabel control={<Checkbox disableRipple value={'F'} checked={checkedTypeF} onChange={(e) => checkerHandler(e)} />} label='F' />
                                <FormControlLabel control={<Checkbox disableRipple value={'G'} checked={checkedTypeG} onChange={(e) => checkerHandler(e)} />} label='G' />
                                <FormControlLabel control={<Checkbox disableRipple value={'H'} checked={checkedTypeH} onChange={(e) => checkerHandler(e)} />} label='H' />
                            </TypesOfTalonsFormGroup>
                        </TypesOfTalonsBackground>
                        <Box/>
                    </TypesOfTalonsContainer>
                    <SelectTalonBackground elevation={9}>
                        <SelectTalonTitle>Выберите талон</SelectTalonTitle>
                        {talons.map(talon =>
                            <TalonButton disableRipple variant='outlined' onClick={talonSelectionButtonHandler}>
                                {`${talon.type}-${talon.number}`}
                            </TalonButton>)
                        }
                    </SelectTalonBackground>
                </TalonSelectionGrid> :
                <WorkingWindowContainer elevation={9}>
                    <WorkingWindowGrid>
                        <Box/>
                        <Box/>
                        <WorkingWindowTitle >Рабочее окно №{UserStore.workingWindow}</WorkingWindowTitle>
                        <Box/>
                        <ShutdownButton disableRipple variant='outlined' onClick={quitButtonHandler}>Завершить работу</ShutdownButton>
                    </WorkingWindowGrid>
                    <Status>В данный момент вы не обслуживаете талон</Status>
                    <SelectTalonButton disableRipple variant='outlined' onClick={talonSelectionButtonHandler}>Выбрать талон</SelectTalonButton>
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

export default EmployeePage;