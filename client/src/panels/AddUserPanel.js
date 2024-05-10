import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {useState, useEffect} from 'react';
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
import {createCashier} from '../http/cashierAPI';
import {EMAIL_REGEXP} from '../constants'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ServiceStore from '../store/ServiceStore';
import {getAllServicesWithoutCashier, setServiceCashierId} from '../http/serviceAPI';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

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

const CashierButton = styled(Button)({
    backgroundColor: 'limegreen',
    color: 'black',
    textTransform: 'none',
    fontSize: '15px',
    borderColor: 'limegreen',
    ':hover': {
        borderColor: 'limegreen',
        backgroundColor: 'black',
        color: 'white'
    },
    minWidth: '100%'
})

const StyledTypography = styled(Typography)({
    marginRight: 'auto'
})

const StyledDialog = styled(Dialog)({
    '& .MuiDialog-paper': {
        margin: '0px',
        maxWidth: '100%',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px'
    }
})

const StyledDialogTitle = styled(DialogTitle)({
    '& .MuiDialogTitle-root': {
        fontSize: '25px'
    },
})

const StyledFormGroup = styled(FormGroup)({
    '& .MuiTypography-root': {
        fontSize: '15px'
    }
})

const StyledCheckbox = styled(Checkbox)({
    '&.Mui-checked': {
        color: 'limegreen'
    }
})

const MessageBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

const StyledButton = styled(Button)({
    backgroundColor: 'limegreen',
    color: 'black',
    ':hover': {
        backgroundColor: 'black',
        color: 'white'
    },
    marginTop: '20px',
    fontSize: '15px'
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
    const [serviceErrorMessage, setServiceErrorMessage] = useState('')
    const [role, setRole] = useState('USER')
    const [openDialog, setOpenDialog] = useState(false)
    const typesTemp = {}
    const [types, setTypes] = useState({})
    const [confirmedTypes, setConfirmedTypes] = useState({})
    const [selectedTypeIds, setSelectedTypeIds] = useState([])
    const [selectedTypeNames, setSelectedTypeNames] = useState([])
    const [openAlert, setOpenAlert] = useState(false)

    useEffect(() => {
        getAllServicesWithoutCashier('id', 'asc').then((data) => {ServiceStore.setServices(data); return ServiceStore.services})
            .then(services => {services.map(service => typesTemp[`${service.type}`] = false); return typesTemp})
            .then(typesTemp => {setTypes(typesTemp); setConfirmedTypes(typesTemp)})
    }, [])

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

    const handleChangeRole = (e) => {
        setRole(e.target.value)
    }

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setTypes(confirmedTypes)
    };

    function typeCheckboxHandler(e) {
        setTypes({...types, [e.target.name]: e.target.checked})
    }

    function confirmButtonHandler() {
        setConfirmedTypes(types)
        let tempIdArray = []
        let tempNameArray = []
        ServiceStore.services.map(service => types[`${service.type}`] && tempIdArray.push(service.id) && tempNameArray.push(service.type))
        setSelectedTypeIds(tempIdArray)
        setSelectedTypeNames(tempNameArray)
        setOpenDialog(false);
    }

    async function regButtonHandler() {
        checkName()
        checkSurname()
        checkPatronymic()
        checkEmail()
        checkPassword()
        if (checkName() && checkSurname() && checkPatronymic() && checkEmail() && checkPassword()) {
            const user = await registration((patronymic.length > 0) ? `${surname} ${name} ${patronymic}` : `${surname} ${name}`, email, password, role)
            if (user == 'Пользователь с таким адресом электронной почты уже существует') {
                setEmailErrorMessage(user)
            } else {
                if(user.role == 'CASHIER') {
                    const cashier = await createCashier(user.id)
                    selectedTypeIds.length != 0 && selectedTypeIds.forEach(selectedTypeId => {setServiceCashierId(selectedTypeId, cashier.id); ServiceStore.deleteService(selectedTypeId)})
                }
                console.log(user)
                UserStore.addUser(user)
                setName('')
                setSurname('')
                setPatronymic('')
                setEmail('')
                setPassword('')
                setRole('USER')
                setTypes(typesTemp)
                setConfirmedTypes(typesTemp)
                setSelectedTypeNames([])
                setSelectedTypeIds([])
                setOpenAlert(true)
            }
        }
    }

    function handleCloseAlert() {
        setOpenAlert(false)
    }

    return (
        <PanelContainer elevation={9}>
                <Title>Создание пользователя</Title>
                <PanelTextField 
                    label='Имя' 
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    error={nameErrorMessage.length == 0 ? false : true} 
                    helperText={nameErrorMessage.length == 0 ? false : nameErrorMessage} 
                    variant='outlined'
                    errorMessage={nameErrorMessage}
                />
                <PanelTextField 
                    label='Фамилия'
                    value={surname}
                    onChange={e => setSurname(e.target.value)} 
                    error={surnameErrorMessage.length == 0 ? false : true} 
                    helperText={surnameErrorMessage.length == 0 ? false : surnameErrorMessage} 
                    variant='outlined'
                    errorMessage={surnameErrorMessage}
                />
                <PanelTextField 
                    label='Отчество (необязательно)' 
                    value={patronymic}
                    onChange={e => setPatronymic(e.target.value)} 
                    error={patronymicErrorMessage.length == 0 ? false : true} 
                    helperText={patronymicErrorMessage.length == 0 ? false : patronymicErrorMessage} 
                    variant='outlined'
                    errorMessage={patronymicErrorMessage}
                />
                <PanelTextField 
                    label='Адрес электронной почты' 
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    error={emailErrorMessage.length == 0 ? false : true} 
                    helperText={emailErrorMessage.length == 0 ? false : emailErrorMessage} 
                    variant='outlined'
                    errorMessage={emailErrorMessage}
                />
                <PanelTextField 
                    label='Пароль'
                    value={password}
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
                        <FormControlLabel value='ADMIN' control={<Radio/>} label='Администратор'/>
                        <FormControlLabel value='CASHIER' control={<Radio/>} label='Кассир'/>
                        <FormControlLabel value='USER' control={<Radio/>} label='Пользователь'/>
                    </RoleRadioGroup>
                </RoleFormControl>
                {role == 'CASHIER' && <CashierButton disableRipple onClick={handleClickOpenDialog}>Выберите услуги за которые отвечает кассир</CashierButton>}
                {role == 'CASHIER' && selectedTypeNames.length != 0 && <StyledTypography>Выбрано: {selectedTypeNames.join(', ')}.</StyledTypography>}
                <RegButton disableRipple variant='contained' onClick={regButtonHandler}>Создать пользователя</RegButton>
                <StyledDialog onClose={handleCloseDialog} open={openDialog}>
                    <StyledDialogTitle>Услуги за которые отвечает кассир:</StyledDialogTitle>
                    {ServiceStore.services.length != 0 ?
                    <StyledFormGroup>
                        {ServiceStore.services.map(service =>
                            <FormControlLabel control={<StyledCheckbox checked={types[`${service.type}`]} onClick={typeCheckboxHandler} name={`${service.type}`}/>} label={`(${service.type})${service.description}`}/>
                        )}
                    </StyledFormGroup> :
                    <MessageBox>В данный момент неназначенных услуг нет</MessageBox>
                    }
                    <StyledButton disableRipple onClick={confirmButtonHandler}>{ServiceStore.services.length != 0 ? 'Выбрать' : 'Выйти'}</StyledButton>
                </StyledDialog>
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert} TransitionComponent={Slide}>
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