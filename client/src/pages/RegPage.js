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
import { styled } from '@mui/material/styles';
import {EMAIL_REGEXP} from '../constants';
import {jwtDecode} from 'jwt-decode';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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

const RegWindow = styled(Paper)({
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

const StyledTextField = styled(TextField)(({errorMessage}) => ({
    marginTop: '20px',
    width: '400px',
    fontSize: '30px',
    '& .MuiOutlinedInput-root': {
        fontSize: '20px'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: errorMessage.length > 0 ? 'red' : 'limegreen'
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: errorMessage.length > 0 ? 'red' : 'limegreen'
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

const AuthButtonContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row'
})

const Question = styled(Typography)({
    marginTop: '20px',
    fontSize: '20px'
})

const AuthButton = styled(Link)({
    marginTop: '17.5px',
    marginLeft: '5px',
    color: 'limegreen',
    fontSize: '22px',
    textDecoration: 'none'
})

const RegButton = styled(Button)({
    marginTop: '15px',
    fontSize: '25px',
    backgroundColor: 'limegreen',
    color: 'black',
    textTransform: 'none',
    ':hover': {
        backgroundColor: 'black', color: 'white'
    }
})

const Loading = styled(Backdrop)(({theme}) => ({
    zIndex: theme.zIndex.modal + 1
}))

const LoadingIcon = styled(CircularProgress)({
    color: 'limegreen'
})

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
    const [isLoading, setIsLoading] = useState(false);

    function logoButtonHandler() {
        navigate('/')
    }

    function handleClickShowPassword() {
        setShowPassword((show) => !show)
    }

    function checkName() {
        if (name.length == 0) {
            setNameErrorMessage('Введите имя')
            return false
        } else if (name.length > 20) {
            setNameErrorMessage('Имя должно содержать до 20 символов')
            return false
        } else {
            setNameErrorMessage('')
            return true
        }
    }

    function checkSurname() {
        if (surname.length == 0) {
            setSurnameErrorMessage('Введите фамилию')
            return false
        } else if (surname.length > 20) {
            setSurnameErrorMessage('Фамилия должна содержать до 20 символов')
            return false
        } else {
            setSurnameErrorMessage('')
            return true
        }
    }

    function checkPatronymic() {
        if (patronymic.length > 20) {
            setPatronymicErrorMessage('Отчество должно содержать до 20 символов')
            return false
        } else {
            setPatronymicErrorMessage('')
            return true
        }
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

    async function regButtonHandler() {
        setIsLoading(true)
        checkName()
        checkSurname()
        checkPatronymic()
        checkEmail()
        checkPassword()
        if (checkName() && checkSurname() && checkPatronymic() && checkEmail() && checkPassword()) {
            const response = await registration((patronymic.length > 0) ? `${surname} ${name} ${patronymic}` : `${surname} ${name}`, email, password, 'USER')
            if (response == 'Пользователь с таким адресом электронной почты уже существует') {
                setEmailErrorMessage(response)
            } else {
                localStorage.setItem('token', response.token)
                const user = jwtDecode(response.token)
                UserStore.setUser(user)
                navigate('/')
            }
        }
        setIsLoading(false)
    }

    return (
        <PageContainer>
            <Header>
                <HeaderContentContainer>
                    <Logo onClick={logoButtonHandler}>БЕЛБАНК</Logo>
                </HeaderContentContainer>
            </Header>
            <RegWindow elevation={9}>
                <Title sx={{fontSize: '30px'}}>Регистрация</Title>
                <StyledTextField 
                    label='Имя' 
                    onChange={e => setName(e.target.value)} 
                    error={nameErrorMessage.length == 0 ? false : true} 
                    helperText={nameErrorMessage.length == 0 ? false : nameErrorMessage} 
                    variant='outlined'
                    errorMessage={nameErrorMessage}
                />
                <StyledTextField 
                    label='Фамилия' 
                    onChange={e => setSurname(e.target.value)} 
                    error={surnameErrorMessage.length == 0 ? false : true} 
                    helperText={surnameErrorMessage.length == 0 ? false : surnameErrorMessage} 
                    variant='outlined'
                    errorMessage={surnameErrorMessage}
                />
                <StyledTextField 
                    label='Отчество (необязательно)'
                    onChange={e => setPatronymic(e.target.value)} 
                    error={patronymicErrorMessage.length == 0 ? false : true} 
                    helperText={patronymicErrorMessage.length == 0 ? false : patronymicErrorMessage} 
                    variant='outlined'
                    errorMessage={patronymicErrorMessage}
                />
                <StyledTextField 
                    label='Адрес электронной почты'
                    onChange={e => setEmail(e.target.value)} 
                    error={emailErrorMessage.length == 0 ? false : true} 
                    helperText={emailErrorMessage.length == 0 ? false : emailErrorMessage} 
                    variant='outlined'
                    errorMessage={emailErrorMessage}
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
                <AuthButtonContainer>
                    <Question>Есть аккаунт?</Question>
                    <AuthButton href='/auth'>Войти</AuthButton>
                </AuthButtonContainer>
                <RegButton disableRipple variant='contained' onClick={regButtonHandler}>Создать аккаунт</RegButton>
            </RegWindow>
            <Loading
                    open={isLoading}
            >
                <LoadingIcon/>
            </Loading>
        </PageContainer>
    );
};

export default RegPage;