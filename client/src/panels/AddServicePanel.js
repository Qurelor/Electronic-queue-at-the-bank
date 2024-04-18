import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ServiceStore from '../store/ServiceStore';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import {TYPE_REGEXP} from '../constants'
import {addService} from '../http/serviceAPI';

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

const AddServiceButton = styled(Button)({
    marginTop: '20px',
    fontSize: '25px',
    backgroundColor: 'limegreen',
    color: 'black',
    textTransform: 'none',
    ':hover': {
        backgroundColor: 'black',
        color: 'white'
    }
})

const AddServicePanel = () => {

    const [type, setType] = useState('')
    const [typeErrorMessage, setTypeErrorMessage] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('')
    const [open, setOpen] = useState(false)

    function checkType() {
        if (type.length == 0) {
            setTypeErrorMessage('Введите тип')
            return false
        } else if (!TYPE_REGEXP.test(type)) {
            setTypeErrorMessage('Тип должен состоять только из заглавных букв английского алфавита')
            return false
        } else {
            setTypeErrorMessage('')
            return true
        }
    }

    function checkDescription() {
        if (description.length == 0) {
            setDescriptionErrorMessage('Введите описание')
            return false
        } else {
            setDescriptionErrorMessage('')
            return true
        }
    }

    async function addServiceButtonHandler() {
        checkType()
        checkDescription()
        if (checkType() && checkDescription()) {
            const data = await addService(type, description)
            if (data == 'Услуги с таким типом и описанием уже существуют') {
                setTypeErrorMessage('Услуга с таким типом уже существует')
                setDescriptionErrorMessage('Услуга с таким описанием уже существует')
            } else if (data == 'Услуга с таким типом уже существует') {
                setTypeErrorMessage(data)
            } else if (data == 'Услуга с таким описанием уже существует') {
                setDescriptionErrorMessage(data)
            } else {
                ServiceStore.addService(data)
                setType('')
                setDescription('')
                setOpen(true)
            }
        }
    }

    function handleCloseAlert() {
        setOpen(false)
    }

    return (
        <PanelContainer elevation={9}>
            <Title>Добавление услуги</Title>
            <PanelTextField 
                label='Тип' 
                value={type}
                onChange={e => setType(e.target.value)} 
                error={typeErrorMessage.length == 0 ? false : true} 
                helperText={typeErrorMessage.length == 0 ? false : typeErrorMessage} 
                variant='outlined'
                errorMessage={typeErrorMessage}
            />
            <PanelTextField 
                label='Описание' 
                value={description}
                onChange={e => setDescription(e.target.value)}
                error={descriptionErrorMessage.length == 0 ? false : true} 
                helperText={descriptionErrorMessage.length == 0 ? false : descriptionErrorMessage} 
                variant='outlined'
                errorMessage={descriptionErrorMessage}
            />
            <AddServiceButton disableRipple variant='contained' onClick={addServiceButtonHandler}>Добавить услугу</AddServiceButton>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert} TransitionComponent={Slide}>
                <Alert
                    severity='success'
                    variant='filled'
                >
                    Услуга успешно добавлена!
                </Alert>
            </Snackbar>
        </PanelContainer>
    );
};

export default AddServicePanel;