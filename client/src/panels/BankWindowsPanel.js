import Paper from '@mui/material/Paper';
import {getAllBankWindows} from '../http/bankWindowAPI';
import {useEffect, useState, useRef} from 'react';
import BankWindowStore from '../store/BankWindowStore';
import {observer} from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {AgGridReact} from "ag-grid-react";
import {toJS} from 'mobx';

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

const BankWindowsPanel = observer(({setIsLoadingPanel}) => {
    const gridRef = useRef();
    const [columnTitles, setColumnTitles] = useState([
        {field: 'id', headerName: 'ID'},
        {field: 'number', headerName: 'Номер окна'},
        {field: 'cashierId', headerName: 'ID работника банка'}
    ])

    useEffect(() => {
        getAllBankWindows('id', 'asc').then(data => BankWindowStore.setBankWindows(data)).finally(() => setIsLoadingPanel(false))
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
                    rowData={toJS(BankWindowStore.bankWindows)}
                    columnDefs={columnTitles}
                    defaultColDef={defaultColDef}
                    domLayout='autoHeight'
                    autoSizeStrategy={autoSizeStrategy}
                />
            </TableContainer>
        </PanelBackground>
    );
});

export default BankWindowsPanel;