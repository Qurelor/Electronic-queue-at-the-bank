import {makeAutoObservable} from 'mobx';

class CashierStore {
    cashiers = []
    bankWindow = null
    servicedTalon = null
    
    constructor() {
        makeAutoObservable(this)
    }

    setCashiers(cashiers) {
        this.cashiers = cashiers
    }

    setBankWindow(bankWindow) {
        this.bankWindow = bankWindow
    }

    setServicedTalon(servicedTalon) {
        this.servicedTalon = servicedTalon
    }
}

export default new CashierStore()