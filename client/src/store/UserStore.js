import {makeAutoObservable} from 'mobx';

class UserStore {
    userId = ''
    role = ''
    isAuth = 'false'
    isWorking = 'false'
    workingWindowId = ''
    workingWindowNumber = ''
    lastTalon = ''
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

    setWorkingWindowId(workingWindowId) {
        this.workingWindowId = workingWindowId
    }


    setWorkingWindowNumber(workingWindowNumber) {
        this.workingWindowNumber = workingWindowNumber
    }

    setLastTalon(lastTalon) {
        this.lastTalon = lastTalon
    }

    setUsers(users) {
        this.users = users
    }

    addUser(user) {
        this.users.push(user)
    }
}

export default new UserStore()