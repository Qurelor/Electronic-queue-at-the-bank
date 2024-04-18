import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import BankWindowStore from '../store/BankWindowStore';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import {createBankWindow} from '../http/bankWindowAPI';
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

const PanelTextField = styled(TextField)(({numberErrorMessage}) => ({
    marginTop: '20px',
    width: '100%',
    '& .MuiOutlinedInput-root': {
        fontSze: '15px'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: numberErrorMessage.length > 0 ? 'red' : 'limegreen'
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: numberErrorMessage.length > 0 ? 'red' : 'limegreen'
    },
    '& .MuiInputLabel-root': {
        fontSize: '15px'
    }
}))

const AddBankWindowButton = styled(Button)({
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

const AddBankWindowPanel = () => {

    const [number, setNumber] = useState('')
    const [numberErrorMessage, setNumberErrorMessage] = useState('')
    const [open, setOpen] = useState(false)

    function checkNumber() {
        if (!Number.isInteger(Number(number)) || Number(number) < 1) {
            setNumberErrorMessage('Номер окна должен быть целым положительным числом')
            return false
        } else {
            setNumberErrorMessage('')
            return true
        }
    }

    async function addBankWindowButtonHandler() {
        checkNumber()
        if (checkNumber()) {
            const data = await createBankWindow(number)
            if (data == 'Окно с таким номером уже существует') {
                setNumberErrorMessage(data)
            } else {
                BankWindowStore.addBankWindow(data)
                setNumber('')
                setOpen(true)
            }
        }
    }

    function handleCloseAlert() {
        setOpen(false)
    }

    return (
        <PanelContainer elevation={9}>
            <Title>Создание окна</Title>
            <PanelTextField 
                label='Номер окна' 
                value={number}
                onChange={e => setNumber(e.target.value)} 
                error={numberErrorMessage.length == 0 ? false : true} 
                helperText={numberErrorMessage.length == 0 ? false : numberErrorMessage} 
                variant='outlined'
                numberErrorMessage={numberErrorMessage}
            />
            <AddBankWindowButton disableRipple variant='contained' onClick={addBankWindowButtonHandler}>Создать окно</AddBankWindowButton>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert} TransitionComponent={Slide}>
                <Alert
                    severity='success'
                    variant='filled'
                >
                    Окно успешно создано!
                </Alert>
            </Snackbar>
        </PanelContainer>
    );
};

export default AddBankWindowPanel;