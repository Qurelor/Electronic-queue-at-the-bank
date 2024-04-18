import Paper from '@mui/material/Paper';
import {getAllUsers} from '../http/userAPI';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import UserStore from '../store/UserStore';
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

const UsersPanel = observer(() => {
    const [sortIdActive, setSortIdActive] = useState(false)
    const [sortIdDirection, setSortIdDirection] = useState('asc')
    const [sortFullNameActive, setSortFullNameActive] = useState(false)
    const [sortFullNameDirection, setSortFullNameDirection] = useState('asc')
    const [sortEmailActive, setSortEmailActive] = useState(false)
    const [sortEmailDirection, setSortEmailDirection] = useState('asc')
    const [sortPasswordActive, setSortPasswordActive] = useState(false)
    const [sortPasswordDirection, setSortPasswordDirection] = useState('asc')
    const [sortRoleActive, setSortRoleActive] = useState(false)
    const [sortRoleDirection, setSortRoleDirection] = useState('asc')

    useEffect(() => {
        getAllUsers('id', 'asc').then(data => UserStore.setUsers(data))
    }, [])

    async function sortIdButtonHandler() {
        setSortFullNameActive(false)
        setSortFullNameDirection('asc')
        setSortEmailActive(false)
        setSortEmailDirection('asc')
        setSortPasswordActive(false)
        setSortPasswordDirection('asc')
        setSortRoleActive(false)
        setSortRoleDirection('asc')
        if (sortIdDirection == 'asc' && sortIdActive == false) {
            setSortIdActive(true)
            await getAllUsers('id', 'asc').then(data => UserStore.setUsers(data))
        }
        if (sortIdDirection == 'asc' && sortIdActive == true) {
            setSortIdDirection('desc')
            await getAllUsers('id', 'desc').then(data => UserStore.setUsers(data))
        }
        if (sortIdDirection == 'desc') {
            setSortIdDirection('asc')
            setSortIdActive(false)
            await getAllUsers('id', 'asc').then(data => UserStore.setUsers(data))
        }
    }

    async function sortFullNameButtonHandler() {
        setSortIdActive(false)
        setSortIdDirection('asc')
        setSortEmailActive(false)
        setSortEmailDirection('asc')
        setSortPasswordActive(false)
        setSortPasswordDirection('asc')
        setSortRoleActive(false)
        setSortRoleDirection('asc')
        if (sortFullNameDirection == 'asc' && sortFullNameActive == false) {
            setSortFullNameActive(true)
            await getAllUsers('fullName', 'asc').then(data => UserStore.setUsers(data))
        }
        if (sortFullNameDirection == 'asc' && sortFullNameActive == true) {
            setSortFullNameDirection('desc')
            await getAllUsers('fullName', 'desc').then(data => UserStore.setUsers(data))
        }
        if (sortFullNameDirection == 'desc') {
            setSortFullNameDirection('asc')
            setSortFullNameActive(false)
            await getAllUsers('id', 'asc').then(data => UserStore.setUsers(data))
        }
    }

    async function sortEmailButtonHandler() {
        setSortIdActive(false)
        setSortIdDirection('asc')
        setSortFullNameActive(false)
        setSortFullNameDirection('asc')
        setSortPasswordActive(false)
        setSortPasswordDirection('asc')
        setSortRoleActive(false)
        setSortRoleDirection('asc')
        if (sortEmailDirection == 'asc' && sortEmailActive == false) {
            setSortEmailActive(true)
            await getAllUsers('email', 'asc').then(data => UserStore.setUsers(data))
        }
        if (sortEmailDirection == 'asc' && sortEmailActive == true) {
            setSortEmailDirection('desc')
            await getAllUsers('email', 'desc').then(data => UserStore.setUsers(data))
        }
        if (sortEmailDirection == 'desc') {
            setSortEmailDirection('asc')
            setSortEmailActive(false)
            await getAllUsers('id', 'asc').then(data => UserStore.setUsers(data))
        }
    }

    async function sortPasswordButtonHandler() {
        setSortIdActive(false)
        setSortIdDirection('asc')
        setSortFullNameActive(false)
        setSortFullNameDirection('asc')
        setSortEmailActive(false)
        setSortEmailDirection('asc')
        setSortRoleActive(false)
        setSortRoleDirection('asc')
        if (sortPasswordDirection == 'asc' && sortPasswordActive == false) {
            setSortPasswordActive(true)
            await getAllUsers('password', 'asc').then(data => UserStore.setUsers(data))
        }
        if (sortPasswordDirection == 'asc' && sortPasswordActive == true) {
            setSortPasswordDirection('desc')
            await getAllUsers('password', 'desc').then(data => UserStore.setUsers(data))
        }
        if (sortPasswordDirection == 'desc') {
            setSortPasswordDirection('asc')
            setSortPasswordActive(false)
            await getAllUsers('id', 'asc').then(data => UserStore.setUsers(data))
        }
    }

    async function sortRoleButtonHandler() {
        setSortIdActive(false)
        setSortIdDirection('asc')
        setSortFullNameActive(false)
        setSortFullNameDirection('asc')
        setSortEmailActive(false)
        setSortEmailDirection('asc')
        setSortPasswordActive(false)
        setSortPasswordDirection('asc')
        if (sortRoleDirection == 'asc' && sortRoleActive == false) {
            setSortRoleActive(true)
            await getAllUsers('role', 'asc').then(data => UserStore.setUsers(data))
        }
        if (sortRoleDirection == 'asc' && sortRoleActive == true) {
            setSortRoleDirection('desc')
            await getAllUsers('role', 'desc').then(data => UserStore.setUsers(data))
        }
        if (sortRoleDirection == 'desc') {
            setSortRoleDirection('asc')
            setSortRoleActive(false)
            await getAllUsers('id', 'asc').then(data => UserStore.setUsers(data))
        }
    }


    return (
        <PanelBackground elevation={9}>
            <PanelTableContainer elevation={9}>
                <PanelTable>
                    <TableHead>
                        <FirstTableRow>
                            <StyledTableCell><StyledTableSortLabel active={sortIdActive} direction={sortIdDirection} onClick={sortIdButtonHandler}>ID</StyledTableSortLabel></StyledTableCell>
                            <StyledTableCell><StyledTableSortLabel active={sortFullNameActive} direction={sortFullNameDirection} onClick={sortFullNameButtonHandler}>ФИО</StyledTableSortLabel></StyledTableCell>
                            <StyledTableCell><StyledTableSortLabel active={sortEmailActive} direction={sortEmailDirection} onClick={sortEmailButtonHandler}>Адрес электронной почты</StyledTableSortLabel></StyledTableCell>
                            <StyledTableCell><StyledTableSortLabel active={sortPasswordActive} direction={sortPasswordDirection} onClick={sortPasswordButtonHandler}>Пароль</StyledTableSortLabel></StyledTableCell>
                            <LastStyledTableCell><StyledTableSortLabel active={sortRoleActive} direction={sortRoleDirection} onClick={sortRoleButtonHandler}>Роль</StyledTableSortLabel></LastStyledTableCell>
                        </FirstTableRow>
                    </TableHead>
                    <TableBody>
                        {UserStore.users.map(user => (
                        <TableRow>
                            <StyledTableCell>{user.id}</StyledTableCell>
                            <StyledTableCell>{user.fullName}</StyledTableCell>
                            <StyledTableCell>{user.email}</StyledTableCell>
                            <StyledTableCell>{user.password}</StyledTableCell>
                            <LastStyledTableCell>{user.role}</LastStyledTableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </PanelTable>
            </PanelTableContainer>
        </PanelBackground>
    );
});

export default UsersPanel;