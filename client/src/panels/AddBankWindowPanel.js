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
import BankWindowStore from '../store/BankWindowStore';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import {createBankWindow} from '../http/bankWindowAPI';

const AddUserPanel = () => {

    const [number, setNumber] = useState(0)
    const [numberErrorMessage, setNumberErrorMessage] = useState('')
    const [open, setOpen] = useState(false)

    function checkNumber() {
        if (!Number.isInteger(Number(number)) || Number(number) < 1){
            setNumberErrorMessage('Номер окна должен быть целым положительным числом')
            return false
        } else {
            setNumberErrorMessage('')
            return true
        }
    }

    async function addBankWindowButtonHandler() {
        checkNumber()
        if(checkNumber()){
            const bankWindow = await createBankWindow(number)
            if(bankWindow == 'Окно с таким номером уже существует'){
                setNumberErrorMessage(bankWindow)
            }else{
                BankWindowStore.addBankWindow(bankWindow)
                setOpen(true)
            }
        }
    }

    function handleCloseAlert() {
        setOpen(false)
    }

    return (
        <Paper elevation={9} sx={{ml: '20px', mr: '20px', px: '40px', py: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '450px', position: 'sticky', top: '110px'}}>
                <Typography sx={{fontSize: '25px'}}>Создание окна</Typography>
                <TextField label="Номер окна" onChange={e => setNumber(e.target.value)} error={numberErrorMessage.length == 0 ? false : true} helperText={numberErrorMessage.length == 0 ? false : numberErrorMessage} variant="outlined" sx={{mt: '20px', width: '100%', '& .MuiOutlinedInput-root': {fontSize: '15px'}, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: numberErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root.Mui-focused': {color: numberErrorMessage.length > 0 ? 'red' : 'limegreen'}, '& .MuiInputLabel-root': {fontSize: '15px'}}}/>
                <Button disableRipple variant='contained' onClick={addBankWindowButtonHandler} sx={{mt: '20px', fontSize: '25px', bgcolor: 'limegreen', color: 'black', textTransform: 'none', ':hover': {bgcolor: 'black', color: 'white'}}}>Создать окно</Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert} TransitionComponent={Slide}>
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Окно успешно создано!
                    </Alert>
                </Snackbar>
            </Paper>
    );
};

export default AddUserPanel;