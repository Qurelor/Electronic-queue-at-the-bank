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
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'limegreen', minHeight: '100vh'}}>
            <AppBar sx={{backgroundColor: 'white', height: '70px'}}>
                <Toolbar sx={{height: '70px'}}>
                    <Link href='/' underline='none' sx={{color: 'limegreen', fontSize: '40px', fontWeight: 'bold', ':hover': {color: 'black', bgcolor: 'white'}}}>БЕЛБАНК</Link>
                    <Box sx={{display: 'flex', marginLeft: 'auto'}}>
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
            {UserStore.isWorking == 'true' ?
            <Box sx={{height: '100vh', width: '100%'}}>
                {showTalonSelectionWindow ? 
                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', mt: '100px', bgcolor: 'limegreen', pb: '40px'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Paper elevation={9} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', px: '100px', py: '10px', pb: '20px'}}>
                            <Typography sx={{fontSize: '30px'}}>Типы талонов</Typography>
                            <FormGroup sx={{'& .MuiSvgIcon-root': {fontSize: '30px'}, '& .MuiTypography-root': {fontSize: '30px'}, '& .MuiCheckbox-root.Mui-checked': {color: 'limegreen'}}}>
                                <FormControlLabel control={<Checkbox disableRipple value={'A'} checked={checkedTypeA} onChange={(e) => checkerHandler(e)} />} label="A" />
                                <FormControlLabel control={<Checkbox disableRipple value={'B'} checked={checkedTypeB} onChange={(e) => checkerHandler(e)} />} label="B" />
                                <FormControlLabel control={<Checkbox disableRipple value={'C'} checked={checkedTypeC} onChange={(e) => checkerHandler(e)} />} label="C" />
                                <FormControlLabel control={<Checkbox disableRipple value={'D'} checked={checkedTypeD} onChange={(e) => checkerHandler(e)} />} label="D" />
                                <FormControlLabel control={<Checkbox disableRipple value={'E'} checked={checkedTypeE} onChange={(e) => checkerHandler(e)} />} label="E" />
                                <FormControlLabel control={<Checkbox disableRipple value={'F'} checked={checkedTypeF} onChange={(e) => checkerHandler(e)} />} label="F" />
                                <FormControlLabel control={<Checkbox disableRipple value={'G'} checked={checkedTypeG} onChange={(e) => checkerHandler(e)} />} label="G" />
                                <FormControlLabel control={<Checkbox disableRipple value={'H'} checked={checkedTypeH} onChange={(e) => checkerHandler(e)} />} label="H" />
                            </FormGroup>
                        </Paper>
                        <Box sx={{width: '300px'}}/>
                    </Box>
                    <Paper elevation={9} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '30px', mx: '100px', py: '10px', pb: '40px'}}>
                        <Typography sx={{fontSize: '30px'}}>Выберите талон</Typography>
                        {talons.map(talon =><Button disableRipple variant='outlined' onClick={talonSelectionButtonHandler} sx={{fontWeight: 'bold', border: '2px solid', color: 'limegreen', bgcolor: 'white', borderColor: 'limegreen', fontSize: '30px', textTransform: 'none', width: '200px', mt: '10px', ':hover': {border: '2px solid black', color: 'black', bgcolor: 'white'}}}>{talon.type + '-' + talon.number}</Button>)}
                    </Paper>
                </Box> :
                    <Paper elevation={9} sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', mt: '100px', pt: '10px', pb: '40px'}}>
                    <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'}}>
                        <Box/>
                        <Box/>
                        <Typography sx={{color: 'limegreen', fontSize: '30px', fontWeight: 'bold', textAlign: 'center'}}>Рабочее окно №{UserStore.workingWindow}</Typography>
                        <Box/>
                        <Button disableRipple variant='outlined' onClick={quitButtonHandler} sx={{fontWeight: 'bold', border: '2px solid', color: 'crimson', bgcolor: 'white', borderColor: 'crimson', fontSize: '30px', textTransform: 'none', ':hover': {border: '2px solid', color: 'red', borderColor: 'red', bgcolor: 'white'}}}>Завершить работу</Button>
                    </Box>
                    <Typography sx={{fontSize: '30px', mt: '200px'}}>В данный момент вы не обслуживаете талон</Typography>
                    <Button disableRipple variant='outlined' onClick={talonSelectionButtonHandler} sx={{fontWeight: 'bold', border: '2px solid', color: 'limegreen', bgcolor: 'white', borderColor: 'limegreen', fontSize: '30px', textTransform: 'none', mt: '200px', ':hover': {border: '2px solid', color: 'black', borderColor: 'black', bgcolor: 'white'}}}>Выбрать талон</Button>
                </Paper>}
            </Box> : 
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'limegreen', pb: '40px', height: '100%'}}>
                <Paper elevation={9} sx={{mt: '100px', px: '60px', py: '10px'}}>
                    <Typography sx={{color: 'limegreen', fontSize: '30px', fontWeight: 'bold'}}>Выберите окно</Typography>
                </Paper>
                <Box sx={{display: 'grid', justifyContent: 'center', gridTemplateColumns: '300px 300px 300px 300px 300px', gap: '10px', width: '100%', mt: '10px', bgcolor: 'limegreen'}}>
                    {BankWindowStore.bankWindows.map(bankWindow => (
                    <Button disableRipple component={Paper} elevation={9} id={bankWindow.number} onClick={bankWindowButtonHandler} sx={{bgcolor: 'white', width: '300px', height: '300px', fontSize: '30px', color: 'limegreen', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>{bankWindow.number}</Button>
                    ))}
                </Box>
            </Box>}
        </Box>
    );
});

export default EmployeePage;