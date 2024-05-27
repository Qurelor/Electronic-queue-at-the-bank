import Paper from '@mui/material/Paper';
import {getAllServices, setServiceCashierId} from '../http/serviceAPI';
import {useEffect, useState, useRef} from 'react';
import ServiceStore from '../store/ServiceStore';
import {observer} from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {toJS} from 'mobx';
import {getUserIdByCashierId, getAllCashiers} from '../http/cashierAPI';
import {getFullNameByUserId} from '../http/userAPI';
import CashierStore from '../store/CashierStore';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const TableButton = styled(Button)({
    backgroundColor: 'limegreen',
    color: 'black',
    flex: 1,
    ':hover': {
        backgroundColor: 'black',
        color: 'white'
    },
    textTransform: 'none'
})

const PanelBackground = styled(Paper)({
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingTop: '20px',
    paddingBottom: '20px',
    marginRight: '20px'
})

const TableContainer = styled('div')({
    '--ag-active-color': 'limegreen',
    width: '60vw',
    fontSize: '15px',
    '--ag-wrapper-border-radius': '4px'
})

const Search = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        fontSze: '15px'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'limegreen'
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'limegreen'
    },
    '& .MuiInputLabel-root': {
        fontSize: '15px'
    },
    marginBottom: '20px'
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

const StyledRadioGroup = styled(RadioGroup)({
    '& .MuiRadio-root.Mui-checked': {
        color: 'limegreen'
    }
})

const SaveButton = styled(Button)({
    backgroundColor: 'limegreen',
    color: 'black',
    ':hover': {
        backgroundColor: 'black',
        color: 'white'
    },
    textTransform: 'none'
})

const ServicesPanel = observer(() => {
    const gridRef = useRef();
    const [columnTitles, setColumnTitles] = useState([
        {field: 'id', headerName: 'ID'},
        {field: 'type', headerName: 'Тип'},
        {field: 'description', headerName: 'Описание'},
        {field: 'cashierFullName', headerName: 'Кассир'},
        {field: 'button', cellRenderer: TableButtonFunction, headerName: 'Выбор кассира', cellStyle: () => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none'
        })}
    ])

    function TableButtonFunction(props) {
        const [openDialog, setOpenDialog] = useState(false)
        const [value, setValue] = useState(props.data.cashierId)

        const handleOpenDialog = () => {
            setOpenDialog(true)
            setValue(props.data.cashierId)
        }

        const handleChange = (event) => {
            setValue(event.target.value)
        }

        async function buttonHandler() {
            await setServiceCashierId(props.data.id, value)
            const cashierUserId = await getUserIdByCashierId(value)
            const cashierFullName = await getFullNameByUserId(cashierUserId)
            let services = toJS(ServiceStore.services)
            let actualServices = services.map(service => {
                if (service.id == props.data.id) {
                    service.cashierId = value
                    service.cashierFullName = cashierFullName
                    return service
                } else {
                    return service
                }
            })
            ServiceStore.setServices(actualServices)
        }

        return (
            <>
                <TableButton disableRipple onClick={handleOpenDialog}>Выбрать</TableButton>
                <StyledDialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <StyledDialogTitle>Выберите кассира:</StyledDialogTitle>
                    <StyledRadioGroup
                        value={value}
                        onChange={handleChange}
                    >
                        {CashierStore.cashiers.map(cashier => 
                            <FormControlLabel value={cashier.id} control={<Radio disableRipple/>} label={cashier.fullName} />
                        )}
                    </StyledRadioGroup>
                    <SaveButton disableRipple onClick={buttonHandler}>Сохранить</SaveButton>
                </StyledDialog>
            </>
        )
    }

    useEffect(() => {
        getAllServices('id', 'asc')
        .then(async data => {
            let servicesWithCashierFullName = await Promise.all(data.map(async service => {
                if(service.cashierId){
                    const cashierUserId = await getUserIdByCashierId(service.cashierId)
                    const cashierFullName = await getFullNameByUserId(cashierUserId)
                    service.cashierFullName = cashierFullName
                }
                return service
            }))
            console.log(servicesWithCashierFullName)
            ServiceStore.setServices(servicesWithCashierFullName)
        })

        getAllCashiers()
        .then(async data => {
            let cashiersWithFullName = await Promise.all(data.map(async cashier => {
                const cashierFullName = await getFullNameByUserId(cashier.userId)
                cashier.fullName = cashierFullName
                return cashier
            }))
            console.log(cashiersWithFullName)
            CashierStore.setCashiers(cashiersWithFullName)
        })
    }, [])

    function searchOnInput() {
        gridRef.current.api.setGridOption(
          'quickFilterText',
          document.getElementById('search').value,
        );
    }

    const defaultColDef = {
        flex: 0,
    };
    
    const autoSizeStrategy = {
        type: 'fitGridWidth'
    }

    return (
        <PanelBackground elevation={9}>
            <Search
                id="search"
                label='Поиск'
                variant='outlined'    
                onInput={searchOnInput}
            />
            <TableContainer
                className='ag-theme-quartz'
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={toJS(ServiceStore.services)}
                    columnDefs={columnTitles}
                    defaultColDef={defaultColDef}
                    domLayout='autoHeight'
                    autoSizeStrategy={autoSizeStrategy}
                />
            </TableContainer>
        </PanelBackground>
    );
});

export default ServicesPanel;