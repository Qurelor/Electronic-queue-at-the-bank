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
import {jwtDecode} from 'jwt-decode'
import {checkToken} from '../http/userAPI';
import {getCashierIdByUserId} from '../http/cashierAPI';
import {getBankWindowByCashierId} from '../http/bankWindowAPI';
import CashierStore from '../store/CashierStore';
import {getServicedTalonByBankWindowId} from '../http/talonAPI';


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

    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        async function checkUser() {
            if (localStorage.getItem('token')) {
                if (checkToken(localStorage.getItem('token')) != 'Пользователь неавторизован') {
                    const user = jwtDecode(localStorage.getItem('token'))
                    UserStore.setUser(user)
                    if (UserStore.user.role == 'CASHIER') {
                        const cashierId = await getCashierIdByUserId(UserStore.user.id)
                        const bankWindow = await getBankWindowByCashierId(cashierId)
                        if (bankWindow) {
                            CashierStore.setBankWindow(bankWindow)
                            const servicedTalon = await getServicedTalonByBankWindowId(bankWindow.id)
                            if (servicedTalon) {
                                CashierStore.setServicedTalon(servicedTalon)
                            }
                        }
                    }
                }
            }
            setIsLoading(false)
        }
        checkUser()
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
                {UserStore.user && UserStore.user.role == 'ADMIN' && <Route path='/admin' Component={AdminPage}/>}
                {UserStore.user && UserStore.user.role == 'CASHIER' && <Route path='/cashier' Component={CashierPage}/>}
                {UserStore.user && UserStore.user.role == 'USER' && <Route path='/user' Component={UserPage}/>}
            </Routes>
        </div>
    );
});

export default AppRouter;