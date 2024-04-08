import {Routes, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import RegPage from '../pages/RegPage'
import AdminPage from '../pages/AdminPage'
import EmployeePage from '../pages/EmployeePage'
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
                {UserStore.isAuth == 'true' && UserStore.role == 'EMPLOYEE' && <Route path='/employee' Component={EmployeePage}/>}
                {UserStore.isAuth == 'true' && UserStore.role == 'USER' && <Route path='/user' Component={UserPage}/>}
            </Routes>
        </div>
    );
});

export default AppRouter;