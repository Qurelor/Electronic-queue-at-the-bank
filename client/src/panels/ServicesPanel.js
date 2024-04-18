import Paper from '@mui/material/Paper';
import {getAllServices} from '../http/serviceAPI';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import ServiceStore from '../store/ServiceStore';
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

const ServicesPanel = observer(() => {
    const [sortIdActive, setSortIdActive] = useState(false)
    const [sortIdDirection, setSortIdDirection] = useState('asc')
    const [sortTypeActive, setSortTypeActive] = useState(false)
    const [sortTypeDirection, setSortTypeDirection] = useState('asc')
    const [sortDescriptionActive, setSortDescriptionActive] = useState(false)
    const [sortDescriptionDirection, setSortDescriptionDirection] = useState('asc')

    useEffect(() => {
        getAllServices('id', 'asc').then(data => ServiceStore.setServices(data))
    }, [])

    async function sortIdButtonHandler() {
        setSortTypeActive(false)
        setSortTypeDirection('asc')
        setSortDescriptionActive(false)
        setSortDescriptionDirection('asc')
        if (sortIdDirection == 'asc' && sortIdActive == false) {
            setSortIdActive(true)
            await getAllServices('id', 'asc').then(data => ServiceStore.setServices(data))
        }
        if (sortIdDirection == 'asc' && sortIdActive == true) {
            setSortIdDirection('desc')
            await getAllServices('id', 'desc').then(data => ServiceStore.setServices(data))
        }
        if (sortIdDirection == 'desc') {
            setSortIdDirection('asc')
            setSortIdActive(false)
            await getAllServices('id', 'asc').then(data => ServiceStore.setServices(data))
        }
    }

    async function sortTypeButtonHandler() {
        setSortIdActive(false)
        setSortIdDirection('asc')
        setSortDescriptionActive(false)
        setSortDescriptionDirection('asc')
        if (sortTypeDirection == 'asc' && sortTypeActive == false) {
            setSortTypeActive(true)
            await getAllServices('type', 'asc').then(data => ServiceStore.setServices(data))
        }
        if (sortTypeDirection == 'asc' && sortTypeActive == true) {
            setSortTypeDirection('desc')
            await getAllServices('type', 'desc').then(data => ServiceStore.setServices(data))
        }
        if (sortTypeDirection == 'desc') {
            setSortTypeDirection('asc')
            setSortTypeActive(false)
            await getAllServices('id', 'asc').then(data => ServiceStore.setServices(data))
        }
    }

    async function sortDescriptionButtonHandler() {
        setSortIdActive(false)
        setSortIdDirection('asc')
        setSortTypeActive(false)
        setSortTypeDirection('asc')
        if (sortDescriptionDirection == 'asc' && sortDescriptionActive == false) {
            setSortDescriptionActive(true)
            await getAllServices('description', 'asc').then(data => ServiceStore.setServices(data))
        }
        if (sortDescriptionDirection == 'asc' && sortDescriptionActive == true) {
            setSortDescriptionDirection('desc')
            await getAllServices('description', 'desc').then(data => ServiceStore.setServices(data))
        }
        if (sortDescriptionDirection == 'desc') {
            setSortDescriptionDirection('asc')
            setSortDescriptionActive(false)
            await getAllServices('id', 'asc').then(data => ServiceStore.setServices(data))
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
                                <StyledTableSortLabel active={sortTypeActive} direction={sortTypeDirection} onClick={sortTypeButtonHandler}>Тип</StyledTableSortLabel>
                            </StyledTableCell>
                            <LastStyledTableCell>
                                <StyledTableSortLabel active={sortDescriptionActive} direction={sortDescriptionDirection} onClick={sortDescriptionButtonHandler}>Описание</StyledTableSortLabel>
                            </LastStyledTableCell>
                        </FirstTableRow>
                    </TableHead>
                    <TableBody>
                        {ServiceStore.services.map(service => (
                        <TableRow>
                            <StyledTableCell>{service.id}</StyledTableCell>
                            <StyledTableCell>{service.type}</StyledTableCell>
                            <LastStyledTableCell>{service.description}</LastStyledTableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </PanelTable>
            </PanelTableContainer>
        </PanelBackground>
    );
});

export default ServicesPanel;