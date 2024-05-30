import {makeAutoObservable} from 'mobx';

class BankWindowStore {
    bankWindows = []
    bankWindowsWithCashiers = []
    bankWindowsWithoutCashiers = []
    
    constructor() {
        makeAutoObservable(this)
    }

    setBankWindows(bankWindows) {
        this.bankWindows = bankWindows
    }

    addBankWindow(bankWindow) {
        this.bankWindows.push(bankWindow)
    }

    setBankWindowsWithCashier(bankWindowsWithCashier) {
        this.bankWindowsWithCashier = bankWindowsWithCashier
    }

    setBankWindowsWithoutCashier(bankWindowsWithoutCashier) {
        this.bankWindowsWithoutCashier = bankWindowsWithoutCashier
    }
}

export default new BankWindowStore()