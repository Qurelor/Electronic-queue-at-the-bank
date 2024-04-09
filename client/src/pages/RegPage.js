import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import {registration} from '../http/userAPI';
import UserStore from '../store/UserStore';

const RegPage = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [nameErrorMessage, setNameErrorMessage] = useState('')
    const [surname, setSurname] = useState('')
    const [surnameErrorMessage, setSurnameErrorMessage] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [patronymicErrorMessage, setPatronymicErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [checkError, setCheckError] = useState(false)

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function handleClickShowPassword() {
        setShowPassword((show) => !show)
    }

    function checkName() {
        if(name.length == 0){
            setNameErrorMessage('Введите имя')
            return false
        } else if (name.length > 20){
            setNameErrorMessage('Имя должно содержать до 20 символов')
            return false
        } else {
            setNameErrorMessage('')
            return true
        }
    }

    function checkSurname() {
        if(surname.length == 0){
            setSurnameErrorMessage('Введите фамилию')
            return false
        } else if (surname.length > 20){
            setSurnameErrorMessage('Фамилия должна содержать до 20 символов')
            return false
        } else {
            setSurnameErrorMessage('')
            return true
        }
    }

    function checkPatronymic() {
        if(patronymic.length > 20){
            setPatronymicErrorMessage('Отчество должно содержать до 20 символов')
            return false
        } else {
            setPatronymicErrorMessage('')
            return true
        }
    }

    function checkEmail() {
        if(email.length == 0){
            setEmailErrorMessage('Введите адрес электронной почты')
            return false
        } else if (!EMAIL_REGEXP.test(email)){
            setEmailErrorMessage('Некорректный адрес электронной почты')
            return false
        } else if (email.length < 6 || email.length > 30){
            setEmailErrorMessage('Адрес электронной почты должен содержать от 6 до 30 символов')
            return false
        } else {
            setEmailErrorMessage('')
            return true
        }
    }

    function checkPassword() {
        if(password.length == 0){
            setPasswordErrorMessage('Введите пароль')
            return false
        } else if (password.length < 6 || password.length > 30){
            setPasswordErrorMessage('Пароль должен содержать от 6 до 30 символов')
            return false
        } else {
            setPasswordErrorMessage('')
            return true
        }
    }

    async function regButtonHandler() {
        checkName()
        checkSurname()
        checkPatronymic()
        checkEmail()
        checkPassword()
        if(checkName() && checkSurname() && checkPatronymic() && checkEmail() && checkPassword()){
            const user = await registration((patronymic.length > 0) ? `${surname} ${name} ${patronymic}` : `${surname} ${name}`, email, password, 'USER')
            if(user == 'Пользователь с таким адресом электронной почты уже существует'){
                setEmailErrorMessage(user)
            }else{
                UserStore.setIsAuth('true')
                UserStore.setRole(user.role)
                UserStore.setUserId(user.userId)
                localStorage.setItem('isAuth', 'true')
                localStorage.setItem('role', user.role)
                localStorage.setItem('userId', user.id)
                navigate('/')
            }
        }
    }

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: 'limegreen'}}>
            <AppBar sx={{backgroundColor: 'white', height: '70px'}}>
                <Toolbar sx={{height: '70px'}}>
                    <Link href='/' underline='none' sx={{color: 'limegreen', fontSize: '40px', fontWeight: 'bold', ':hover': {color: 'black', bgcolor: 'white'}}}>БЕЛБАНК</Link>
                </Toolbar>
            </AppBar>
            <Paper elevation={9} sx={{px: '40px', py: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography sx={{fontSize: '30px'}}>Регистрация</Typography>
                <TextField label="Имя" onChange={e => setName(e.target.value)} error={nameErrorMessage.length == 0 ? false : true} helperText={nameErrorMessage.length == 0 ? false : nameErrorMessage} variant="outlined" sx={{mt: '20px', width: '400px', fontSize: '30px', '& .MuiOutlinedInput-root': {fontSize: '20px'}, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: nameErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root.Mui-focused': {color: nameErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root': {fontSize: '20px'}}}/>
                <TextField label="Фамилия" onChange={e => setSurname(e.target.value)} error={surnameErrorMessage.length == 0 ? false : true} helperText={surnameErrorMessage.length == 0 ? false : surnameErrorMessage} variant="outlined" sx={{mt: '20px', width: '400px', fontSize: '30px', '& .MuiOutlinedInput-root': {fontSize: '20px'}, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: surnameErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root.Mui-focused': {color: surnameErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root': {fontSize: '20px'}}}/>
                <TextField label="Отчество (необязательно)" onChange={e => setPatronymic(e.target.value)} error={patronymicErrorMessage.length == 0 ? false : true} helperText={patronymicErrorMessage.length == 0 ? false : patronymicErrorMessage} variant="outlined" sx={{mt: '20px', width: '400px', fontSize: '30px', '& .MuiOutlinedInput-root': {fontSize: '20px'}, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: patronymicErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root.Mui-focused': {color: patronymicErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root': {fontSize: '20px'}}}/>
                <TextField label="Адрес электронной почты" onChange={e => setEmail(e.target.value)} error={emailErrorMessage.length == 0 ? false : true} helperText={emailErrorMessage.length == 0 ? false : emailErrorMessage} variant="outlined" sx={{mt: '20px', width: '400px', fontSize: '30px', '& .MuiOutlinedInput-root': {fontSize: '20px'}, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: emailErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root.Mui-focused': {color: emailErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root': {fontSize: '20px'}}}/>
                <FormControl sx={{mt: '20px', width: '400px', '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: passwordErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root.Mui-focused': {color: passwordErrorMessage.length > 0 ? 'red' : 'limegreen'}}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" sx={{fontSize: '20px', color: passwordErrorMessage.length > 0 ? '#d32f2f' : ''}}>Пароль</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={e => setPassword(e.target.value)}
                        error={passwordErrorMessage.length == 0 ? false : true}
                        helperText={passwordErrorMessage.length == 0 ? false : passwordErrorMessage}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        sx={{fontSize: '20px'}}
                        label="Пароль"
                    />
                    {passwordErrorMessage.length > 0 && (<FormHelperText error>
                        {passwordErrorMessage}
                    </FormHelperText>)}
                </FormControl>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Typography sx={{mt: '20px', fontSize: '20px'}}>Есть аккаунт?</Typography>
                    <Link href='/auth' underline='none' sx={{mt: '17.5px', ml: '5px', color: 'limegreen', fontSize: '22px'}}>Войти</Link>
                </Box>
                <Button disableRipple variant='contained' onClick={regButtonHandler} sx={{mt: '15px', fontSize: '25px', bgcolor: 'limegreen', color: 'black', textTransform: 'none', ':hover': {bgcolor: 'black', color: 'white'}}}>Создать аккаунт</Button>
            </Paper>
        </Box>
    );
};

export default RegPage;