import {Routes, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import RegPage from '../pages/RegPage'
import AdminPage from '../pages/AdminPage'
import CashierPage from '../pages/CashierPage'
import UserPage from '../pages/UserPage'
import UserStore from '../store/UserStore';
import {useEffect} from 'react'
import {observer} from 'mobx-react-lite';

const AppRouter = observer(() => {
    
    useEffect(() => {
        UserStore.setRole(localStorage.getItem('role'))
        UserStore.setIsAuth(localStorage.getItem('isAuth'))
        UserStore.setUserId(localStorage.getItem('userId'))
    }, [])

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