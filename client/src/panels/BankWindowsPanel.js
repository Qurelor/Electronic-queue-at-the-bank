import Paper from '@mui/material/Paper';
import {getAllBankWindows} from '../http/bankWindowAPI';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import UserStore from '../store/UserStore';
import BankWindowStore from '../store/BankWindowStore';
import {observer} from 'mobx-react-lite';

const BankWindowsPanel = observer(() => {
    const [sortIdActive, setSortIdActive] = useState(false)
    const [sortIdDirection, setSortIdDirection] = useState('asc')
    const [sortNumberActive, setSortNumberActive] = useState(false)
    const [sortNumberDirection, setSortNumberDirection] = useState('asc')
    const [sortUserIdActive, setSortUserIdActive] = useState(false)
    const [sortUserIdDirection, setSortUserIdDirection] = useState('asc')

    useEffect(() => {
        getAllBankWindows('id', 'asc').then(data => BankWindowStore.setBankWindows(data))
    }, [])

    async function sortIdButtonHandler() {
        setSortNumberActive(false)
        setSortNumberDirection('asc')
        setSortUserIdActive(false)
        setSortUserIdDirection('asc')
        if(sortIdDirection == 'asc' && sortIdActive == false) {
            setSortIdActive(true)
            await getAllBankWindows('id', 'asc').then(data => BankWindowStore.setBankWindows(data))
        }
        if(sortIdDirection == 'asc' && sortIdActive == true){
            setSortIdDirection('desc')
            await getAllBankWindows('id', 'desc').then(data => BankWindowStore.setBankWindows(data))
        }
        if(sortIdDirection == 'desc'){
            setSortIdDirection('asc')
            setSortIdActive(false)
            await getAllBankWindows('id', 'asc').then(data => BankWindowStore.setBankWindows(data))
        }
    }

    async function sortNumberButtonHandler() {
        setSortIdActive(false)
        setSortIdDirection('asc')
        setSortUserIdActive(false)
        setSortUserIdDirection('asc')
        if(sortNumberDirection == 'asc' && sortNumberActive == false) {
            setSortNumberActive(true)
            await getAllBankWindows('number', 'asc').then(data => BankWindowStore.setBankWindows(data))
        }
        if(sortNumberDirection == 'asc' && sortNumberActive == true){
            setSortNumberDirection('desc')
            await getAllBankWindows('number', 'desc').then(data => BankWindowStore.setBankWindows(data))
        }
        if(sortNumberDirection == 'desc'){
            setSortNumberDirection('asc')
            setSortNumberActive(false)
            await getAllBankWindows('number', 'asc').then(data => BankWindowStore.setBankWindows(data))
        }
    }

    async function sortUserIdButtonHandler() {
        setSortIdActive(false)
        setSortIdDirection('asc')
        setSortNumberActive(false)
        setSortNumberDirection('asc')
        if(sortUserIdDirection == 'asc' && sortUserIdActive == false) {
            setSortUserIdActive(true)
            await getAllBankWindows('userId', 'asc').then(data => BankWindowStore.setBankWindows(data))
        }
        if(sortUserIdDirection == 'asc' && sortUserIdActive == true){
            setSortUserIdDirection('desc')
            await getAllBankWindows('userId', 'desc').then(data => BankWindowStore.setBankWindows(data))
        }
        if(sortUserIdDirection == 'desc'){
            setSortUserIdDirection('asc')
            setSortUserIdActive(false)
            await getAllBankWindows('userId', 'asc').then(data => BankWindowStore.setBankWindows(data))
        }
    }

    return (
        <Paper elevation={9} sx={{px: '40px', py: '20px', mr: '20px'}}>
            <TableContainer elevation={9} sx={{borderRadius: '0', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black'}}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{bgcolor: 'rgba(128, 128, 128, 0.3)'}}>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}><TableSortLabel active={sortIdActive} direction={sortIdDirection} onClick={sortIdButtonHandler} sx={{'&.Mui-active .MuiTableSortLabel-icon': {color: 'black'}, ':hover': {color: 'black'}, ':focus': {color: 'black'}}}>ID</TableSortLabel></TableCell>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}><TableSortLabel active={sortNumberActive} direction={sortNumberDirection} onClick={sortNumberButtonHandler} sx={{'&.Mui-active .MuiTableSortLabel-icon': {color: 'black'}, ':hover': {color: 'black'}, ':focus': {color: 'black'}}}>Номер окна</TableSortLabel></TableCell>
                            <TableCell sx={{borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}><TableSortLabel active={sortUserIdActive} direction={sortUserIdDirection} onClick={sortUserIdButtonHandler} sx={{'&.Mui-active .MuiTableSortLabel-icon': {color: 'black'}, ':hover': {color: 'black'}, ':focus': {color: 'black'}}}>ID работника банка</TableSortLabel></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {BankWindowStore.bankWindows.map(bankWindow => (
                        <TableRow>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}>{bankWindow.id}</TableCell>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}>{bankWindow.number}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}>{bankWindow.userId}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
});

export default BankWindowsPanel;