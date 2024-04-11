import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import {registration} from '../http/userAPI';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import UserStore from '../store/UserStore';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';

const PanelContainer = styled(Paper)({
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'sticky',
    top: '110px',
    marginLeft: '20px',
    marginRight: '20px',
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingTop: '20px',
    paddingBottom: '20px'
})

const Title = styled(Typography)({
    fontSize: '25px'
})

const PanelTextField = styled(TextField)(({errorMessage}) => ({
    marginTop: '20px',
    width: '100%',
    '& .MuiOutlinedInput-root': {
        fontSze: '15px'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: errorMessage.length > 0 ? 'red' : 'limegreen'
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: errorMessage.length > 0 ? 'red' : 'limegreen'
    },
    '& .MuiInputLabel-root': {
        fontSize: '15px'
    }
}))

const RoleFormControl = styled(FormControl)({
    marginTop: '10px'
})

const RoleFormLabel = styled(FormLabel)({
    fontSize: '15px',
    color: 'black',
    '&.Mui-focused': {
        color: 'black'
    }
})

const RoleRadioGroup = styled(RadioGroup)({
    color: 'black',
    '& .MuiTypography-root': {
        fontSize: '15px'
    },
    '& .MuiRadio-root.Mui-checked': {
        color: 'limegreen', 
        fontSize: '30px'
    }
})

const RegButton = styled(Button)({
    marginTop: '10px',
    fontSize: '25px',
    backgroundColor: 'limegreen',
    color: 'black',
    textTransform: 'none',
    ':hover': {
        backgroundColor: 'black',
        color: 'white'
    }
})

const AddUserPanel = () => {

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
    const [role, setRole] = useState('USER')
    const [open, setOpen] = useState(false)

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

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
            const user = await registration((patronymic.length > 0) ? `${surname} ${name} ${patronymic}` : `${surname} ${name}`, email, password, role)
            if(user == 'Пользователь с таким адресом электронной почты уже существует'){
                setEmailErrorMessage(user)
            }else{
                UserStore.addUser(user)
                setOpen(true)
            }
        }
    }

    const handleChangeRole = (e) => {
        setRole(e.target.value)
    }

    function handleCloseAlert() {
        setOpen(false)
    }

    return (
        <PanelContainer elevation={9}>
                <Title>Создание пользователя</Title>
                <PanelTextField 
                    label='Имя' 
                    onChange={e => setName(e.target.value)} 
                    error={nameErrorMessage.length == 0 ? false : true} 
                    helperText={nameErrorMessage.length == 0 ? false : nameErrorMessage} 
                    variant='outlined'
                    errorMessage={nameErrorMessage}
                />
                <PanelTextField 
                    label='Фамилия'
                    onChange={e => setSurname(e.target.value)} 
                    error={surnameErrorMessage.length == 0 ? false : true} 
                    helperText={surnameErrorMessage.length == 0 ? false : surnameErrorMessage} 
                    variant='outlined'
                    errorMessage={surnameErrorMessage}
                />
                <PanelTextField 
                    label='Отчество (необязательно)' 
                    onChange={e => setPatronymic(e.target.value)} 
                    error={patronymicErrorMessage.length == 0 ? false : true} 
                    helperText={patronymicErrorMessage.length == 0 ? false : patronymicErrorMessage} 
                    variant='outlined'
                    errorMessage={patronymicErrorMessage}
                />
                <PanelTextField 
                    label='Адрес электронной почты' 
                    onChange={e => setEmail(e.target.value)} 
                    error={emailErrorMessage.length == 0 ? false : true} 
                    helperText={emailErrorMessage.length == 0 ? false : emailErrorMessage} 
                    variant='outlined'
                    errorMessage={emailErrorMessage}
                />
                <PanelTextField 
                    label='Пароль'
                    onChange={e => setPassword(e.target.value)} 
                    error={passwordErrorMessage.length == 0 ? false : true} 
                    helperText={passwordErrorMessage.length == 0 ? false : passwordErrorMessage} 
                    variant='outlined'
                    errorMessage={passwordErrorMessage}
                />
                <RoleFormControl>
                    <RoleFormLabel>Роль</RoleFormLabel>
                    <RoleRadioGroup
                        value={role}
                        onChange={handleChangeRole}
                    >
                        <FormControlLabel value='ADMIN' control={<Radio />} label='Администратор'/>
                        <FormControlLabel value='EMPLOYEE' control={<Radio />} label='Работник банка'/>
                        <FormControlLabel value='USER' control={<Radio />} label='Пользователь'/>
                    </RoleRadioGroup>
                </RoleFormControl>
                <RegButton disableRipple variant='contained' onClick={regButtonHandler}>Создать пользователя</RegButton>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert} TransitionComponent={Slide}>
                    <Alert
                        severity='success'
                        variant='filled'
                    >
                        Пользователь успешно создан!
                    </Alert>
                </Snackbar>
        </PanelContainer>
    );
};

export default AddUserPanel;