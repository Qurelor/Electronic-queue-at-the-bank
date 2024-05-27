import {makeAutoObservable} from 'mobx';

class BankWindowStore {
    bankWindows = []
    
    constructor() {
        makeAutoObservable(this)
    }

    setBankWindows(bankWindows) {
        this.bankWindows = bankWindows
    }

    addBankWindow(bankWindow) {
        this.bankWindows.push(bankWindow)
    }
}

export default new BankWindowStore()