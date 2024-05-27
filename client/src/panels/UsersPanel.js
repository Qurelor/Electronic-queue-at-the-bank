import Paper from '@mui/material/Paper';
import {getAllUsers} from '../http/userAPI';
import {useEffect, useState, useRef} from 'react';
import UserStore from '../store/UserStore';
import {observer} from 'mobx-react-lite';
import {styled} from '@mui/material/styles';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import TextField from '@mui/material/TextField';
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

const UsersPanel = observer(({setIsLoading}) => {
    const gridRef = useRef();
    const [columnTitles, setColumnTitles] = useState([
        {field: 'id', headerName: 'ID'},
        {field: 'fullName', headerName: 'ФИО'},
        {field: 'email', headerName: 'Адрес электронной почты'},
        {field: 'password', headerName: 'Пароль'},
        {field: 'role', headerName: 'Роль'}
    ])

    useEffect(() => {
        getAllUsers('id', 'asc')
        .then(data => UserStore.setUsers(data))
        .then(setIsLoading(false))
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
                    rowData={toJS(UserStore.users)}
                    columnDefs={columnTitles}
                    defaultColDef={defaultColDef}
                    domLayout='autoHeight'
                    autoSizeStrategy={autoSizeStrategy}
                />
            </TableContainer>
        </PanelBackground>
    );
});

export default UsersPanel;