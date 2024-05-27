import {makeAutoObservable} from 'mobx';

class UserStore {
    users = []
    user = null
    lastTalon = null
    
    constructor() {
        makeAutoObservable(this)
    }
    
    setUsers(users) {
        this.users = users
    }

    addUser(user) {
        this.users.push(user)
    }

    setUser(user) {
        this.user = user
    }

    setLastTalon(lastTalon) {
        this.lastTalon = lastTalon
    }
}

export default new UserStore()