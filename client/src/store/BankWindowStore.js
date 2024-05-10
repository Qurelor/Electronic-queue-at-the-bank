import {makeAutoObservable} from 'mobx';

class BankWindowStore {
    bankWindows = []
    selectedTalonId = ''
    selectedTalon = ''
    status = ''
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

    setStatus(status) {
        this.status = status
    }
}

export default new BankWindowStore()