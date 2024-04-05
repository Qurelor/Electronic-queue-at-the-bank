import {makeAutoObservable} from 'mobx';

class UserStore {
    userId = 'null'
    role = 'null'
    isAuth = 'false'
    isWorking = 'false'
    workingWindow = 'null'
    users = []
    constructor() {
        makeAutoObservable(this)
    }

    setUserId(userId) {
        this.userId = userId
    }

    setRole(role) {
        this.role = role
    }

    setIsAuth(isAuth) {
        this.isAuth = isAuth
    }

    setIsWorking(isWorking) {
        this.isWorking = isWorking
    }

    setWorkingWindow(workingWindow) {
        this.workingWindow = workingWindow
    }

    setUsers(users) {
        this.users = users
    }

    addUser(user) {
        this.users.push(user)
    }
}

export default new UserStore()