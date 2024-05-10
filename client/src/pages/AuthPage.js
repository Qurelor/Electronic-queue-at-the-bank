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
import {auth} from '../http/userAPI';
import UserStore from '../store/UserStore';
import { styled } from '@mui/material/styles';
import {EMAIL_REGEXP} from '../constants'

const PageContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'limegreen'
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

const AuthWindow = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingTop: '20px',
    paddingBottom: '20px'
})

const Title = styled(Typography)({
    fontSize: '30px'
})

const EmailTextField = styled(TextField)(({emailErrorMessage}) => ({
    marginTop: '20px',
    width: '400px',
    fontSize: '30px',
    '& .MuiOutlinedInput-root': {
        fontSize: '20px'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: emailErrorMessage.length > 0 ? 'red' : 'limegreen'
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: emailErrorMessage.length > 0 ? 'red' : 'limegreen'
    },
    '& .MuiInputLabel-root': {
        fontSize: '20px'
    }
}))

const PasswordFormControl = styled(FormControl)(({passwordErrorMessage}) => ({
    marginTop: '20px',
    width: '400px',
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: passwordErrorMessage.length > 0 ? 'red' : 'limegreen'
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: passwordErrorMessage.length > 0 ? 'red' : 'limegreen'
    }
}))

const PasswordInputLabel = styled(InputLabel)(({passwordErrorMessage}) => ({
    fontSize: '20px',
    color: passwordErrorMessage.length > 0 ? '#d32f2f' : ''
}))

const PasswordOutlinedInput = styled(OutlinedInput)({
    fontSize: '20px',
})

const RegButtonContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row'
})

const Question = styled(Typography)({
    marginTop: '20px',
    fontSize: '20px'
})

const RegButton = styled(Link)({
    marginTop: '17.5px',
    marginLeft: '5px',
    color: 'limegreen',
    fontSize: '22px',
    textDecoration: 'none'
})

const AuthButton = styled(Button)({
    marginTop: '15px',
    fontSize: '25px',
    backgroundColor: 'limegreen',
    color: 'black',
    textTransform: 'none',
    ':hover': {
        backgroundColor: 'black', color: 'white'
    }
})

const AuthPage = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [authErrorMessage, setAuthErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    function logoButtonHandler() {
        navigate('/')
    }

    function handleClickShowPassword() {
        setShowPassword((show) => !show)
    }

    function checkEmail() {
        if (email.length == 0) {
            setEmailErrorMessage('Введите адрес электронной почты')
            return false
        } else if (!EMAIL_REGEXP.test(email)) {
            setEmailErrorMessage('Некорректный адрес электронной почты')
            return false
        } else if (email.length < 6 || email.length > 30) {
            setEmailErrorMessage('Адрес электронной почты должен содержать от 6 до 30 символов')
            return false
        } else {
            setEmailErrorMessage('')
            return true
        }
    }

    function checkPassword() {
        if (password.length == 0) {
            setPasswordErrorMessage('Введите пароль')
            return false
        } else if (password.length < 6 || password.length > 30) {
            setPasswordErrorMessage('Пароль должен содержать от 6 до 30 символов')
            return false
        } else {
            setPasswordErrorMessage('')
            return true
        }
    }

    async function authButtonHandler() {
        setAuthErrorMessage('')
        checkEmail()
        checkPassword()
        if (checkEmail() && checkPassword()) {
            const user = await auth(email, password)
            if (user == 'Неправильный адрес электронной почты или пароль') {
                setAuthErrorMessage(user)
            } else {
                UserStore.setIsAuth('true')
                UserStore.setRole(user.role)
                UserStore.setUserId(user.id)
                localStorage.setItem('isAuth', 'true')
                localStorage.setItem('role', user.role)
                localStorage.setItem('userId', user.id)
                navigate('/')
            }
        }
    }

    return (
        <PageContainer>
            <Header>
                <HeaderContentContainer>
                    <Logo onClick={logoButtonHandler}>БЕЛБАНК</Logo>
                </HeaderContentContainer>
            </Header>
            <AuthWindow elevation={9}>
                <Title>Вход</Title>
                <EmailTextField
                    variant='outlined' 
                    label="Адрес электронной почты" 
                    onChange={e => setEmail(e.target.value)} 
                    error={emailErrorMessage.length == 0 ? false : true} 
                    helperText={emailErrorMessage.length == 0 ? false : emailErrorMessage}
                    emailErrorMessage={emailErrorMessage}
                />
                <PasswordFormControl variant='outlined' passwordErrorMessage={passwordErrorMessage}>
                    <PasswordInputLabel htmlFor='outlined-adornment-password' passwordErrorMessage={passwordErrorMessage}>Пароль</PasswordInputLabel>
                    <PasswordOutlinedInput
                        id='outlined-adornment-password'
                        type={showPassword ? 'text' : 'password'}
                        onChange={e => setPassword(e.target.value)}
                        error={passwordErrorMessage.length == 0 ? false : true}
                        helperText={passwordErrorMessage.length == 0 ? false : passwordErrorMessage}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    edge='end'
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Пароль'
                    />
                    {passwordErrorMessage.length > 0 && (<FormHelperText error>
                        {passwordErrorMessage}
                    </FormHelperText>)}
                </PasswordFormControl>
                {authErrorMessage.length > 0 && (<FormHelperText error>
                        {authErrorMessage}
                </FormHelperText>)}
                <RegButtonContainer>
                    <Question>Нет аккаунта?</Question>
                    <RegButton href='/reg'>Создать аккаунт</RegButton>
                </RegButtonContainer>
                <AuthButton disableRipple variant='contained' onClick={authButtonHandler}>Войти</AuthButton>
            </AuthWindow>
        </PageContainer>
    );
};

export default AuthPage;