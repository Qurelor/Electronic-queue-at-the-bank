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
            const user = await registration((patronymic.length > 0) ? (surname + ' ' + name + ' ' + patronymic) : (surname + ' ' + name), email, password, role)
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
        <Paper elevation={9} sx={{ml: '20px', mr: '20px', px: '40px', py: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '450px', position: 'sticky', top: '110px'}}>
                <Typography sx={{fontSize: '25px'}}>Создание пользователя</Typography>
                <TextField label="Имя" onChange={e => setName(e.target.value)} error={nameErrorMessage.length == 0 ? false : true} helperText={nameErrorMessage.length == 0 ? false : nameErrorMessage} variant="outlined" sx={{mt: '20px', width: '100%', '& .MuiOutlinedInput-root': {fontSize: '15px'}, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: nameErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root.Mui-focused': {color: nameErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root': {fontSize: '15px'}}}/>
                <TextField label="Фамилия" onChange={e => setSurname(e.target.value)} error={surnameErrorMessage.length == 0 ? false : true} helperText={surnameErrorMessage.length == 0 ? false : surnameErrorMessage} variant="outlined" sx={{mt: '20px', width: '100%', '& .MuiOutlinedInput-root': {fontSize: '15px'}, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: surnameErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root.Mui-focused': {color: surnameErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root': {fontSize: '15px'}}}/>
                <TextField label="Отчество (необязательно)" onChange={e => setPatronymic(e.target.value)} error={patronymicErrorMessage.length == 0 ? false : true} helperText={patronymicErrorMessage.length == 0 ? false : patronymicErrorMessage} variant="outlined" sx={{mt: '20px', width: '100%', '& .MuiOutlinedInput-root': {fontSize: '15px'}, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: patronymicErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root.Mui-focused': {color: patronymicErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root': {fontSize: '15px'}}}/>
                <TextField label="Адрес электронной почты" onChange={e => setEmail(e.target.value)} error={emailErrorMessage.length == 0 ? false : true} helperText={emailErrorMessage.length == 0 ? false : emailErrorMessage} variant="outlined" sx={{mt: '20px', width: '100%', '& .MuiOutlinedInput-root': {fontSize: '15px'}, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: emailErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root.Mui-focused': {color: emailErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root': {fontSize: '15px'}}}/>
                <TextField label="Пароль" onChange={e => setPassword(e.target.value)} error={passwordErrorMessage.length == 0 ? false : true} helperText={passwordErrorMessage.length == 0 ? false : passwordErrorMessage} variant="outlined" sx={{mt: '20px', width: '100%', '& .MuiOutlinedInput-root': {fontSize: '15px'}, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: passwordErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root.Mui-focused': {color: passwordErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root': {fontSize: '15px'}}}/>
                <FormControl sx={{mt: '10px'}}>
                    <FormLabel id="demo-row-radio-buttons-group-label"  sx={{fontSize: '15px', color: 'black', '&.Mui-focused': {color: 'black'}}}>Роль</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={role}
                        onChange={handleChangeRole}
                        sx={{color: 'black', '& .MuiTypography-root': {fontSize: '15px'}, '& .MuiRadio-root.Mui-checked': {color: 'limegreen', fontSize: '30px'}}}
                    >
                        <FormControlLabel value="ADMIN" control={<Radio />} label="Администратор"/>
                        <FormControlLabel value="EMPLOYEE" control={<Radio />} label="Работник банка" />
                        <FormControlLabel value="USER" control={<Radio />} label="Пользователь" />
                    </RadioGroup>
                </FormControl>
                <Button disableRipple variant='contained' onClick={regButtonHandler} sx={{mt: '10px', fontSize: '25px', bgcolor: 'limegreen', color: 'black', textTransform: 'none', ':hover': {bgcolor: 'black', color: 'white'}}}>Создать пользователя</Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert} TransitionComponent={Slide}>
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Пользователь успешно создан!
                    </Alert>
                </Snackbar>
            </Paper>
    );
};

export default AddUserPanel;