import Paper from '@mui/material/Paper';
import {getAllBankWindows} from '../http/bankWindowAPI';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import BankWindowStore from '../store/BankWindowStore';
import {observer} from 'mobx-react-lite';
import { styled } from '@mui/material/styles';

const PanelBackground = styled(Paper)({
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingTop: '20px',
    paddingBottom: '20px',
    marginRight: '20px'
})

const PanelTableContainer = styled(TableContainer)({
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black'
})

const PanelTable = styled(Table)({
    minWidth: '650px'
})

const FirstTableRow = styled(TableRow)({
    backgroundColor: 'rgba(128, 128, 128, 0.3)'
})

const StyledTableCell = styled(TableCell)({
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    fontSize: '15px',
    color: 'black'
})

const LastStyledTableCell = styled(TableCell)({
    borderBottom: '1px solid black',
    fontSize: '15px',
    color: 'black'
})

const StyledTableSortLabel = styled(TableSortLabel)({
    '&.Mui-active .MuiTableSortLabel-icon': {
        color: 'black'
    },
    ':hover': {
        color: 'black'
    },
    ':focus': {
        color: 'black'
    }
})

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
        if (sortIdDirection == 'asc' && sortIdActive == false) {
            setSortIdActive(true)
            await getAllBankWindows('id', 'asc').then(data => BankWindowStore.setBankWindows(data))
        }
        if (sortIdDirection == 'asc' && sortIdActive == true) {
            setSortIdDirection('desc')
            await getAllBankWindows('id', 'desc').then(data => BankWindowStore.setBankWindows(data))
        }
        if (sortIdDirection == 'desc') {
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
        if (sortNumberDirection == 'asc' && sortNumberActive == false) {
            setSortNumberActive(true)
            await getAllBankWindows('number', 'asc').then(data => BankWindowStore.setBankWindows(data))
        }
        if (sortNumberDirection == 'asc' && sortNumberActive == true) {
            setSortNumberDirection('desc')
            await getAllBankWindows('number', 'desc').then(data => BankWindowStore.setBankWindows(data))
        }
        if (sortNumberDirection == 'desc') {
            setSortNumberDirection('asc')
            setSortNumberActive(false)
            await getAllBankWindows('id', 'asc').then(data => BankWindowStore.setBankWindows(data))
        }
    }

    async function sortUserIdButtonHandler() {
        setSortIdActive(false)
        setSortIdDirection('asc')
        setSortNumberActive(false)
        setSortNumberDirection('asc')
        if (sortUserIdDirection == 'asc' && sortUserIdActive == false) {
            setSortUserIdActive(true)
            await getAllBankWindows('userId', 'asc').then(data => BankWindowStore.setBankWindows(data))
        }
        if (sortUserIdDirection == 'asc' && sortUserIdActive == true) {
            setSortUserIdDirection('desc')
            await getAllBankWindows('userId', 'desc').then(data => BankWindowStore.setBankWindows(data))
        }
        if (sortUserIdDirection == 'desc') {
            setSortUserIdDirection('asc')
            setSortUserIdActive(false)
            await getAllBankWindows('id', 'asc').then(data => BankWindowStore.setBankWindows(data))
        }
    }

    return (
        <PanelBackground elevation={9}>
            <PanelTableContainer elevation={9}>
                <PanelTable>
                    <TableHead>
                        <FirstTableRow>
                            <StyledTableCell>
                                <StyledTableSortLabel active={sortIdActive} direction={sortIdDirection} onClick={sortIdButtonHandler}>ID</StyledTableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell>
                                <StyledTableSortLabel active={sortNumberActive} direction={sortNumberDirection} onClick={sortNumberButtonHandler}>Номер окна</StyledTableSortLabel>
                            </StyledTableCell>
                            <LastStyledTableCell>
                                <StyledTableSortLabel active={sortUserIdActive} direction={sortUserIdDirection} onClick={sortUserIdButtonHandler}>ID работника банка</StyledTableSortLabel>
                            </LastStyledTableCell>
                        </FirstTableRow>
                    </TableHead>
                    <TableBody>
                        {BankWindowStore.bankWindows.map(bankWindow => (
                        <TableRow>
                            <StyledTableCell>{bankWindow.id}</StyledTableCell>
                            <StyledTableCell>{bankWindow.number}</StyledTableCell>
                            <LastStyledTableCell>{bankWindow.userId}</LastStyledTableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </PanelTable>
            </PanelTableContainer>
        </PanelBackground>
    );
});

export default BankWindowsPanel;