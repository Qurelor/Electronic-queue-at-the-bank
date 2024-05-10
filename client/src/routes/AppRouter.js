import {Routes, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import RegPage from '../pages/RegPage'
import AdminPage from '../pages/AdminPage'
import CashierPage from '../pages/CashierPage'
import UserPage from '../pages/UserPage'
import UserStore from '../store/UserStore';
import {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const LoadingContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
})

const LoadingIcon = styled(CircularProgress)({
    color: 'limegreen'
})

const AppRouter = observer(() => {

    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        UserStore.setIsAuth(localStorage.getItem('isAuth'))
        UserStore.setUserId(localStorage.getItem('userId'))
        UserStore.setRole(localStorage.getItem('role'))
        if (UserStore.isAuth == 'true') {
            if(UserStore.role == 'CASHIER'){
                UserStore.setIsWorking(localStorage.getItem('isWorking') || 'false')
                if (UserStore.isWorking == 'true') {
                    UserStore.setWorkingWindowId(localStorage.getItem('workingWindowId') || '')
                    UserStore.setWorkingWindowNumber(localStorage.getItem('workingWindowNumber') || '')
                }
            }
        }
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return (
            <LoadingContainer>
                <LoadingIcon/>
            </LoadingContainer>
        )
    }

    return (
        <div>
            <Routes>
                <Route path='/' Component={HomePage}/>
                <Route path='/auth' Component={AuthPage}/>
                <Route path='/reg' Component={RegPage}/>
                {UserStore.isAuth == 'true' && UserStore.role == 'ADMIN' && <Route path='/admin' Component={AdminPage}/>}
                {UserStore.isAuth == 'true' && UserStore.role == 'CASHIER' && <Route path='/cashier' Component={CashierPage}/>}
                {UserStore.isAuth == 'true' && UserStore.role == 'USER' && <Route path='/user' Component={UserPage}/>}
            </Routes>
        </div>
    );
});

export default AppRouter;