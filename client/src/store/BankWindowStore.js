import {makeAutoObservable} from 'mobx';

class BankWindowStore {
    bankWindows = []
    selectedTalonId = ''
    selectedTalon = ''
    constructor() {
        makeAutoObservable(this)
    }

    setBankWindows(bankWindows) {
        this.bankWindows = bankWindows
    }

    addBankWindow(bankWindow) {
        this.bankWindows.push(bankWindow)
    }

    setSelectedTalonId(selectedTalonId) {
        this.selectedTalonId = selectedTalonId
    }

    setSelectedTalon(selectedTalon) {
        this.selectedTalon = selectedTalon
    }
}

export default new BankWindowStore()