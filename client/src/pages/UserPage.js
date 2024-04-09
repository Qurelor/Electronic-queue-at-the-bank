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
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'limegreen', height: '100%'}}>
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
            {messageActive ?
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '70px', height: 'calc(100vh - 70px)', width: '100vw', bgcolor: 'limegreen'}}>
                <Paper elevation={9} sx={{display: 'grid', gridTemplateRows: '1fr 1fr 1fr', fontSize: '30px', width: '700px', height: '500px'}}>
                    <Box />
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <CheckCircleOutlineIcon sx={{fontSize: '130px', color: 'limegreen'}}></CheckCircleOutlineIcon>
                        Ваш талон: {talonNumber}
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Button disableRipple variant='outlined' onClick={takeTalonAgainButtonHandler} sx={{fontWeight: 'bold', border: '2px solid', color: 'limegreen', bgcolor: 'white', borderColor: 'limegreen', fontSize: 25, textTransform: 'none', mb: '20px', ':hover': {border: '2px solid', color: 'black', borderColor: 'black', bgcolor: 'white'}}}>Взять еще один талон</Button>
                        <Button disableRipple variant='outlined' onClick={exitToHomePageButtonHandler} sx={{fontWeight: 'bold', border: '2px solid', color: 'limegreen', bgcolor: 'white', borderColor: 'limegreen', fontSize: 25, textTransform: 'none', mb: '20px', ml: '10px', ':hover': {border: '2px solid', color: 'black', borderColor: 'black', bgcolor: 'white'}}}>Выйти</Button>
                    </Box>
                </Paper>
            </Box> :
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Paper elevation={9} sx={{mt: '100px', px: '60px', py: '10px'}}>
                        <Typography sx={{color: 'limegreen', fontSize: '30px', fontWeight: 'bold'}}>Выберите услугу</Typography>
                </Paper>
                <Box sx={{mt: '20px', px: '60px', pb: '40px', width: '100%'}}>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('A')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Банковский перевод</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('A')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Закрытие счета с БПК</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('B')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Консультация, открытие вклада</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('B')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Консультация, оформление карточки</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('C')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Консультация, оформление потребительского кредита</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('C')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Оформление доверенностей/завещаний</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('D')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Оформление справок, выписок</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('D')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Покупка/продажа облигаций Банка</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('E')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Получение карточки, изъятой из банкомата</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('E')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Получение/замена карты</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('F')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Прием и выдача наличных</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('F')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Проверка подлинности банкнот</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('G')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Продажа слитком, монет</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('G')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Снятие наличных без карты</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('H')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Юрлица - Переоформление счета / карточки с образцами подписей</Button>
                    <Button disableRipple component={Paper} elevation={9} onClick={() => talonButtonHandler('H')} sx={{bgcolor: 'white', width: '100%', fontSize: '30px', color: 'limegreen', justifyContent: 'left', pl: '20px', ':hover': {bgcolor: 'white', border: '5px solid black', color: 'black'}}}>Юрлица - Эквайринг</Button>
                </Box>
            </Box>
            }
        </Box>
    );
});

export default UserPage;