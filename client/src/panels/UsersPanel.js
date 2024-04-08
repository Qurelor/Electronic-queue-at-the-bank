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
        if(sortIdDirection == 'asc' && sortIdActive == false) {
            setSortIdActive(true)
            await getAllUsers('id', 'asc').then(data => UserStore.setUsers(data))
        }
        if(sortIdDirection == 'asc' && sortIdActive == true){
            setSortIdDirection('desc')
            await getAllUsers('id', 'desc').then(data => UserStore.setUsers(data))
        }
        if(sortIdDirection == 'desc'){
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
        if(sortFullNameDirection == 'asc' && sortFullNameActive == false) {
            setSortFullNameActive(true)
            await getAllUsers('fullName', 'asc').then(data => UserStore.setUsers(data))
        }
        if(sortFullNameDirection == 'asc' && sortFullNameActive == true){
            setSortFullNameDirection('desc')
            await getAllUsers('fullName', 'desc').then(data => UserStore.setUsers(data))
        }
        if(sortFullNameDirection == 'desc'){
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
        if(sortEmailDirection == 'asc' && sortEmailActive == false) {
            setSortEmailActive(true)
            await getAllUsers('email', 'asc').then(data => UserStore.setUsers(data))
        }
        if(sortEmailDirection == 'asc' && sortEmailActive == true){
            setSortEmailDirection('desc')
            await getAllUsers('email', 'desc').then(data => UserStore.setUsers(data))
        }
        if(sortEmailDirection == 'desc'){
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
        if(sortPasswordDirection == 'asc' && sortPasswordActive == false) {
            setSortPasswordActive(true)
            await getAllUsers('password', 'asc').then(data => UserStore.setUsers(data))
        }
        if(sortPasswordDirection == 'asc' && sortPasswordActive == true){
            setSortPasswordDirection('desc')
            await getAllUsers('password', 'desc').then(data => UserStore.setUsers(data))
        }
        if(sortPasswordDirection == 'desc'){
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
        if(sortRoleDirection == 'asc' && sortRoleActive == false) {
            setSortRoleActive(true)
            await getAllUsers('role', 'asc').then(data => UserStore.setUsers(data))
        }
        if(sortRoleDirection == 'asc' && sortRoleActive == true){
            setSortRoleDirection('desc')
            await getAllUsers('role', 'desc').then(data => UserStore.setUsers(data))
        }
        if(sortRoleDirection == 'desc'){
            setSortRoleDirection('asc')
            setSortRoleActive(false)
            await getAllUsers('id', 'asc').then(data => UserStore.setUsers(data))
        }
    }


    return (
        <Paper elevation={9} sx={{px: '40px', py: '20px', mr: '20px'}}>
            <TableContainer elevation={9} sx={{borderRadius: '0', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black'}}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{bgcolor: 'rgba(128, 128, 128, 0.3)'}}>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}><TableSortLabel active={sortIdActive} direction={sortIdDirection} onClick={sortIdButtonHandler} sx={{'&.Mui-active .MuiTableSortLabel-icon': {color: 'black'}, ':hover': {color: 'black'}, ':focus': {color: 'black'}}}>ID</TableSortLabel></TableCell>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}><TableSortLabel active={sortFullNameActive} direction={sortFullNameDirection} onClick={sortFullNameButtonHandler} sx={{'&.Mui-active .MuiTableSortLabel-icon': {color: 'black'}, ':hover': {color: 'black'}, ':focus': {color: 'black'}}}>ФИО</TableSortLabel></TableCell>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}><TableSortLabel active={sortEmailActive} direction={sortEmailDirection} onClick={sortEmailButtonHandler} sx={{'&.Mui-active .MuiTableSortLabel-icon': {color: 'black'}, ':hover': {color: 'black'}, ':focus': {color: 'black'}}}>Адрес электронной почты</TableSortLabel></TableCell>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}><TableSortLabel active={sortPasswordActive} direction={sortPasswordDirection} onClick={sortPasswordButtonHandler} sx={{'&.Mui-active .MuiTableSortLabel-icon': {color: 'black'}, ':hover': {color: 'black'}, ':focus': {color: 'black'}}}>Пароль</TableSortLabel></TableCell>
                            <TableCell sx={{borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}><TableSortLabel active={sortRoleActive} direction={sortRoleDirection} onClick={sortRoleButtonHandler} sx={{'&.Mui-active .MuiTableSortLabel-icon': {color: 'black'}, ':hover': {color: 'black'}, ':focus': {color: 'black'}}}>Роль</TableSortLabel></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {UserStore.users.map(user => (
                        <TableRow>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}>{user.id}</TableCell>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}>{user.fullName}</TableCell>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}>{user.email}</TableCell>
                            <TableCell sx={{borderRight: '1px solid black', borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}>{user.password}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid black', fontSize: '15px', color: 'black'}}>{user.role}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
});

export default UsersPanel;